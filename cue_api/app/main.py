from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
import time
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/submit-text")
def submit_text(text: str = Body(..., embed=True)):
    secret_key = os.getenv("MISTRAL_API_KEY")
    print(secret_key)
    return {"received_text": text}

@app.get('/health')
def health():
    return {"status": "ok"}

def generate_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)


@app.get("/stream")
def stream():
    return StreamingResponse(generate_stream(), media_type="text/event-stream")
