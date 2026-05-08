"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type Category = {
  id: string;
  name: string;
  active: boolean;
};

export default function CategoriasPage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State for editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (Array.isArray(data)) setCategories(data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setLoading(true);

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setName("");
      fetchCategories();
    } else {
      alert("Erro ao criar categoria");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
    
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchCategories();
    } else {
      const data = await res.json();
      alert(data.error || "Erro ao excluir categoria");
    }
  };

  const handleToggleActive = async (category: Category) => {
    const res = await fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !category.active }),
    });

    if (res.ok) {
      fetchCategories();
    } else {
      alert("Erro ao alterar status");
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (id: string) => {
    if (!editName) return;
    
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });

    if (res.ok) {
      setEditingId(null);
      setEditName("");
      fetchCategories();
    } else {
      alert("Erro ao salvar categoria");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Categorias</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Nova Categoria</h2>
          <form onSubmit={handleCreate} className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Laticínios"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </form>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {categories.length === 0 ? (
              <li className="p-6 text-center text-gray-500">Nenhuma categoria cadastrada.</li>
            ) : (
              categories.map((category) => (
                <li key={category.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {editingId === category.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                        autoFocus
                      />
                      <button onClick={() => saveEdit(category.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                        Salvar
                      </button>
                      <button onClick={cancelEditing} className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm">
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${category.active ? 'bg-green-500' : 'bg-red-500'}`} title={category.active ? 'Ativa' : 'Inativa'}></span>
                        <span className={`text-gray-900 font-medium ${!category.active && 'opacity-50 line-through'}`}>
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleToggleActive(category)}
                          className={`text-sm font-medium ${category.active ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                        >
                          {category.active ? 'Desativar' : 'Ativar'}
                        </button>
                        <button 
                          onClick={() => startEditing(category)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
