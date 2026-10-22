import requests
import time

API_URL = "http://localhost:8000/api/v1/products"

# Sustituya estos diccionarios con la información real de los artesanos
productos_definitivos = [
    {
        "name": "Abanico Artesanal",
        "description": "Abanico decorativo elaborado artesanalmente, ideal para complementar atuendos tradicionales o como pieza decorativa.",
        "price": 180.00,
        "stock": 15,
        "image_url": "/productos/abanico_artesanal.png",
        "category_id": 1,
        "status": "publicado"
    },
    {
        "name": "Alcancía de Barro",
        "description": "Alcancía de barro elaborada a mano con técnicas tradicionales. Una pieza artesanal ideal para ahorrar o decorar el hogar.",
        "price": 150.00,
        "stock": 12,
        "image_url": "/productos/alcancia_de_barro.png",
        "category_id": 2,
        "status": "publicado"
    },
    {
        "name": "Anafre de Barro",
        "description": "Anafre artesanal de barro con diseño tradicional, ideal para quienes buscan utensilios de cocina de estilo rústico.",
        "price": 280.00,
        "stock": 8,
        "image_url": "/productos/anafre_barro.png",
        "category_id": 2,
        "status": "publicado"
    },
    {
        "name": "Blusa Bordada Artesanal",
        "description": "Blusa con bordados artesanales y detalles decorativos inspirados en la tradición textil mexicana. Cada pieza aporta un toque auténtico al atuendo.",
        "price": 650.00,
        "stock": 6,
        "image_url": "/productos/blusa_bordada.png",
        "category_id": 3,
        "status": "publicado"
    },
    {
        "name": "Bolsa de Telar",
        "description": "Bolsa artesanal tejida en telar, práctica y resistente, ideal para el uso diario y para quienes aprecian los textiles tradicionales.",
        "price": 380.00,
        "stock": 10,
        "image_url": "/productos/bolsa_de_telar.png",
        "category_id": 1,
        "status": "publicado"
    },
    {
        "name": "Bolso Bordado Artesanal",
        "description": "Bolso artesanal con bordados decorativos y acabado tradicional. Una opción versátil para complementar atuendos casuales.",
        "price": 520.00,
        "stock": 7,
        "image_url": "/productos/bolso_bordado.png",
        "category_id": 1,
        "status": "publicado"
    },
    {
        "name": "Búho de Vainilla",
        "description": "Figura artesanal decorativa con temática de búho, ideal como recuerdo, regalo o elemento ornamental para el hogar.",
        "price": 220.00,
        "stock": 9,
        "image_url": "/productos/buho_vainilla.png",
        "category_id": 4,
        "status": "publicado"
    },
    {
        "name": "Cantaritos de Barro",
        "description": "Cantaritos de barro con estilo tradicional, perfectos para decorar espacios o servir bebidas de manera original.",
        "price": 190.00,
        "stock": 14,
        "image_url": "/productos/cantaritos_de_barro.png",
        "category_id": 2,
        "status": "publicado"
    },
    {
        "name": "Cinturón Bordado Típico",
        "description": "Cinturón con detalles bordados de inspiración tradicional, diseñado para complementar prendas regionales y atuendos casuales.",
        "price": 260.00,
        "stock": 11,
        "image_url": "/productos/cinturon_bordado_tipico.png",
        "category_id": 3,
        "status": "publicado"
    },
    {
        "name": "Monedero Bordado",
        "description": "Monedero artesanal con bordados decorativos, compacto y práctico para guardar monedas, billetes y pequeños objetos personales.",
        "price": 140.00,
        "stock": 18,
        "image_url": "/productos/monedero_bordado.png",
        "category_id": 1,
        "status": "publicado"
    },
    {
        "name": "Moño Bordado",
        "description": "Accesorio textil artesanal con bordados decorativos, ideal para complementar peinados y atuendos tradicionales.",
        "price": 95.00,
        "stock": 20,
        "image_url": "/productos/mono_bordado.png",
        "category_id": 3,
        "status": "publicado"
    },
    {
        "name": "Palo Volador Miniatura",
        "description": "Representación artesanal en miniatura del tradicional palo volador, ideal como pieza de colección y recuerdo cultural.",
        "price": 450.00,
        "stock": 5,
        "image_url": "/productos/palo_volador_mini.png",
        "category_id": 4,
        "status": "publicado"
    },
    {
        "name": "Separadores de Libros Lapiceros",
        "description": "Conjunto de separadores y accesorios artesanales para escritorio, ideales para acompañar la lectura o regalar a estudiantes.",
        "price": 85.00,
        "stock": 25,
        "image_url": "/productos/separadores_lapiceros.png",
        "category_id": 4,
        "status": "publicado"
    },
    {
        "name": "Servilletero Artesanal",
        "description": "Servilletero artesanal con acabado decorativo, ideal para complementar la presentación de la mesa y dar un toque tradicional al hogar.",
        "price": 170.00,
        "stock": 10,
        "image_url": "/productos/servilletero_artesanal.png",
        "category_id": 4,
        "status": "publicado"
    },
    {
        "name": "Toallas Bordadas",
        "description": "Toallas con detalles bordados artesanalmente, ideales para uso personal, decoración del baño o para obsequiar en ocasiones especiales.",
        "price": 320.00,
        "stock": 8,
        "image_url": "/productos/toallas_bordadas.png",
        "category_id": 3,
        "status": "publicado"
    },
    {
        "name": "Tomatodo de Madera",
        "description": "Accesorio artesanal de madera con diseño tradicional, pensado como pieza decorativa o complemento para espacios de estilo rústico.",
        "price": 240.00,
        "stock": 7,
        "image_url": "/productos/tomatodo_madera.png",
        "category_id": 4,
        "status": "publicado"
    },
    {
        "name": "Vestido Bordado",
        "description": "Vestido con bordados artesanales y detalles de inspiración regional, ideal para celebraciones, eventos culturales y ocasiones especiales.",
        "price": 980.00,
        "stock": 4,
        "image_url": "/productos/vestido_bordado.png",
        "category_id": 3,
        "status": "publicado"
    }
]

def inyectar_catalogo():
    print("🚀 Iniciando Protocolo de Inyección Definitiva...")
    print("-" * 50)
    
    exitos = 0
    errores = 0
    
    for producto in productos_definitivos:
        try:
            respuesta = requests.post(API_URL, json=producto)
            
            if respuesta.status_code in [200, 201]:
                print(f"✅ ÉXITO: {producto['name']} inyectado correctamente.")
                exitos += 1
            else:
                print(f"❌ ERROR con {producto['name']}: Código {respuesta.status_code}")
                print(respuesta.text)
                errores += 1
                
        except requests.exceptions.ConnectionError:
            print("🚨 FATAL: No se pudo conectar a la API.")
            break
            
        time.sleep(0.5)

    print("-" * 50)
    print(f"Resumen: {exitos} productos añadidos | {errores} fallos.")

if __name__ == "__main__":
    inyectar_catalogo()