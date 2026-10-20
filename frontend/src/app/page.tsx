'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error al cargar el catálogo:", err));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
            Artesanías Papantla
          </h1>
          <p className="text-lg text-gray-600">Catálogo de artesanías y productos regionales.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <article key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-52 bg-gray-100 w-full relative overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-2xl font-black text-emerald-600">${product.price.toFixed(2)}</span>
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}