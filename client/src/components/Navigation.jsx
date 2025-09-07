import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  CogIcon,
  SquaresPlusIcon 
} from '@heroicons/react/24/outline'
import { useUser } from '@clerk/clerk-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'My Forms', href: '/forms', icon: DocumentTextIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Templates', href: '/templates', icon: SquaresPlusIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

export default function Navigation() {
  const location = useLocation()
  const { user } = useUser()

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-xl font-bold text-white">FormGenie AI</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="flex-shrink-0 p-4 border-t">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src={user?.profileImageUrl}
            alt={user?.fullName || 'User'}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.fullName}</p>
            <p className="text-xs text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>
      </div>
    </div>
  )
}