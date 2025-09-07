import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import {
  Cog6ToothIcon,
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  UsersIcon,
  GlobeAltIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline'

export default function EnterpriseSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    profile: {
      name: '',
      email: '',
      company: '',
      role: '',
    },
    notifications: {
      email: true,
      browser: false,
      sms: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
    billing: {
      plan: 'professional',
      card: '**** **** **** 1234',
      billingCycle: 'monthly',
    },
    team: {
      members: [
        { name: 'John Doe', email: 'john@company.com', role: 'admin', status: 'active' },
        { name: 'Jane Smith', email: 'jane@company.com', role: 'editor', status: 'active' },
      ],
    },
  })

  const tabs = [
    { name: 'General', id: 'general', icon: Cog6ToothIcon },
    { name: 'Profile', id: 'profile', icon: UserIcon },
    { name: 'Security', id: 'security', icon: ShieldCheckIcon },
    { name: 'Notifications', id: 'notifications', icon: BellIcon },
    { name: 'Billing', id: 'billing', icon: CreditCardIcon },
    { name: 'Team', id: 'team', icon: UsersIcon },
    { name: 'Integrations', id: 'integrations', icon: GlobeAltIcon },
    { name: 'Appearance', id: 'appearance', icon: PaintBrushIcon },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings settings={settings} setSettings={setSettings} />
      case 'profile':
        return <ProfileSettings settings={settings} setSettings={setSettings} />
      case 'security':
        return <SecuritySettings settings={settings} setSettings={setSettings} />
      case 'notifications':
        return <NotificationSettings settings={settings} setSettings={setSettings} />
      case 'billing':
        return <BillingSettings settings={settings} setSettings={setSettings} />
      case 'team':
        return <TeamSettings settings={settings} setSettings={setSettings} />
      case 'integrations':
        return <IntegrationSettings settings={settings} setSettings={setSettings} />
      case 'appearance':
        return <AppearanceSettings settings={settings} setSettings={setSettings} />
      default:
        return null
    }
  }

  const GeneralSettings = ({ settings, setSettings }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Name</label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => setSettings({...settings, profile: {...settings.profile, name: e.target.value}})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Form Theme</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
              <option>CST</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const ProfileSettings = ({ settings, setSettings }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => setSettings({...settings, profile: {...settings.profile, name: e.target.value}})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => setSettings({...settings, profile: {...settings.profile, email: e.target.value}})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={settings.profile.company}
              onChange={(e) => setSettings({...settings, profile: {...settings.profile, company: e.target.value}})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={settings.profile.role}
              onChange={(e) => setSettings({...settings, profile: {...settings.profile, role: e.target.value}})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const SecuritySettings = ({ settings, setSettings }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => setSettings({...settings, security: {...settings.security, twoFactor: !settings.security.twoFactor}})}
              className={`${settings.security.twoFactor ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className={`${settings.security.twoFactor ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings({...settings, security: {...settings.security, sessionTimeout: parseInt(e.target.value)}})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => setSettings({...settings, security: {...settings.security, passwordExpiry: parseInt(e.target.value)}})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const NotificationSettings = ({ settings, setSettings }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">{key}</p>
                <p className="text-sm text-gray-500">Receive {key} notifications</p>
              </div>
              <button
                onClick={() => setSettings({...settings, notifications: {...settings.notifications, [key]: !value}})}
                className={`${value ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const BillingSettings = ({ settings, setSettings }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Plan</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Free</option>
              <option>Professional</option>
              <option>Business</option>
              <option>Enterprise</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <input
              type="text"
              value={settings.billing.card}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Billing Cycle</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}