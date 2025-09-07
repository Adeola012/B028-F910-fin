import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TabletIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

export default function EnterpriseAnalytics() {
  const { user } = useUser()
  const [selectedDateRange, setSelectedDateRange] = useState('7d')
  const [selectedForm, setSelectedForm] = useState('all')
  const [analytics, setAnalytics] = useState({
    overview: {},
    performance: [],
    deviceAnalytics: [],
    fieldAnalytics: [],
    dropOffPoints: [],
    conversionFunnel: [],
  })

  // Sample data - replace with real API calls
  const overviewData = {
    totalViews: 12500,
    totalSubmissions: 4875,
    completionRate: 39,
    avgCompletionTime: 145,
    bounceRate: 61,
    conversionRate: 39,
    trend: {
      views: { value: 12500, change: 12.5 },
      submissions: { value: 4875, change: 8.3 },
      completionRate: { value: 39, change: 5.2 },
      avgTime: { value: 145, change: -8.7 },
    },
  }

  const performanceData = [
    { date: '2024-01-01', views: 1200, submissions: 456, completionRate: 38 },
    { date: '2024-01-02', views: 1350, submissions: 523, completionRate: 39 },
    { date: '2024-01-03', views: 1180, submissions: 472, completionRate: 40 },
    { date: '2024-01-04', views: 1420, submissions: 568, completionRate: 40 },
    { date: '2024-01-05', views: 1560, submissions: 624, completionRate: 40 },
    { date: '2024-01-06', views: 1340, submissions: 536, completionRate: 40 },
    { date: '2024-01-07', views: 1650, submissions: 695, completionRate: 42 },
  ]

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#0ea5e9', icon: ComputerDesktopIcon },
    { name: 'Mobile', value: 25, color: '#22c55e', icon: DevicePhoneMobileIcon },
    { name: 'Tablet', value: 10, color: '#f59e0b', icon: TabletIcon },
  ]

  const fieldAnalytics = [
    { field: 'Name', views: 1200, interactions: 1150, dropOffRate: 4.2 },
    { field: 'Email', views: 1150, interactions: 1100, dropOffRate: 4.3 },
    { field: 'Phone', views: 1100, interactions: 1050, dropOffRate: 4.5 },
    { field: 'Message', views: 1050, interactions: 1000, dropOffRate: 4.8 },
    { field: 'Submit', views: 1000, interactions: 950, dropOffRate: 5.0 },
  ]

  const dropOffData = [
    { step: 'Form View', users: 12500, dropOff: 0 },
    { step: 'Start Form', users: 7500, dropOff: 40 },
    { step: 'Name Field', users: 6800, dropOff: 9.3 },
    { step: 'Email Field', users: 6200, dropOff: 8.8 },
    { step: 'Phone Field', users: 5800, dropOff: 6.5 },
    { step: 'Message Field', users: 5500, dropOff: 5.2 },
    { step: 'Form Submit', users: 4875, dropOff: 11.4 },
  ]

  const MetricCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend.change > 0 ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(trend.change)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-2 text-gray-600">Comprehensive insights into your form performance</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <select
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Forms</option>
                <option value="contact">Contact Form</option>
                <option value="survey">Survey Form</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Views"
            value={overviewData.totalViews.toLocaleString()}
            icon={EyeIcon}
            trend={overviewData.trend.views}
            color="bg-blue-500"
          />
          <MetricCard
            title="Total Submissions"
            value={overviewData.totalSubmissions.toLocaleString()}
            icon={CheckCircleIcon}
            trend={overviewData.trend.submissions}
            color="bg-green-500"
          />
          <MetricCard
            title="Completion Rate"
            value={`${overviewData.completionRate}%`}
            icon={ChartBarIcon}
            trend={overviewData.trend.completionRate}
            color="bg-purple-500"
          />
          <MetricCard
            title="Avg Completion Time"
            value={`${overviewData.avgCompletionTime}s`}
            icon={ClockIcon}
            trend={overviewData.trend.avgTime}
            color="bg-orange-500"
          />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Over Time */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stackId="1"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="submissions"
                  stackId="1"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Completion Rate Trend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Rate Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Analytics</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fieldAnalytics} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="field" type="category" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="dropOffRate" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Drop-off Analysis</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dropOffData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="dropOff" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dropOffData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="step" type="category" width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="users" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Metrics Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Metrics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Average Session Duration
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2m 45s</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+12%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Improving
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Form Abandonment Rate
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">61%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-5.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Needs Attention
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Mobile Completion Rate
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+8.3%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Improving
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}