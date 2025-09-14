from fastapi.testclient import TestClient
from app.api.main import app
from app.core.database import Base, engine
from app.models.user import User
import pytest

client = TestClient(app)

# Fixtures para criar e limpar o banco de teste
@pytest.fixture(scope="module")
def setup_database():
    # Cria as tabelas
    Base.metadata.create_all(bind=engine)
    yield
    # Dropa as tabelas após os testes
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def user_data():
    return {
        "email": "ash@pokemon.com",
        "password": "pikachu123",
        "favorite_pokemon": "Pikachu"
    }

def test_create_user(setup_database, user_data):
    response = client.post("/users", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["favorite_pokemon"] == user_data["favorite_pokemon"]

def test_list_users(setup_database):
    response = client.get("/list-users/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1

def test_login_user(setup_database, user_data):
    response = client.post("/login/", json={
        "email": user_data["email"],
        "password": user_data["password"]
    })
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == user_data["email"]

def test_update_user(setup_database):
    # Atualiza o usuário com id 1
    update_data = {
        "email": "ash.ketchum@pokemon.com",
        "favorite_pokemon": "Charizard",
        "is_active": True
    }
    response = client.put("/users/1", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == update_data["email"]
    assert data["favorite_pokemon"] == update_data["favorite_pokemon"]
    assert data["is_active"] == True

def test_delete_user(setup_database):
    response = client.delete("/users/1")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Usuário deletado com sucesso"

    # Confirma que usuário não existe mais
    response = client.get("/list-users/")
    data = response.json()
    assert all(u["id"] != 1 for u in data)
