from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import bcrypt

app = FastAPI(title="API de Clientes Do CAMSENSE", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://visionists-five.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class CriacaoDeCliente(BaseModel):
    """
    Determina os campos que são obrigatórios a serem str como nome do cliente e o email
    """
    nome: str
    email: str

class RegistroDeCliente(CriacaoDeCliente):
    """
    Determina que o campo senha sejá str, mantendo-se separado para não retornar nunca esse resposta da API
    """
    senha: str

class Cliente(CriacaoDeCliente):
    """
    Determina o modelo no qual a api deve retornar mais sem a presença da senha
    """
    id: int
    active: bool = True

class Login(BaseModel):
    """
    Determina o que o Front-End deve enviar quando um cliente for fazer o login
    """
    email: str
    senha: str

# Lista de Usúarios fixa
clients_db: List[Cliente] = [
    Cliente(id=1, nome="Visionists Admin", email="admin@visionists.dev", active=True),
]

# Dicionário que garda oo hash das senhas

senhas_db: Dict[str, bytes] = {}

senhaTest = "123456" #senha de teste dos Usúarios fixos para teste
for cliente in clients_db:
    senhas_db[cliente.email] = bcrypt.hashpw(senhaTest.encode("utf-8"), bcrypt.gensalt())

def verificacaoDeEmail(email: str) -> str:
    """
    Remove os espaços e deixa as letras minúsculas para o email
    """
    return email.strip().lower()

def buscarClientPorEmail(email: str) -> Optional[Cliente]:
    """
    Realiza uma busca na lista o primeiro cliente com esse email,
    retornando None se não achar
    """
    email = verificacaoDeEmail(email)
    return next((c for c in clients_db if verificacaoDeEmail(c.email) == email), None)

"""
Retorna a lista com todos os clients mas sem a presença de senhas
"""
@app.get("/api/clientes", response_model=List[Cliente])
def get_clientes():
    return clients_db

"""
Realiza o cadastro de um novo client
"""
@app.post("/api/clientes", response_model=Cliente, status_code=201)
def create_cliente(cliente: RegistroDeCliente):
    if buscarClientPorEmail(cliente.email):
        raise HTTPException(status_code=409, detail="Esse e-mail já está cadastrado")

    if len(cliente.senha) < 6:
        raise HTTPException(status_code=400, detail="A senha de ter ao minímo 6 caracteres")

    novo_id = max((c.id for c in clients_db), default=0) + 1

    novo_cliente = Cliente(
        id=novo_id,
        nome=cliente.nome,
        email=verificacaoDeEmail(cliente.email),
        active=True,
    )

    hash_senha = bcrypt.hashpw(cliente.senha.encode("utf-8"), bcrypt.gensalt())
    senhas_db[novo_cliente.email] = hash_senha

    clients_db.append(novo_cliente)

    return novo_cliente

@app.post("/api/login")
def login(dados: Login):
    email = verificacaoDeEmail(dados.email)
    cliente = buscarClientPorEmail(email)
    hash_salvo = senhas_db.get(email)

    if (not cliente or not hash_salvo or not bcrypt.checkpw(dados.senha.encode("utf-8"), hash_salvo)):
        raise HTTPException(status_code=400, detail="E-mail ou Senha incorretos")

    if not cliente.active:
        raise HTTPException(status_code=403, detail="Conta desativada")

    return {"mensagem": "Login realizado com sucesso", "cliente": cliente}