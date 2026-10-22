from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base
from app.models import Category, Product
from typing import Optional, List
from pydantic import BaseModel

# <<--Crear Tablas-->>
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Artesanas Papantla API", version="0.1.0")

# <<--CORS: peticiones desde cualquier origen en desarrollo-->>
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "Artesanas Papantla API", 
        "version": "0.1.0"
    }

@app.get("/api/v1/categories")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.is_active == True).all()

# 1. Esquema de Pydantic para validar los datos de entrada
class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    image_url: Optional[str] = None
    category_id: int
    status: str = "publicado"

# 2. Endpoint GET: Permite a Next.js leer el catálogo para dibujarlo en pantalla
@app.get("/api/v1/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

# 3. Endpoint POST: Permite al seeder.py inyectar nuevos productos
@app.post("/api/v1/products", status_code=201)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product