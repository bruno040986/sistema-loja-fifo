"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("./CartDrawer").then(mod => ({ default: mod.CartDrawer })), {
  ssr: false,
});

export function Header() {
  const { getCartItemsCount, toggleDrawer } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for persisted store
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getCartItemsCount() : 0;

  return (
    <>
      <header className="bg-black text-white sticky top-0 z-40 border-b border-yellow-500/20 shadow-md shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Area */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center group">
                <Image 
                  src="/logo-transparent.png" 
                  alt="Armazém Fifo Logo" 
                  width={150} 
                  height={75} 
                  className="object-contain hover:scale-105 transition-transform"
                  priority
                />
              </Link>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-6">
              <Link 
                href="/admin/login" 
                className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm font-medium"
                title="Painel Admin"
              >
                <User size={20} />
                <span className="hidden sm:inline">Entrar</span>
              </Link>

              <button
                onClick={toggleDrawer}
                className="relative p-2 text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none"
                aria-label="Carrinho de Compras"
              >
                <ShoppingCart size={28} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-yellow-400 rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
