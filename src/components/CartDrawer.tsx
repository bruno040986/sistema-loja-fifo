"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Trash2, Plus, Minus, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export function CartDrawer() {
  const { isDrawerOpen, toggleDrawer, items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    // Lojista WhatsApp Number
    const phoneNumber = "5561981617033"; 
    
    let message = `*NOVO PEDIDO - ARMAZÉM FIFO*%0A%0A`;
    message += `🛒 *Itens do Pedido:*%0A`;
    
    items.forEach((item) => {
      const isBulkActive = item.bulkQuantity && item.bulkPrice && item.quantity >= item.bulkQuantity;
      const currentPrice = isBulkActive ? item.bulkPrice! : item.price;
      const itemTotal = currentPrice * item.quantity;
      
      message += `▪ ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2)}`;
      if (isBulkActive) {
        message += ` _(Atacado)_`;
      }
      message += `%0A`;
    });
    
    message += `%0A💰 *Total:* R$ ${getCartTotal().toFixed(2)}%0A`;
    message += `%0A_Por favor, informe seu endereço para entrega ou confirme a retirada._`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    toggleDrawer();
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm transition-opacity" 
          onClick={toggleDrawer}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-zinc-950 border-l border-yellow-500/20 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Seu Carrinho
            <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">
              {items.length}
            </span>
          </h2>
          <button 
            onClick={toggleDrawer}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center">
                <ShoppingCart size={32} className="text-zinc-600" />
              </div>
              <p className="text-lg font-medium">Seu carrinho está vazio</p>
              <button 
                onClick={toggleDrawer}
                className="text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const isBulkActive = item.bulkQuantity && item.bulkPrice && item.quantity >= item.bulkQuantity;
                const currentPrice = isBulkActive ? item.bulkPrice! : item.price;
                const itemTotal = currentPrice * item.quantity;

                return (
                  <li key={item.id} className="flex gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800 relative">
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-zinc-800 rounded-lg flex-shrink-0 overflow-hidden border border-zinc-700 relative">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs text-center p-1">Sem imagem</div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-white font-medium text-sm leading-tight line-clamp-2">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Pricing Logic Display */}
                      <div className="mt-1">
                        {isBulkActive ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-zinc-400 line-through">R$ {item.price.toFixed(2)} un.</span>
                            <span className="text-yellow-400 font-bold text-sm">R$ {item.bulkPrice!.toFixed(2)} un. (Atacado)</span>
                          </div>
                        ) : (
                          <span className="text-white font-semibold text-sm">R$ {item.price.toFixed(2)}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-700">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-white">R$ {itemTotal.toFixed(2)}</span>
                      </div>
                      
                      {/* Bulk Discount Hint */}
                      {!isBulkActive && item.bulkQuantity && item.bulkPrice && (
                         <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                           <AlertCircle size={12} className="text-yellow-500" />
                           Faltam {item.bulkQuantity - item.quantity} para pagar R$ {item.bulkPrice.toFixed(2)}
                         </p>
                      )}
                      
                      {/* Max Stock Alert */}
                      {item.quantity >= item.stock && (
                         <p className="text-xs text-red-400 mt-1">
                           Estoque máximo atingido ({item.stock} un.)
                         </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 bg-zinc-900 border-t border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-400 font-medium">Total</span>
              <span className="text-2xl font-black text-yellow-400">
                R$ {getCartTotal().toFixed(2)}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-yellow-400 text-black font-bold text-lg py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-500/20"
            >
              Finalizar no WhatsApp
            </button>
            <div className="text-center mt-3">
              <p className="text-xs text-zinc-500">O pagamento será realizado na retirada/entrega.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Temporary icon to avoid importing it again if not used globally
function ShoppingCart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
