import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import FormBuilder from './pages/FormBuilder'
import Analytics from './pages/Analytics'
import Templates from './pages/Templates'
import Settings from './pages/Settings'
import Navigation from './components/Navigation'
import LandingPage from './pages/LandingPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        
        <SignedOut>
          <LandingPage />
        </SignedOut>
        
        <SignedIn>
          <div className="flex h-screen bg-gray-50">
            <Navigation />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/forms" element={<Dashboard />} />
                <Route path="/forms/new" element={<FormBuilder />} />
                <Route path="/forms/:id/edit" element={<FormBuilder />} />
                <Route path="/forms/:id/analytics" element={<Analytics />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </SignedIn>
      </div>
    </Router>
  )
}

export default App