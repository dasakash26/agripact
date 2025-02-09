import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Contract Performance',
      },
    },
  }

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  const data = {
    labels,
    datasets: [
      {
        label: 'Contracts Completed',
        data: [12, 19, 15, 17, 14, 12],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Revenue (in thousands)',
        data: [15, 25, 20, 22, 18, 16],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return <Bar options={options} data={data} />
}

