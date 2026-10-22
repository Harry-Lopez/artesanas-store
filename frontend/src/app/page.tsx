'use client';
import { useEffect, useState } from 'react';

// EL CONTRATO: Le decimos a TypeScript exactamente qué esperar de la base de datos
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

  // EL GATILLO: Se ejecuta una sola vez al cargar la página
  useEffect(() => {
    fetch('/api/v1/products', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(err => console.error("Error al cargar el catálogo:", err));
  }, []);

  return (
    // Fondo gris exacto de Mercado Libre
    <main className="min-h-screen bg-[#ebebeb] font-sans pb-12">
      
      {/* 1. HEADER: La icónica barra amarilla */}
      <header className="bg-[#fff159] py-3 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8 w-full">
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter">
              MercadoPapantla
            </h1>
            
            {/* Barra de búsqueda */}
            <div className="flex w-full max-w-2xl bg-white shadow-sm rounded-sm overflow-hidden h-10">
              <input 
                type="text" 
                placeholder="Buscar artesanías, ropa, joyería y más..." 
                className="w-full px-4 text-slate-700 outline-none placeholder-gray-400 font-light"
              />
              <button className="px-4 text-slate-500 hover:bg-gray-50 border-l border-gray-200">
                🔍
              </button>
            </div>
          </div>
          
          <nav className="text-sm text-slate-800 hidden md:flex gap-4 font-medium ml-8">
            <a href="#" className="hover:text-slate-600">Crear cuenta</a>
            <a href="#" className="hover:text-slate-600">Ingresa</a>
            <a href="#" className="hover:text-slate-600">Mis compras</a>
          </nav>
        </div>
      </header>

      {/* 2. BODY: Catálogo de productos */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10">
        <div className="flex items-end gap-2 mb-6">
          <h2 className="text-2xl font-light text-slate-600">Basado en tu última visita</h2>
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium pb-1">Ver historial</a>
        </div>
        
        {/* Grid responsivo: 1 col en móviles, 4 cols en PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {products.map((product) => (
            <article key={product.id} className="bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden flex flex-col h-[380px] group border border-transparent hover:border-gray-200">
              
              {/* Imagen del producto */}
              <div className="h-[224px] w-full bg-white border-b border-gray-100 p-4">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <span className="text-4xl">📷</span>
                  </div>
                )}
              </div>
              
              {/* Información (Precio, Envío, Título) */}
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-2xl font-normal text-slate-800 tracking-tight">
                  $ {product.price.toLocaleString('es-MX')}
                </span>
                
                {/* Lógica condicional: Si cuesta más de 500, envío gratis */}
                {product.price > 500 ? (
                  <span className="text-sm font-semibold text-[#00a650] mt-1">
                    Llega gratis mañana
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-blue-500 mt-1">
                    Envío con normalidad
                  </span>
                )}
                
                <h3 className="text-sm text-gray-500 font-light mt-2 line-clamp-2">
                  {product.name}
                </h3>
              </div>
            </article>
          ))}
          
        </div>
      </section>
    </main>
  );
}