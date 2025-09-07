import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  UsersIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const templates = [
  {
    id: 1,
    name: 'Contact Form',
    description: 'Professional contact form with validation',
    category: 'Business',
    usageCount: 1250,
    fields: 5,
    avgCompletionRate: 78,
    previewImage: '/templates/contact-form.jpg',
    tags: ['contact', 'business', 'professional'],
  },
  {
    id: 2,
    name: 'Customer Survey',
    description: 'Comprehensive customer feedback survey',
    category: 'Survey',
    usageCount: 890,
    fields: 12,
    avgCompletionRate: 65,
    previewImage: '/templates/survey.jpg',
    tags: ['survey', 'feedback', 'customer'],
  },
  {
    id: 3,
    name: 'Job Application',
    description: 'Complete job application form with file upload',
    category: 'HR',
    usageCount: 567,
    fields: 15,
    avgCompletionRate: 72,
    previewImage: '/templates/job-application.jpg',
    tags: ['job', 'hr', 'application'],
  },
  {
    id: 4,
    name: 'Event Registration',
    description: 'Event registration with payment integration',
    category: 'Events',
    usageCount: 432,
    fields: 8,
    avgCompletionRate: 85,
    previewImage: '/templates/event-registration.jpg',
    tags: ['event', 'registration', 'payment'],
  },
  {
    id: 5,
    name: 'Lead Generation',
    description: 'High-converting lead capture form',
    category: 'Marketing',
    usageCount: 2100,
    fields: 4,
    avgCompletionRate: 82,
    previewImage: '/templates/lead-generation.jpg',
    tags: ['lead', 'marketing', 'conversion'],
  },
  {
    id: 6,
    name: 'Customer Feedback',
    description: 'Simple feedback collection form',
    category: 'Feedback',
    usageCount: 1567,
    fields: 6,
    avgCompletionRate: 88,
    previewImage: '/templates/feedback.jpg',
    tags: ['feedback', 'customer', 'simple'],
  },
]

const categories = ['All', 'Business', 'Survey', 'HR', 'Events', 'Marketing', 'Feedback']

export default function EnterpriseTemplates() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredTemplates, setFilteredTemplates] = useState(templates)

  useEffect(() => {
    let filtered = templates
    
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }
    
    setFilteredTemplates(filtered)
  }, [searchTerm, selectedCategory])

  const TemplateCard = ({ template }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <DocumentTextIcon className="h-16 w-16 text-gray-400" />
        </div>
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {template.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              {template.fields} fields
            </div>
            <div className="flex items-center">
              <UsersIcon className="h-4 w-4 mr-1" />
              {template.usageCount.toLocaleString()} uses
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {template.avgCompletionRate}% completion
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <SparklesIcon className="h-4 w-4 mr-2" />
            Use Template
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Preview
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Form Templates</h1>
          <p className="mt-2 text-gray-600">Choose from our collection of professionally designed templates</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}