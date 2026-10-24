'use client';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  stock?: number;
  status?: string;
  category_id?: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // <<--Estado y Datos del Mini-Carrusel Promocional-->>
  const [currentPromo, setCurrentPromo] = useState(0);
  const miniPromos = [
    '/banner1.png',
    '/banner2.png',
    '/banner3.png'
  ];

  useEffect(() => {
    // Motor del Mini-Carrusel (Cambia cada 3.5 segundos)
    const promoTimer = setInterval(() => {
      setCurrentPromo((prev) => (prev === miniPromos.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(promoTimer);
  }, [miniPromos.length]);

  // Configuración del Carrusel
  const banners = ['/banner1.png', '/banner2.png', '/banner3.png'];

  // <<--Tarjetas Dinámicas de Curiosidades-->>
  const curiosidades = [
    { id: 1, titulo: "Origen de la Vainilla", texto: "Papantla es la ciudad que dio la vainilla al mundo. Descubre su magia.", icono: "🌼", color: "bg-[#4A3224]" },
    { id: 2, titulo: "Voladores de Papantla", texto: "Patrimonio Cultural Inmaterial de la Humanidad. Orgullo totonaca.", icono: "🦅", color: "bg-[#DF6F27]" },
    { id: 3, titulo: "Herencia Totonaca", texto: "Nuestros artesanos preservan técnicas milenarias en cada pieza.", icono: "🏺", color: "bg-[#8C6246]" },
    { id: 4, titulo: "Comercio Justo", texto: "El 100% de tu compra apoya directamente a las familias locales.", icono: "🤝", color: "bg-[#5C4537]" },
    { id: 5, titulo: "Materiales Puros", texto: "Extraídos responsablemente de la región del Totonacapan.", icono: "🌿", color: "bg-[#2C1A12]" }
  ];

  // <<--Metadatos de Categorías de Banners-->>
  const categoriasData = [
    { 
      id: 1, 
      nombre: 'Vestimenta Tradicional', 
      frase: 'Prendas y bordados artesanales totonacas.', 
      imagen: '/banner1.png' 
    },
    { 
      id: 2, 
      nombre: 'Artesanías de Vainilla', 
      frase: 'Figuras y extractos con la esencia del Totonacapan.', 
      imagen: '/banner2.png'
    },
    { 
      id: 3, 
      nombre: 'Alfarería y Barro', 
      frase: 'Piezas tradicionales de barro moldeadas a mano.', 
      imagen: '/banner3.png'
    },
    { 
      id: 4, 
      nombre: 'Talla en Madera', 
      frase: 'Esculturas y piezas artesanales en maderas nobles.', 
      imagen: '/banner1.png'
    }
  ];

  useEffect(() => {
    // 1. Fetch de productos
    fetch('/api/v1/products', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(err => console.error("Error al cargar el catálogo:", err));

    // 2. Motor del Carrusel (Cambia cada 5 segundos)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? banners.length - 1 : prev - 1));

  // <<--Motor de desplazamiento horizontal para escritorio-->>
  const scrollContainer = (id: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${id}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -600 : 600; // Avanza ~2 tarjetas por clic
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    // <<--Fondo General-->>
    <main className="min-h-screen bg-[#F6F2EB] font-sans pb-12">
      
      {/* <<--HEADER: Fijo con sticky top-0 z-50-->>*/}
      <header className="bg-[#2C1A12] sticky top-0 z-50 py-4 shadow-md">
        
        {/*<<--Fila principal del buscador-->>*/}
        {/* Quitamos el contenedor interno extra. Ahora Logo, Buscador y Píldora son hermanos directos */}
        <div className="max-w-[1400px] w-full mx-auto px-4 flex items-center justify-between gap-6">
          
          {/* 1. Logo a la izquierda (flex-shrink-0 para que no se aplaste, ancho fijo aproximado de 200px para balancear) */}
          <div className="flex items-center gap-3 flex-shrink-0 w-auto lg:w-[220px]">
            <img src="/logo.png" alt="Artes Ana Logo" className="h-10 w-10 object-contain rounded-full border border-[#DF6F27]" />
            <h1 className="text-2xl font-serif font-bold text-[#F6F2EB] tracking-wide hidden sm:block">
              ARTES<span className="text-[#DF6F27]">ANA</span>
            </h1>
          </div>
          
          {/* 2. Barra de búsqueda (flex-1 para absorber espacio, max-w-2xl para que no sea inmensa) */}
          <div className="flex-1 w-full max-w-2xl bg-white shadow-inner rounded-sm overflow-hidden h-10 border border-[#4A3224] flex">
            <input 
              type="text" 
              placeholder="Buscar textiles, barro, madera..." 
              className="w-full px-4 text-slate-700 outline-none placeholder-gray-400 font-light"
            />
            <button className="px-5 bg-[#F6F2EB] text-[#2C1A12] hover:bg-[#DF6F27] hover:text-white transition-colors border-l border-gray-200">
              🔍
            </button>
          </div>
        
          {/* 3. Píldora Promocional (Micro-Carrusel Dinámico) */}
          <div className="hidden md:flex relative h-10 rounded-full cursor-pointer flex-shrink-0 shadow-sm w-auto lg:w-[220px] overflow-hidden bg-[#2C1A12] border border-[#DF6F27]/50 group">
            {/* Pista de deslizamiento */}
            <div 
              className="w-full h-full flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentPromo * 100}%)` }}
            >
              {miniPromos.map((promo, index) => (
                <div key={index} className="min-w-full h-full relative">
                  {/* Imagen de la promo (debe ser alargada, aprox 220x40 px para que no se deforme) */}
                  <img 
                    src={promo} 
                    alt={`Promo Especial ${index + 1}`} 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80" 
                  />
                  {/* Fallback visual: Si la imagen no carga, se mostrará un fondo de color */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DF6F27]/20 to-transparent mix-blend-overlay"></div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/*<<--Fila secundaria del menú-->>*/}
        <div className="max-w-[1400px] mx-auto px-4 py-2 mt-2 border-t border-[#4A3224] flex items-center justify-between text-sm text-[#F6F2EB]/90">
          <nav className="flex gap-6">
            <button className="hover:text-white font-medium flex items-center gap-1">Categorías <span className="text-xs">▼</span></button>
            <a href="#" className="hover:text-white transition-colors">Ofertas</a>
            <a href="#" className="hover:text-white transition-colors">Historial</a>
            <a href="#" className="hover:text-white transition-colors">Vender</a>
          </nav>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Crea tu cuenta</a>
            <a href="#" className="hover:text-white transition-colors">Ingresa</a>
            <a href="#" className="hover:text-white transition-colors">Mis compras</a>
          </nav>
        </div>
      </header>

      {/*<<--CARRUSEL DE IMÁGENES EDGE-TO-EDGE-->>*/}
      <section className="relative w-full h-[300px] md:h-[400px] bg-[#4A3224] overflow-hidden shadow-lg group">
        <div 
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover opacity-90" />
              {/* Overlay oscuro para darle formalidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A12]/80 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>
        
        {/* Controles del Carrusel */}
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#2C1A12]/60 hover:bg-[#DF6F27] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur-sm">
          ◀
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#2C1A12]/60 hover:bg-[#DF6F27] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur-sm">
          ▶
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-[#DF6F27]' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/*<<--TARJETAS DINÁMICAS (SCROLL HORIZONTAL)-->>*/}
      <section className="max-w-[1400px] w-full mx-auto px-4 mt-6">
        {/* Contenedor principal con desbordamiento controlado, imantación (snap) y ocultamiento de barra */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {curiosidades.map((item) => (
            <article 
              key={item.id} 
              className={`${item.color} min-w-[280px] md:min-w-[320px] rounded-xl p-6 text-[#F6F2EB] shadow-md snap-start flex-shrink-0 hover:scale-[1.02] transition-transform duration-300 cursor-pointer border border-white/10`}
            >
              <div className="text-3xl mb-3">{item.icono}</div>
              <h3 className="font-bold text-lg mb-2 tracking-wide">{item.titulo}</h3>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {item.texto}
              </p>
            </article>
          ))}
          
        </div>
      </section>

      {/* 4. CATÁLOGO POR CATEGORÍAS */}
      <section className="max-w-[1400px] w-full mx-auto px-4 mt-12">
        
        {categoriasData.map((categoria) => {
          // Filtrar productos que pertenezcan a esta categoría
          const productosCategoria = products
            .filter(p => p.category_id === categoria.id)
            .slice(0, 10);

          if (productosCategoria.length === 0) return null;

          return (
            <div key={categoria.id} className="mb-16">
              
              {/* EL BANNER DE LA CATEGORÍA */}
              <div className="relative w-full h-32 md:h-40 rounded-2xl overflow-hidden mb-6 shadow-sm border border-[#E8E0D5] group cursor-pointer">
                <img 
                  src={categoria.imagen} 
                  alt={categoria.nombre} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2C1A12]/90 via-[#2C1A12]/50 to-transparent flex flex-col justify-center px-8 md:px-12">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#F6F2EB] mb-1">
                    {categoria.nombre}
                  </h2>
                  <p className="text-sm md:text-base text-[#D4C3B3] font-light max-w-md">
                    {categoria.frase}
                  </p>
                </div>
              </div>

              {/* LA TIRA DE PRODUCTOS CON BOTONES DE NAVEGACIÓN PC */}
              <div className="relative group">
                
                {/* Botón Izquierda (Exclusivo PC) */}
                <button 
                  onClick={() => scrollContainer(categoria.id.toString(), 'left')}
                  className="hidden md:flex absolute -left-5 top-[40%] -translate-y-1/2 z-10 bg-white shadow-xl border border-[#E8E0D5] w-12 h-12 rounded-full items-center justify-center text-2xl text-[#2C1A12] opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-[#DF6F27]"
                >
                  ‹
                </button>

                {/* Contenedor Scroll (Le inyectamos un ID dinámico) */}
                <div 
                  id={`scroll-${categoria.id}`} 
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
                >
                  
                  {productosCategoria.map((product) => (
                    <article 
                      key={product.id} 
                      className="w-[260px] md:w-[280px] flex-shrink-0 snap-start bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-[380px] group border border-[#E8E0D5]"
                    >
                      <div className="h-[200px] w-full bg-[#FDFBF7] p-4 relative overflow-hidden flex-shrink-0">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#D4C3B3]">
                            <span className="text-4xl">📷</span>
                          </div>
                        )}
                        {product.stock && product.stock < 10 && (
                          <span className="absolute top-2 right-2 bg-[#DF6F27] text-white text-xs font-bold px-2 py-1 rounded-sm shadow-md">
                            ¡Últimos {product.stock}!
                          </span>
                        )}
                      </div>
                      
                      <div className="p-4 flex flex-col flex-grow bg-white border-t border-[#F6F2EB]">
                        <h3 className="text-sm text-[#5C4537] font-semibold mb-2 line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                        
                        <div className="mt-auto">
                          <span className="text-xl font-bold text-[#2C1A12] block">
                            $ {product.price.toLocaleString('es-MX')}
                          </span>
                          
                          {product.price > 500 ? (
                            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-sm inline-block mt-2 uppercase tracking-wide">
                              Envío Gratis
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-[#8C6246] mt-2 block uppercase tracking-wide">
                              Envío estándar
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                  
                  {/* Tarjeta de "Ver todos" al final de la tira */}
                  <article className="w-[150px] md:w-[200px] flex-shrink-0 snap-start bg-[#F6F2EB] rounded-lg border border-[#E8E0D5] hover:border-[#DF6F27] transition-colors flex flex-col items-center justify-center cursor-pointer group">
                    <span className="text-[#DF6F27] text-3xl mb-2 transition-transform group-hover:translate-x-2">
                      →
                    </span>
                    <span className="text-[#2C1A12] font-bold text-sm">Ver todos</span>
                  </article>

                </div>

                {/* Botón Derecha (Exclusivo PC) */}
                <button 
                  onClick={() => scrollContainer(categoria.id.toString(), 'right')}
                  className="hidden md:flex absolute -right-5 top-[40%] -translate-y-1/2 z-10 bg-white shadow-xl border border-[#E8E0D5] w-12 h-12 rounded-full items-center justify-center text-2xl text-[#2C1A12] opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-[#DF6F27]"
                >
                  ›
                </button>

              </div>
            </div>
          );
        })}
      </section>

      {/* <<-- FOOTER TIPO CORPORATIVO -->> */}
      <footer className="bg-[#1A0F0A] text-white pt-12 pb-8 mt-12 border-t-4 border-[#DF6F27]">
        <div className="max-w-[1200px] mx-auto px-4">
          
          {/* Grid de 4 Columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            
            {/* Columna 1 */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#F6F2EB]">Conócenos</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#" className="hover:underline hover:text-white">Nuestra Historia en Papantla</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Información corporativa</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Sustentabilidad y Materiales</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Prensa y reconocimientos</a></li>
              </ul>
            </div>

            {/* Columna 2 */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#F6F2EB]">Impulsa tu arte</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#" className="hover:underline hover:text-white">Vender en ArtesAna</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Protege tu herencia cultural</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Centro de artesanos</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Envíos y logística local</a></li>
              </ul>
            </div>

            {/* Columna 3 */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#F6F2EB]">Podemos ayudarte</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#" className="hover:underline hover:text-white">Devolver o reemplazar productos</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Rastrear mi pedido</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Garantía artesanal</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Ayuda y soporte técnico</a></li>
              </ul>
            </div>

            {/* Columna 4 */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#F6F2EB]">Métodos de pago</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-light">
                <li><a href="#" className="hover:underline hover:text-white">Tarjetas de crédito y débito</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Pago en tiendas OXXO</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Mercado Pago</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Transferencia SPEI</a></li>
              </ul>
            </div>
            
          </div>

          {/* Separador */}
          <div className="border-t border-[#3A2215] mb-8"></div>

          {/* Área Central: Logo y Configuración */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-serif font-bold text-[#F6F2EB] tracking-wide">
                ARTES<span className="text-[#DF6F27]">ANA</span>
              </h2>
            </div>
            <button className="flex items-center gap-2 border border-gray-500 rounded-sm px-3 py-1.5 text-sm hover:border-white transition-colors">
              <span className="text-xl">🇲🇽</span> México
            </button>
          </div>

          {/* Legales (Bottom Text) */}
          <div className="text-center text-xs text-gray-400 flex flex-col gap-2">
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:underline text-white">Condiciones de uso</a>
              <a href="#" className="hover:underline text-white">Aviso de privacidad</a>
            </div>
            <p>© 2026, ArtesAna Papantla, Inc. o sus afiliados. Plataforma para el desarrollo totonaca.</p>
          </div>
          
        </div>
      </footer>
    </main>
  );
}