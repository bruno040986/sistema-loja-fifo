"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
};

type Batch = {
  id?: string;
  expirationDate: string;
  price: string;
  bulkPrice: string;
  bulkQuantity: string;
  stock: string;
  isFeatured: boolean;
};

export default function NovoProdutoPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    categoryId: "",
    active: true,
  });

  const [batches, setBatches] = useState<Batch[]>([
    { expirationDate: "", price: "", bulkPrice: "", bulkQuantity: "", stock: "", isFeatured: false }
  ]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBatchChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setBatches(prev => {
      const newBatches = [...prev];
      if (type === 'checkbox') {
        newBatches[index] = { ...newBatches[index], [name]: (e.target as HTMLInputElement).checked };
      } else {
        newBatches[index] = { ...newBatches[index], [name]: value };
      }
      return newBatches;
    });
  };

  const addBatch = () => {
    setBatches(prev => [...prev, { expirationDate: "", price: "", bulkPrice: "", bulkQuantity: "", stock: "", isFeatured: false }]);
  };

  const removeBatch = (index: number) => {
    if (batches.length > 1) {
      setBatches(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      batches: batches.filter(b => b.expirationDate && b.price && b.stock) // Only send valid batches
    };

    if (payload.batches.length === 0) {
      alert("Adicione pelo menos um lote válido (Data, Preço e Estoque).");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/produtos");
    } else {
      alert("Erro ao criar produto.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex items-center mb-8">
          <Link href="/admin/produtos" className="text-gray-500 hover:text-gray-900 mr-4">
            ← Voltar
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Novo Produto</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Informações Básicas */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Informações Básicas</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto *</label>
                <div className="mt-1">
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white placeholder-gray-400" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <div className="mt-1">
                  <textarea id="description" name="description" rows={3} value={formData.description} onChange={handleChange} className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 text-gray-900 bg-white placeholder-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Categoria *</label>
                <div className="mt-1">
                  <select id="categoryId" name="categoryId" required value={formData.categoryId} onChange={handleChange} className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white">
                    <option value="">Selecione uma categoria</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                <div className="mt-1">
                  <input type="url" name="imageUrl" id="imageUrl" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white placeholder-gray-400" />
                </div>
              </div>
              
              <div className="sm:col-span-2 flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                  <span className="text-sm font-medium text-gray-900">Produto Ativo (Aparece na loja)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Lotes / Vencimentos */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-900">Lotes & Vencimentos</h2>
              <button type="button" onClick={addBatch} className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-100 font-medium border border-indigo-200">
                + Adicionar Lote
              </button>
            </div>
            
            <div className="space-y-6">
              {batches.map((batch, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200 relative">
                  <div className="absolute top-4 right-4">
                    <button type="button" onClick={() => removeBatch(index)} disabled={batches.length === 1} className="text-red-500 hover:text-red-700 disabled:opacity-30">
                      Remover
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Lote {index + 1}</h3>
                    <label className="flex items-center gap-2 cursor-pointer ml-4">
                      <input type="checkbox" name="isFeatured" checked={batch.isFeatured} onChange={(e) => handleBatchChange(index, e)} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                      <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">★ Destacar na Página Inicial</span>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 text-red-600">Vencimento *</label>
                      <input type="date" name="expirationDate" required value={batch.expirationDate} onChange={(e) => handleBatchChange(index, e)} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preço Varejo (R$) *</label>
                      <input type="number" step="0.01" name="price" required value={batch.price} onChange={(e) => handleBatchChange(index, e)} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estoque *</label>
                      <input type="number" name="stock" required value={batch.stock} onChange={(e) => handleBatchChange(index, e)} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white" />
                    </div>
                    
                    <div className="sm:col-span-3 mt-2 border-t pt-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Opcional: Regra Leve Mais Pague Menos</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Qtd. Mínima Atacado</label>
                          <input type="number" name="bulkQuantity" value={batch.bulkQuantity} onChange={(e) => handleBatchChange(index, e)} placeholder="Ex: 5" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Preço Atacado (R$)</label>
                          <input type="number" step="0.01" name="bulkPrice" value={batch.bulkPrice} onChange={(e) => handleBatchChange(index, e)} placeholder="Ex: 8.50" className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900 bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/produtos" className="bg-white py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Cancelar
            </Link>
            <button type="submit" disabled={loading} className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400">
              {loading ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
