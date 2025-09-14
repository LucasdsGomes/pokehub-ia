from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, Base, engine
from app.models import user as models
from app.core import schemas
import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    return response.json()


@app.post("/users")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Verifica se email já existe
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")
    
    new_user = models.User(
        email=user.email,  # Atualizado para email
        hashed_password=user.password,
        favorite_pokemon=user.favorite_pokemon
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/list-users/", response_model=list[schemas.User])
def list_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@app.post("/login/", response_model=schemas.User)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or user.password != db_user.hashed_password:
        raise HTTPException(status_code=400, detail="Email ou senha inválidos")
    return db_user

@app.delete("/users/{user_id}", response_model=dict)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    db.delete(user)
    db.commit()
    return {"message": "Usuário deletado com sucesso", "id": user_id}

@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if user_update.email is not None:
        user.email = user_update.email
    if user_update.favorite_pokemon is not None:
        user.favorite_pokemon = user_update.favorite_pokemon
    if user_update.is_active is not None:
        user.is_active = user_update.is_active
    
    db.commit()
    db.refresh(user)
    return user
