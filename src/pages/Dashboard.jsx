import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import api from '../service/api'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', quantity: '', category: '' })
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    if (user) fetchItems()
  }, [user])

  const fetchItems = async () => {
    try {
      const response = await api.get(`/api/items/${user._id}`)
      setItems(response.data)
    } catch (err) {
      toast.error('Erro ao buscar os itens')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/api/items/add', {
        ...form,
        userId: user._id,
      })
      setItems([...items, response.data])
      setForm({ name: '', quantity: '', category: '' })
      toast.success('Item adicionado!')
    } catch (err) {
      toast.error('Erro ao adicionar item')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/items/${id}`)
      toast.success('Item deletado com sucesso')
      fetchItems()
    } catch (error) {
      toast.error('Erro ao deletar item')
    }
  }

  const handleEditClick = (item) => {
    setEditItem(item)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/api/items/${editItem._id}`, editItem)
      toast.success('Item atualizado com sucesso')
      setEditItem(null)
      fetchItems()
    } catch (error) {
      toast.error('Erro ao atualizar item')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Nova Lista de Compras</h1>

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

      {editItem && (
        <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Editar Item</h2>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            className="mr-2 mb-2 w-full p-2 border rounded"
          />
          <input
            type="number"
            value={editItem.quantity}
            onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
            className="mr-2 mb-2 w-full p-2 border rounded"
          />
          <input
            type="text"
            value={editItem.category}
            onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
            className="mr-2 mb-2 w-full p-2 border rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Salvar</button>
          <button type="button" onClick={() => setEditItem(null)} className="ml-2 text-gray-600">Cancelar</button>
        </form>
      )}

      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Minhas Listas</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h3>
            <p className="text-gray-700 dark:text-gray-300">Quantidade: {item.quantity}</p>
            <p className="text-gray-700 dark:text-gray-300">Categoria: {item.category}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Criado em: {format(new Date(item.createdAt), "dd/MM/yyyy 'às' HH:mm")}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEditClick(item)}
                className="text-yellow-500 hover:text-yellow-700"
              >Editar</button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700"
              >Apagar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
