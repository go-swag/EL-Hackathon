## Inspiration

Being part of an inbound sales driven business, we as the tech team, are always looking for ways to innovate, automate and improve both their processes and our conversions. We noticed a considerable disparity between the top and bottom sales performers, inspiring us to think how we can use AI to guide the lowest performing sales members into top performers, with real time cues on video calls.

## What it does

The sales person joins a video call with the customer, Cue Up also joins the call. Cue Up listens to the conversation and provides cues for the sales person based on the questions the customer asks.

We use a sliding window approach to extract the call audio every 5 seconds. The audio is isolated with ElevenLabs technology, the audio is passed to FAL.ai to convert the speech to text. The customer's question is now in text output format and can be passed to Ministral 8B which was chosen for its performance and inference ratio. The output is a real time product knowledge aware cue that can help guide the sales member about the product. The question answer cues are then displayed in the UI.

This allows the sales person to focus completely on the customer in the call but to be fed real time product cues from Cue Up.


## How we built it
- Tech stack was Vercel, NextJS and we used lovable for initial UI inspiration.
- The backend was Python with FastAPI, using the Mistral AI client library, FAL.ai and ElevenLabs SDK.


## Challenges we ran into
- Limited time for user testing. 
- We not able to evaluate the cue outputs against a specific metric, were prompting in the dark.

## Accomplishments that we're proud of
- Building a working demo in the first day, with a small team size of just 2 ! 

## What we learned
- LLM Prompting needs robust metrics and observability, we would use PostHog in the future to improve observability.

## What's next for Cue Up

- Tone analysis (if excited, push prompts to close sale, if hesitant, provide reassuring prompts)
- Full MVP deployed into the sales environment with company specific product information. 
- Live traffic light system to try provide an insight into if the lead is likely to be converted into a customer (based on tone, hesitancy and objections)
