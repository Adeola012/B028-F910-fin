import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import {
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrendingUpIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import axios from 'axios'

export default function EnterpriseDashboard() {
  const { user } = useUser()
  const [stats, setStats] = useState({
    totalForms: 0,
    totalSubmissions: 0,
    avgCompletionRate: 0,
    totalViews: 0,
    avgCompletionTime: 0,
    bounceRate: 0,
    conversionRate: 0,
  })
  const [recentForms, setRecentForms] = useState([])
  const [analyticsData, setAnalyticsData] = useState([])
  const [deviceData, setDeviceData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch forms and analytics
      const formsResponse = await axios.get(`/api/forms/user/${user.id}`)
      const forms = formsResponse.data.data || []
      
      // Calculate stats
      const stats = calculateStats(forms)
      setStats(stats)
      setRecentForms(forms.slice(0, 5))
      
      // Generate sample analytics data
      setAnalyticsData(generateSampleAnalytics())
      setDeviceData(generateDeviceData())
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (forms) => {
    const totalForms = forms.length
    const totalSubmissions = forms.reduce((sum, form) => sum + (form.submissions || 0), 0)
    const totalViews = forms.reduce((sum, form) => sum + (form.views || 0), 0)
    const avgCompletionRate = totalViews > 0 ? (totalSubmissions / totalViews) * 100 : 0
    const avgCompletionTime = forms.reduce((sum, form) => sum + (form.avgCompletionTime || 0), 0) / totalForms || 0
    
    return {
      totalForms,
      totalSubmissions,
      avgCompletionRate: Math.round(avgCompletionRate),
      totalViews,
      avgCompletionTime: Math.round(avgCompletionTime),
      bounceRate: Math.round(100 - avgCompletionRate),
      conversionRate: Math.round(avgCompletionRate),
    }
  }

  const generateSampleAnalytics = () => {
    return [
      { date: 'Mon', views: 120, submissions: 45, completionRate: 37.5 },
      { date: 'Tue', views: 180, submissions: 72, completionRate: 40.0 },
      { date: 'Wed', views: 200, submissions: 85, completionRate: 42.5 },
      { date: 'Thu', views: 160, submissions: 68, completionRate: 42.5 },
      { date: 'Fri', views: 220, submissions: 95, completionRate: 43.2 },
      { date: 'Sat', views: 140, submissions: 58, completionRate: 41.4 },
      { date: 'Sun', views: 100, submissions: 42, completionRate: 42.0 },
    ]
  }

  const generateDeviceData = () => {
    return [
      { name: 'Desktop', value: 65, color: '#0ea5e9' },
      { name: 'Mobile', value: 25, color: '#22c55e' },
      { name: 'Tablet', value: 10, color: '#f59e0b' },
    ]
  }

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`h-6 w-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
      {trendValue && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-600" />
          )}
          <span className={`ml-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your forms</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <Link
              to="/forms/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Form
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Forms"
            value={stats.totalForms}
            icon={DocumentTextIcon}
            trend="up"
            trendValue="+2 this week"
          />
          <StatCard
            title="Total Submissions"
            value={stats.totalSubmissions}
            icon={UsersIcon}
            trend="up"
            trendValue="+12% from last week"
          />
          <StatCard
            title="Avg Completion Rate"
            value={`${stats.avgCompletionRate}%`}
            icon={CheckCircleIcon}
            trend="up"
            trendValue="+5% improvement"
          />
          <StatCard
            title="Avg Completion Time"
            value={`${stats.avgCompletionTime}s`}
            icon={ClockIcon}
            trend="down"
            trendValue="-8% faster"
          />
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
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

          {/* Completion Rate Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Rates</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Device Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
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

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Contact Form Submitted</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUpIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Form optimization completed</p>
                  <p className="text-sm text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EyeIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New form viewed 50 times</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Forms */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Forms</h3>
              <Link
                to="/forms"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all →
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentForms.length > 0 ? (
              recentForms.map((form) => (
                <div key={form.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{form.title}</h4>
                      <p className="text-sm text-gray-500">{form.description || 'No description'}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {form.submissions || 0} submissions
                      </div>
                      <div className="text-sm text-gray-500">
                        {form.views || 0} views
                      </div>
                      <Link
                        to={`/forms/${form.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first form</p>
                <Link
                  to="/forms/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Your First Form
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}