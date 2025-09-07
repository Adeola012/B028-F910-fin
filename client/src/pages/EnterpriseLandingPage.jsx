import { useState } from 'react'
import { SignInButton } from '@clerk/clerk-react'
import {
  ArrowRightIcon,
  SparklesIcon,
  ChartBarIcon,
  UsersIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'

export default function EnterpriseLandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "AI-Powered Form Creation",
      description: "Create professional forms in minutes with advanced AI assistance",
      icon: SparklesIcon,
      details: [
        "Natural language form generation",
        "5,000+ AI-enhanced templates",
        "Industry-specific best practices",
        "Real-time optimization suggestions",
      ],
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights into user behavior and form performance",
      icon: ChartBarIcon,
      details: [
        "Real-time performance tracking",
        "Conversion funnel analysis",
        "Device and location analytics",
        "A/B testing capabilities",
      ],
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security with compliance and audit trails",
      icon: ShieldCheckIcon,
      details: [
        "SOC 2 Type II compliance",
        "GDPR and CCPA compliant",
        "End-to-end encryption",
        "Audit trails and logs",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc.",
      content: "FormGenie AI increased our lead conversion by 45%. The AI optimization features are game-changing.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "StartupXYZ",
      content: "The enterprise-grade security and compliance features gave us confidence to use it across our entire organization.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of HR",
      company: "GlobalCorp",
      content: "We reduced our form abandonment by 60% and improved data quality significantly. The ROI has been incredible.",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small teams",
      features: [
        "Up to 3 forms",
        "1,000 submissions/month",
        "Basic analytics",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      description: "Best for growing businesses",
      features: [
        "Unlimited forms",
        "10,000 submissions/month",
        "Advanced analytics",
        "AI optimization",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited everything",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "White-label options",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FG</span>
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900">FormGenie AI</h1>
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
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Enterprise Form Builder with
              <span className="text-blue-600"> AI Power</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your data collection with AI-powered forms that continuously optimize based on user behavior.
              Trusted by Fortune 500 companies worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignInButton>
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </SignInButton>
              
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <PlayIcon className="h-5 w-5 mr-2" />
                Watch Demo
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">45-60%</div>
                <div className="text-gray-600">Higher Completion Rates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">99.9%</div>
                <div className="text-gray-600">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">SOC 2</div>
                <div className="text-gray-600">Type II Compliant</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Languages</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Enterprise Scale
            </h2>
            <p className="text-xl text-gray-600">
              Advanced features that grow with your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-600 flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Flexible plans that scale with your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-lg shadow-lg ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-4">{plan.price}</p>
                  <p className="text-gray-600">{plan.description}</p>
                  
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <SignInButton>
                      <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Get Started
                      </button>
                    </SignInButton>
                  </div>
                </div>
              </div>
            ))}
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
            Join Fortune 500 companies using FormGenie AI to create better forms
          </p>
          <SignInButton>
            <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
              Start Your Free Trial
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}