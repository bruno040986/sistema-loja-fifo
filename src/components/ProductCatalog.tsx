"use client";

import { useState } from "react";
import { ProductCard, StoreItem } from "./ProductCard";

export function ProductCatalog({ items }: { items: StoreItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = ["Todos", ...Array.from(new Set(items.map((i) => i.category.name))).sort()];

  const filteredItems = selectedCategory === "Todos" 
    ? items 
    : items.filter(item => item.category.name === selectedCategory);

  return (
    <div>
      {/* Categories / Filters */}
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/20"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-yellow-400 hover:border-yellow-500/50 font-medium"
              }`}
            >
              {cat === "Todos" ? "Todos os Produtos" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center mt-10">
          <p className="text-xl text-zinc-400">Nenhum produto disponível nesta categoria no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
