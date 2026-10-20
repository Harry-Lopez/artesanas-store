from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base
from app.models import Category, Product

# <<--Crear Tablas-->>
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Artesanas Papantla API", version="0.1.0")

# Política CORS, permite peticiones desde cualquier origen en desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "system": "Artesanas Papantla API", "version": "0.1.0"}

@app.get("/api/v1/categories")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.is_active == True).all()

@app.get("/api/v1/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.status == "publicado").all()