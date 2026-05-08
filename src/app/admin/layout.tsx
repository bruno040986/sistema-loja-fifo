import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Define if the current path requires authentication
  // Note: we need to handle login page differently to prevent redirect loops.
  // We'll let middleware or the page itself handle this if it gets complex,
  // but for simplicity, we check if it's not the login page.
  // Actually, in App Router, it's better to protect specific routes in their layout or page,
  // but since this layout wraps /admin, we must not block /admin/login.

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar only visible if logged in */}
      {session && (
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Image 
                  src="/logo-black.png" 
                  alt="Armazém Fifo Logo" 
                  width={120} 
                  height={60} 
                  className="object-contain py-2"
                  priority
                />
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/admin/dashboard" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/admin/produtos" className="text-gray-500 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    Produtos
                  </Link>
                  <Link href="/admin/categorias" className="text-gray-500 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    Categorias
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">Olá, {session.user?.name}</span>
                {/* We'll implement logout via a client component later or api route */}
                <Link href="/api/auth/signout" className="text-sm font-medium text-red-600 hover:text-red-500">
                  Sair
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
