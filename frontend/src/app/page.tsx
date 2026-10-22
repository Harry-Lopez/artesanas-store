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
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Configuración del Carrusel
  const banners = ['/banner1.png', '/banner2.png', '/banner3.png'];

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

  return (
    // Fondo crema extraído del logo
    <main className="min-h-screen bg-[#F6F2EB] font-sans pb-12">
      
      {/* HEADER: Marrón Oscuro Elegante */}
      <header className="bg-[#2C1A12] py-4 shadow-md">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6 w-full">
            
            {/* Logo Artes Ana */}
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Artes Ana Logo" className="h-12 w-12 object-contain rounded-full border-2 border-[#DF6F27]" />
              <h1 className="text-2xl font-serif font-bold text-[#F6F2EB] tracking-wide">
                ARTES<span className="text-[#DF6F27]">ANA</span>
              </h1>
            </div>
            
            {/* Barra de búsqueda rediseñada */}
            <div className="flex w-full max-w-2xl bg-white shadow-inner rounded-sm overflow-hidden h-10 border border-[#4A3224]">
              <input 
                type="text" 
                placeholder="Buscar textiles, barro, madera..." 
                className="w-full px-4 text-slate-700 outline-none placeholder-gray-400 font-light"
              />
              <button className="px-5 bg-[#F6F2EB] text-[#2C1A12] hover:bg-[#DF6F27] hover:text-white transition-colors border-l border-gray-200">
                🔍
              </button>
            </div>
          </div>
          
          <nav className="text-sm text-[#F6F2EB] hidden md:flex gap-5 font-medium ml-8">
            <a href="#" className="hover:text-[#DF6F27] transition-colors">Crear cuenta</a>
            <a href="#" className="hover:text-[#DF6F27] transition-colors">Ingresa</a>
            <a href="#" className="hover:text-[#DF6F27] transition-colors">Mis compras</a>
          </nav>
        </div>
      </header>

      {/* CARRUSEL DE IMÁGENES */}
      <section className="relative w-full max-w-[1200px] mx-auto mt-6 h-[300px] md:h-[400px] bg-[#4A3224] rounded-lg overflow-hidden shadow-lg group">
        <div 
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover opacity-90" />
              {/* Overlay oscuro para darle formalidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A12]/80 to-transparent"></div>
            </div>
          ))}
        </div>
        
        {/* Controles del Carrusel */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#2C1A12]/60 hover:bg-[#DF6F27] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
          ◀
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#2C1A12]/60 hover:bg-[#DF6F27] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
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

      {/* BODY: Catálogo de productos */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="flex items-end gap-2 mb-8 border-b-2 border-[#DF6F27] pb-2">
          <h2 className="text-2xl font-serif font-bold text-[#2C1A12]">Catálogo Artesanal</h2>
          <span className="text-sm text-[#8C6246] font-medium pb-1 ml-4">Orgullo de Papantla</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-[400px] group border border-[#E8E0D5]">
              
              <div className="h-[240px] w-full bg-[#FDFBF7] p-4 relative overflow-hidden">
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
                {/* Etiqueta de Stock */}
                {product.stock && product.stock < 10 && (
                  <span className="absolute top-2 right-2 bg-[#DF6F27] text-white text-xs font-bold px-2 py-1 rounded-sm shadow-md">
                    ¡Últimos {product.stock}!
                  </span>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow bg-white border-t border-[#F6F2EB]">
                <h3 className="text-sm text-[#5C4537] font-semibold mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                
                <div className="mt-auto">
                  <span className="text-2xl font-bold text-[#2C1A12] block">
                    $ {product.price.toLocaleString('es-MX')}
                  </span>
                  
                  {product.price > 500 ? (
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-sm inline-block mt-2">
                      Envío Especial Gratis
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-[#8C6246] mt-2 block">
                      Envío estándar
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}