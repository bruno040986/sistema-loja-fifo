"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Clock } from "lucide-react";
import Image from "next/image";

export type StoreItem = {
  id: string; // Batch ID
  productId: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  bulkPrice: number | null;
  bulkQuantity: number | null;
  stock: number;
  expirationDate: string;
  category: { name: string };
};

type ProductCardProps = {
  item: StoreItem;
};

export function ProductCard({ item }: ProductCardProps) {
  const { addItem, items } = useCartStore();
  
  // Calculate days to expiration using date-only (no time) to avoid hydration mismatch
  const todayStr = new Date().toISOString().slice(0, 10);
  const expStr = new Date(item.expirationDate).toISOString().slice(0, 10);
  const todayMs = new Date(todayStr).getTime();
  const expMs = new Date(expStr).getTime();
  const diffDays = Math.ceil(Math.abs(expMs - todayMs) / (1000 * 60 * 60 * 24));
  
  const isExpiringSoon = diffDays <= 7;

  // Format expiration date manually to avoid locale differences between server/client
  const expDate = new Date(item.expirationDate);
  const formattedExpDate = `${String(expDate.getUTCDate()).padStart(2, '0')}/${String(expDate.getUTCMonth() + 1).padStart(2, '0')}/${expDate.getUTCFullYear()}`;
  
  // Check if item is already in cart to show current quantity added
  // Note: we track cart items by Batch ID now
  const cartItem = items.find(i => i.id === item.id);
  const currentQuantityInCart = cartItem?.quantity || 0;
  const isOutOfStock = item.stock <= 0 || currentQuantityInCart >= item.stock;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    addItem({
      id: item.id, // Batch ID is the unique identifier for the cart
      name: item.name,
      price: item.price,
      bulkPrice: item.bulkPrice,
      bulkQuantity: item.bulkQuantity,
      stock: item.stock,
      imageUrl: item.imageUrl || undefined,
      quantity: 1
    });
  };

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col group hover:border-yellow-500/50 transition-colors shadow-lg shadow-black/20">
      {/* Image Section */}
      <div className="relative h-48 bg-zinc-800 overflow-hidden flex items-center justify-center p-4">
        {item.imageUrl ? (
          <Image 
            src={item.imageUrl} 
            alt={item.name}
            width={300}
            height={192}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 640px) 85vw, 320px"
          />
        ) : (
          <div className="text-zinc-600 font-medium">Sem Imagem</div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isExpiringSoon && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md" suppressHydrationWarning>
              <Clock size={12} />
              Vence em {diffDays} {diffDays === 1 ? 'dia' : 'dias'}
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md w-fit">
            {item.category.name}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-1 line-clamp-2" title={item.name}>
          {item.name}
        </h3>
        
        {/* Expiration explicit text */}
        <p className="text-xs font-semibold text-red-400 mb-2" suppressHydrationWarning>
          Válido até: {formattedExpDate}
        </p>

        {item.description && (
          <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">
            {item.description}
          </p>
        )}
        
        {!item.description && <div className="flex-1" />}

        {/* Pricing Area */}
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-zinc-500 text-sm">Varejo</p>
              <p className="text-xl font-bold text-white">
                R$ {item.price.toFixed(2)}
              </p>
            </div>
            
            {item.bulkQuantity && item.bulkPrice && (
              <div className="text-right bg-yellow-500/10 border border-yellow-500/30 p-2 rounded-lg">
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-0.5">Leve Mais Pague Menos!</p>
                <p className="text-sm text-yellow-400">
                  A partir de <span className="font-bold">{item.bulkQuantity} un.</span>
                </p>
                <p className="text-lg font-black text-yellow-400">
                  R$ {item.bulkPrice.toFixed(2)} <span className="text-xs font-normal">/cada</span>
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isOutOfStock 
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                : "bg-yellow-400 text-black hover:bg-yellow-500 active:scale-95 shadow-lg shadow-yellow-500/20"
            }`}
          >
            <ShoppingCart size={20} />
            {item.stock <= 0 
              ? "Esgotado" 
              : currentQuantityInCart >= item.stock 
                ? "Limite de Estoque" 
                : "Adicionar ao Carrinho"}
          </button>
          
          <p className="text-center text-xs text-zinc-500 mt-3">
            Estoque disponível: {item.stock} un.
          </p>
        </div>
      </div>
    </div>
  );
}
