// components/AddItemForm.jsx
import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../service/api'

export default function AddItemForm({ userId, onItemAdded }) {
  const [form, setForm] = useState({ name: '', quantity: '', category: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/api/items/add', {
        ...form,
        userId,
      })
      onItemAdded(response.data)
      setForm({ name: '', quantity: '', category: '' })
      toast.success('Item adicionado!')
    } catch (err) {
      toast.error('Erro ao adicionar item')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        type="text"
        placeholder="Nome do item"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        required
        className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Categoria"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
        className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar Item
      </button>
    </form>
  )
}
