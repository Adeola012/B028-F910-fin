import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import EnterpriseNavigation from './components/EnterpriseNavigation'
import EnterpriseDashboard from './pages/EnterpriseDashboard'
import EnterpriseFormBuilder from './pages/EnterpriseFormBuilder'
import EnterpriseAnalytics from './pages/EnterpriseAnalytics'
import EnterpriseTemplates from './pages/EnterpriseTemplates'
import EnterpriseSettings from './pages/EnterpriseSettings'
import EnterpriseLandingPage from './pages/EnterpriseLandingPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      
      <SignedOut>
        <EnterpriseLandingPage />
      </SignedOut>
      
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <EnterpriseNavigation />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<EnterpriseDashboard />} />
              <Route path="/forms" element={<EnterpriseDashboard />} />
              <Route path="/forms/new" element={<EnterpriseFormBuilder />} />
              <Route path="/forms/:id/edit" element={<EnterpriseFormBuilder />} />
              <Route path="/analytics" element={<EnterpriseAnalytics />} />
              <Route path="/templates" element={<EnterpriseTemplates />} />
              <Route path="/settings" element={<EnterpriseSettings />} />
            </Routes>
          </main>
        </div>
      </SignedIn>
    </Router>
  )
}

export default App