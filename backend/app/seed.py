import sys
import os

# Ajuste de rutas para evitar errores de importación al ejecutar dentro de Docker
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, engine, Base
from app.models import Category, Product

Base.metadata.create_all(bind=engine)
db = SessionLocal()

def populate():
    if db.query(Category).first():
        print("Operación abortada: La base de datos ya contiene información.")
        return

    print("Iniciando protocolo de inyección de datos...")

    cat_ropa = Category(name="Vestimenta Tradicional", slug="vestimenta-tradicional", description="Prendas y bordados Totonacas")
    cat_vainilla = Category(name="Artesanías de Vainilla", slug="artesanias-de-vainilla", description="Figuras y extractos artesanales")
    cat_alfareria = Category(name="Alfarería y Barro", slug="alfareria-y-barro", description="Piezas tradicionales moldeadas a mano")

    db.add_all([cat_ropa, cat_vainilla, cat_alfareria])
    db.commit()

    p1 = Product(
        name="Blusa Bordada Totonaca",
        slug="blusa-bordada-totonaca",
        description="Blusa tradicional con bordados a mano inspirados en la flora regional.",
        price=650.00,
        image_url="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500",
        stock=15,
        category_id=cat_ropa.id
    )
    p2 = Product(
        name="Figura de Vainilla Tejida (Colibrí)",
        slug="figura-vainilla-colibri",
        description="Artesanía elaborada con vainas de vainilla natural aromática.",
        price=280.00,
        image_url="https://images.unsplash.com/photo-1544816155-12df9643f363?w=500",
        stock=20,
        category_id=cat_vainilla.id
    )
    p3 = Product(
        name="Cántaro de Barro Tradicional",
        slug="cantaro-barro-tradicional",
        description="Cántaro de diseño tradicional, tallado y moldeado a mano.",
        price=450.00,
        image_url="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500",
        stock=5,
        category_id=cat_alfareria.id
    )

    db.add_all([p1, p2, p3])
    db.commit()
    print("Base de datos inyectada con éxito con datos ficticios. Catálogo listo para la interfaz.")

if __name__ == "__main__":
    populate()
    db.close()