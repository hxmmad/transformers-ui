import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uuid
import string
import random
from fastapi.middleware.cors import CORSMiddleware
import lorem

class Query(BaseModel):
    query: str

class Status(BaseModel):
    id: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Store the ids and their statuses in a dictionary
statuses = {}

@app.post("/search")
async def search(query: Query):
    # Generate a random 10 character string
    id = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    statuses[id] = "processing"
    return {"id": id}

@app.get("/status/{id}")
async def get_status(id: str):
    if id in statuses:
        await asyncio.sleep(5)  # Wait for 5 seconds
        statuses[id] = "complete"
        answer = [{"text": lorem.paragraph(), "key": ''.join(random.choices(string.ascii_letters + string.digits, k=5)), "val": ''.join(random.choices(string.ascii_letters + string.digits, k=5))} for _ in range(10)]
        return {"id": id, "status": statuses[id], "answer": answer}
    else:
        raise HTTPException(status_code=404, detail="ID not found")