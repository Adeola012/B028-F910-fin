import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import {
  PlusIcon,
  TrashIcon,
  EyeIcon,
  SparklesIcon,
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const fieldTypes = [
  { type: 'text', label: 'Text Input', icon: 'Aa' },
  { type: 'email', label: 'Email', icon: '@' },
  { type: 'number', label: 'Number', icon: '123' },
  { type: 'textarea', label: 'Text Area', icon: '¶' },
  { type: 'select', label: 'Dropdown', icon: '▼' },
  { type: 'radio', label: 'Radio', icon: '○' },
  { type: 'checkbox', label: 'Checkbox', icon: '☐' },
  { type: 'date', label: 'Date', icon: '📅' },
  { type: 'file', label: 'File Upload', icon: '📎' },
  { type: 'rating', label: 'Rating', icon: '★' },
]

export default function EnterpriseFormBuilder() {
  const { id } = useParams()
  const { user } = useUser()
  const [form, setForm] = useState({
    title: '',
    description: '',
    fields: [],
    settings: {
      theme: 'light',
      showProgressBar: true,
      allowMultipleSubmissions: false,
    },
  })
  const [activeTab, setActiveTab] = useState('builder')
  const [isPreview, setIsPreview] = useState(false)
  const [devicePreview, setDevicePreview] = useState('desktop')
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleAddField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: '',
      placeholder: '',
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1'] : [],
      validation: {},
    }
    setForm({ ...form, fields: [...form.fields, newField] })
  }

  const handleRemoveField = (id) => {
    setForm({ ...form, fields: form.fields.filter(field => field.id !== id) })
  }

  const handleUpdateField = (id, updates) => {
    setForm({
      ...form,
      fields: form.fields.map(field =>
        field.id === id ? { ...field, ...updates } : field
      ),
    })
  }

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    try {
      const response = await axios.post('/api/ai/generate-form', {
        prompt: aiPrompt,
        industry: 'general',
        type: 'contact',
      })
      
      setForm({
        ...form,
        ...response.data.data,
      })
    } catch (error) {
      console.error('Error generating form:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveForm = async () => {
    try {
      const response = await axios.post('/api/forms', {
        ...form,
        userId: user.id,
      })
      
      // Handle successful save
      console.log('Form saved:', response.data)
    } catch (error) {
      console.error('Error saving form:', error)
    }
  }

  const FieldEditor = ({ field, index }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">
            {fieldTypes.find(t => t.type === field.type)?.label}
          </span>
          <span className="text-sm text-gray-400">#{index + 1}</span>
        </div>
        <button
          onClick={() => handleRemoveField(field.id)}
          className="text-red-600 hover:text-red-800"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Field label"
          value={field.label}
          onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {field.type !== 'select' && field.type !== 'radio' && field.type !== 'checkbox' && (
          <input
            type="text"
            placeholder="Placeholder text"
            value={field.placeholder}
            onChange={(e) => handleUpdateField(field.id, { placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        
        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...field.options]
                    newOptions[optionIndex] = e.target.value
                    handleUpdateField(field.id, { options: newOptions })
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    const newOptions = field.options.filter((_, i) => i !== optionIndex)
                    handleUpdateField(field.id, { options: newOptions })
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleUpdateField(field.id, { options: [...field.options, 'New Option'] })}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Add option
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => handleUpdateField(field.id, { required: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Required</span>
          </label>
        </div>
      </div>
    </div>
  )

  const FormPreview = () => (
    <div className={`${devicePreview === 'mobile' ? 'max-w-sm mx-auto' : 'max-w-2xl mx-auto'} bg-white rounded-lg shadow-lg p-6`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{form.title || 'Untitled Form'}</h2>
      <p className="text-gray-600 mb-6">{form.description || 'Add a description...'}</p>
      
      {form.fields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label || 'Untitled Field'}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {field.type === 'text' && (
            <input
              type="text"
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          
          {field.type === 'email' && (
            <input
              type="email"
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          
          {field.type === 'textarea' && (
            <textarea
              placeholder={field.placeholder}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          
          {field.type === 'select' && (
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {field.options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          )}
          
          {field.type === 'radio' && (
            <div className="space-y-2">
              {field.options.map((option, i) => (
                <label key={i} className="flex items-center">
                  <input type="radio" name={field.id} className="mr-2" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {field.type === 'checkbox' && (
            <div className="space-y-2">
              {field.options.map((option, i) => (
                <label key={i} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Submit
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {id ? 'Edit Form' : 'Create New Form'}
              </h1>
              <p className="mt-2 text-gray-600">
                Build beautiful, intelligent forms with AI assistance
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSaveForm}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Save Form
              </button>
            </div>
          </div>
        </div>

        {/* AI Generation Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Form Generation</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Describe the form you want to create..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleGenerateWithAI}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
        </div>

        {/* Form Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Form Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter form title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter form description"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Types</h3>
              <div className="space-y-2">
                {fieldTypes.map((fieldType) => (
                  <button
                    key={fieldType.type}
                    onClick={() => handleAddField(fieldType.type)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <span className="mr-3">{fieldType.icon}</span>
                    {fieldType.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {isPreview ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setDevicePreview('desktop')}
                      className={`p-2 rounded ${devicePreview === 'desktop' ? 'bg-blue-100 text-blue-700' : 'text-gray-400'}`}
                    >
                      <ComputerDesktopIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setDevicePreview('mobile')}
                      className={`p-2 rounded ${devicePreview === 'mobile' ? 'bg-blue-100 text-blue-700' : 'text-gray-400'}`}
                    >
                      <DevicePhoneMobileIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <FormPreview />
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Fields</h3>
                <div className="space-y-4">
                  {form.fields.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No fields yet</h3>
                      <p className="text-gray-600 mb-4">Add fields or use AI to generate a form</p>
                      <button
                        onClick={() => handleAddField('text')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                      >
                        Add Field
                      </button>
                    </div>
                  ) : (
                    form.fields.map((field, index) => (
                      <FieldEditor key={field.id} field={field} index={index} />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}