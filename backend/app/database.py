import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# <<--Variable de entorno usada por Docker Compose-->>
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://api_user:ArTeSaNiAs23@db:3306/artesaniasApp_store")

# <<--Motor de conexión a DB-->>
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()