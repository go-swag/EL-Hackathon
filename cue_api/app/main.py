import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mistralai import Mistral
from pydantic import BaseModel, Field
from starlette.responses import StreamingResponse

from .product_data import bmw_product_data

load_dotenv()
app = FastAPI()

client = Mistral(api_key=os.getenv("MISTRAL_API_KEY"))
model = "ministral-3b-latest"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionMessage(BaseModel):
    question: str | None = Field(..., examples=["what is the range on the battery?"])
    audio_file: int | None = Field(
        ..., description="The hard coded demo audio file ID", examples=[None]
    )


class CueHistory(BaseModel):
    question: str
    answer: str


class CueDetails(BaseModel):
    cue_histories: list[CueHistory]


chat_history = []

###
###
### {'question': 'what is the hybrid range?'}
### {'audio_file': 1}
###
###
###
### {'chat_history':[ {type:'text','question':'what is the hybrid range?', 'answer':'36km' } ]
###
###

cue_histories = []


@app.post(
    "/submit-text",
    response_model=CueDetails,
)
def submit_text(question_message: QuestionMessage):

    chat_response = client.chat.complete(
        model=model,
        messages=[
            {
                "role": "system",
                "content": f"""
            You are an assistant on a live video call providing cue cards to the sales professional 
            based on their interaction with the customer.
            
            Here is context around the car {bmw_product_data}.
            
            This is an example cue card:
            
            **Hybrid Powertrain**  215 kW combined with 420 Nm torque
            **Fuel Efficiency** Just 2.2L/100km,  50 g/km CO₂ emissions
            **Performance** 0-100 km/h in 5.9
            
            The cue cards must be very short, avoid all unnecessary words.
            """,
            },
            *chat_history,
            {"role": "user", "content": question_message.question},
        ],
    )

    assistant_reply = chat_response.choices[0].message.content

    chat_history.append({"role": "user", "content": question_message.question})
    chat_history.append({"role": "assistant", "content": assistant_reply})

    cue_histories.insert(
        0, CueHistory(question=question_message.question, answer=assistant_reply)
    )

    cue_details = CueDetails(cue_histories=cue_histories)

    return cue_details


@app.get("/health")
def health():
    return {"status": "ok"}


def generate_stream():
    stream_response = client.chat.stream(
        model=model,
        messages=[
            {
                "role": "user",
                "content": "What is the best French cheese?",
            },
        ],
    )

    for chunk in stream_response:
        yield chunk.data.choices[0].delta.content


@app.get("/stream")
def stream():
    return StreamingResponse(generate_stream(), media_type="text/event-stream")
