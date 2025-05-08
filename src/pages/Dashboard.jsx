import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../service/api'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a29bfe', '#00cec9']

export default function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState([])

  useEffect(() => {
    if (user) fetchItems()
  }, [user])

  const fetchItems = async () => {
    try {
      const response = await api.get(`/api/items/${user._id}`)

      const categoryMap = {}

      response.data.forEach(item => {
        const category = item.category || 'Sem categoria'
        categoryMap[category] = (categoryMap[category] || 0) + 1
      })

      const chartData = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
      }))

      setData(chartData)
    } catch (err) {
      toast.error('Erro ao carregar categorias')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Itens por Categoria
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
