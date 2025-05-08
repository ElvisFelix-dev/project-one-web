// src/components/ItemsByNameChart.jsx
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import api from '../service/api'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function ItemsByNameChart() {
  const { user } = useAuth()
  const [data, setData] = useState([])

  useEffect(() => {
    if (user) fetchItems()
  }, [user])

  const fetchItems = async () => {
    try {
      const response = await api.get(`/api/items/${user._id}`)
      const grouped = groupByName(response.data)
      setData(grouped)
    } catch (err) {
      toast.error('Erro ao carregar itens para o gráfico')
    }
  }

  const groupByName = (items) => {
    const counts = {}
    items.forEach((item) => {
      if (item.name) {
        counts[item.name] = (counts[item.name] || 0) + item.quantity
      }
    })
    return Object.keys(counts).map((name) => ({
      name,
      quantidade: counts[name],
    }))
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">Quantidade por Item</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantidade" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
