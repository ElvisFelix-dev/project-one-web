import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import api from '../service/api'

export default function Dashboard() {
  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState('')

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    try {
      const response = await api.get('/api/lists')
      setLists(response.data)
    } catch (err) {
      console.error('Erro ao buscar listas:', err)
    }
  }

  const handleCreateList = async (e) => {
    e.preventDefault()
    if (!newListName.trim()) return

    try {
      await api.post('/api/lists', { name: newListName })
      setNewListName('')
      fetchLists()
    } catch (err) {
      console.error('Erro ao criar lista:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Minhas Listas de Compras</h2>

        <form onSubmit={handleCreateList} className="flex gap-2">
          <input
            type="text"
            placeholder="Nova lista..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Criar
          </button>
        </form>

        <ul className="space-y-3">
          {lists.length === 0 && (
            <li className="text-gray-500 dark:text-gray-300">Nenhuma lista criada ainda.</li>
          )}
          {lists.map((list) => (
            <li
              key={list._id}
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
            >
              <span className="text-gray-800 dark:text-white">{list.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Criada em {format(new Date(list.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
