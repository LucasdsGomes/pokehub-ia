from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# 🔓 Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Servidor rodando!"}

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    user_message = body.get("message", "")

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": "deepseek/deepseek-chat-v3.1:free",
        "messages": [
        {
            "role": "system",
            "content": (
                "Você é um assistente especialista em Pokémon. "
                "Responda apenas perguntas relacionadas a Pokémon, "
                "como tipos, evoluções, habilidades, história e curiosidades. "
                "Se o usuário perguntar algo fora do tema, responda educadamente "
                "que só pode falar sobre Pokémon."
            )
        },
        {
            "role": "user",
            "content": user_message
        }
    ]
    }

    response = requests.post(url, headers=headers, json=data)
    return response.json()
