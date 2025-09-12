import os
from dotenv import load_dotenv
import requests

load_dotenv()  

API_KEY = os.getenv("OPENROUTER_API_KEY")
if not API_KEY:
    raise ValueError("⚠️ Variável OPENROUTER_API_KEY não definida!")

url = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

data = {
    "model": "deepseek/deepseek-chat-v3.1:free",
    "messages": [
        {"role": "user", "content": "What is the meaning of life?"}
    ]
}

response = requests.post(url, headers=headers, json=data)

print("Status:", response.status_code)
print("Resposta JSON:")
print(response.json())
