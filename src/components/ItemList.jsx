// components/ItemList.jsx
import { useState } from 'react'
import { CiTrash, CiEdit } from "react-icons/ci";
import { format } from 'date-fns'
import { toast } from 'react-toastify'

import api from '../service/api'

export default function ItemList({ items, setItems }) {
  const [editItemId, setEditItemId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', quantity: '', category: '' })

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/items/${id}`)
      setItems(items.filter(item => item._id !== id))
      toast.success('Item removido!')
    } catch {
      toast.error('Erro ao apagar item')
    }
  }

  const handleEdit = (item) => {
    setEditItemId(item._id)
    setEditForm({ name: item.name, quantity: item.quantity, category: item.category })
  }

  const handleEditSubmit = async (id) => {
    try {
      const response = await api.put(`/api/items/${id}`, editForm)
      setItems(items.map(item => item._id === id ? response.data : item))
      setEditItemId(null)
      toast.success('Item atualizado!')
    } catch {
      toast.error('Erro ao editar item')
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item._id} className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
          {editItemId === item._id ? (
            <>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="block w-full mb-2 p-2 rounded"
              />
              <input
                type="number"
                value={editForm.quantity}
                onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                className="block w-full mb-2 p-2 rounded"
              />
              <input
                type="text"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="block w-full mb-2 p-2 rounded"
              />
              <button
                onClick={() => handleEditSubmit(item._id)}
                className="mr-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditItemId(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
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
                >
                  <CiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <CiTrash size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
