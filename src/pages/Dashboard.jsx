// pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../service/api'
import { useAuth } from '../context/AuthContext'
import AddItemForm from '../components/AddItemForm'
import ItemList from '../components/ItemList'

export default function Dashboard() {
  const { user } = useAuth()
  const [items, setItems] = useState([])

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Nova Lista de Compras</h1>
      <AddItemForm userId={user._id} onItemAdded={(item) => setItems([...items, item])} />
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Minhas Listas</h2>
      <ItemList items={items} setItems={setItems} />
    </div>
  )
}
