import { useState } from 'react'
import { SignInButton } from '@clerk/clerk-react'
import { ArrowRightIcon, SparklesIcon, ChartBarIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [
    {
      title: "AI-Powered Form Creation",
      description: "Generate complete, optimized forms from simple text prompts",
      icon: SparklesIcon,
      details: [
        "Natural language form generation",
        "5,000+ AI-enhanced templates",
        "Industry-specific best practices",
        "Accessibility compliance built-in"
      ]
    },
    {
      title: "FormGenie Optimizer™",
      description: "Continuous improvement through behavioral analytics",
      icon: ChartBarIcon,
      details: [
        "Real-time performance tracking",
        "AI-driven recommendations",
        "One-click optimization",
        "A/B testing capabilities"
      ]
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights into user behavior and form performance",
      icon: UsersIcon,
      details: [
        "Engagement heatmaps",
        "Drop-off analysis",
        "Device performance tracking",
        "Demographic insights"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FormGenie AI</h1>
            </div>
            <SignInButton>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Intelligent Forms with
            <span className="text-blue-600"> AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your data collection with AI-generated forms that continuously optimize based on user behavior.
            Get 45-60% higher completion rates with FormGenie Optimizer™.
          </p>
          <div className="flex justify-center space-x-4">
            <SignInButton>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Get Started Free
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </SignInButton>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose FormGenie AI?
          </h2>
          <p className="text-xl text-gray-600">
            The only form builder that improves after deployment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              
              {activeFeature === index && (
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">45-60%</div>
              <div className="text-gray-600">Higher Completion Rates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">5,000+</div>
              <div className="text-gray-600">AI Templates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Languages Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100+</div>
              <div className="text-gray-600">Integrations</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Forms?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses using FormGenie AI to create better forms
          </p>
          <SignInButton>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
              Start Your Free Trial
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}