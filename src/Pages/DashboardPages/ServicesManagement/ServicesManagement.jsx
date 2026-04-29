import { useEffect, useState } from 'react'
import DashboardShell from '../DashboardShell.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialPageForm = {
  heroImage: '',
  missionVideo: '',
  heroTitle: 'Services',
  sectionLabel: 'Our Services',
  sectionTitle: 'We Provide The Best Services',
  missionTitle: 'Mission is to Growth Your Business & More',
}

const initialServiceForm = {
  title: '',
  description: '',
  icon: '',
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || 'Request failed')
  }

  return data
}

async function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || 'File upload failed')
  }

  const fileUrl = data?.file?.url ? `${API_BASE_URL}${data.file.url}` : ''

  if (!fileUrl) {
    throw new Error('Uploaded file URL not found')
  }

  return fileUrl
}

export default function ServicesManagement() {
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [serviceForm, setServiceForm] = useState(initialServiceForm)
  const [services, setServices] = useState([])
  const [editingId, setEditingId] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingPage, setSavingPage] = useState(false)
  const [savingService, setSavingService] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [uploadingField, setUploadingField] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadServicesData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/services-page')
      setPageForm({
        heroImage: data.heroImage || '',
        missionVideo: data.missionVideo || '',
        heroTitle: data.heroTitle || 'Services',
        sectionLabel: data.sectionLabel || 'Our Services',
        sectionTitle: data.sectionTitle || 'We Provide The Best Services',
        missionTitle: data.missionTitle || 'Mission is to Growth Your Business & More',
      })
      setServices(data.services || [])
    } catch (requestError) {
      setError(requestError.message || 'Failed to load services data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServicesData()
  }, [])

  const handlePageChange = (event) => {
    const { name, value } = event.target
    setPageForm((current) => ({ ...current, [name]: value }))
  }

  const handleServiceChange = (event) => {
    const { name, value } = event.target
    setServiceForm((current) => ({ ...current, [name]: value }))
  }

  const handleFileUpload = async (event, fieldName) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingField(fieldName)
    setMessage('')
    setError('')

    try {
      const uploadedUrl = await uploadFile(file)
      setPageForm((current) => ({
        ...current,
        [fieldName]: uploadedUrl,
      }))
      setMessage(`${fieldName === 'heroImage' ? 'Hero image' : 'Mission video'} uploaded successfully`)
    } catch (requestError) {
      setError(requestError.message || 'Failed to upload file')
    } finally {
      setUploadingField('')
      event.target.value = ''
    }
  }

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    setSavingPage(true)
    setMessage('')
    setError('')

    try {
      const result = await apiRequest('/api/services-page', {
        method: 'PUT',
        body: JSON.stringify(pageForm),
      })
      setMessage(result.message || 'Services page updated successfully')
      await loadServicesData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to update page content')
    } finally {
      setSavingPage(false)
    }
  }

  const handleServiceSubmit = async (event) => {
    event.preventDefault()
    setSavingService(true)
    setMessage('')
    setError('')

    try {
      const path = editingId ? `/api/services/${editingId}` : '/api/services'
      const method = editingId ? 'PUT' : 'POST'
      const result = await apiRequest(path, {
        method,
        body: JSON.stringify(serviceForm),
      })

      setMessage(result.message || 'Service saved successfully')
      setServiceForm(initialServiceForm)
      setEditingId('')
      await loadServicesData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to save service')
    } finally {
      setSavingService(false)
    }
  }

  const handleEditService = (service) => {
    setEditingId(service._id)
    setServiceForm({
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || '',
    })
    setMessage('')
    setError('')
  }

  const handleDeleteService = async (serviceId) => {
    setDeletingId(serviceId)
    setMessage('')
    setError('')

    try {
      const result = await apiRequest(`/api/services/${serviceId}`, {
        method: 'DELETE',
      })
      setMessage(result.message || 'Service deleted successfully')
      if (editingId === serviceId) {
        setEditingId('')
        setServiceForm(initialServiceForm)
      }
      await loadServicesData()
    } catch (requestError) {
      setError(requestError.message || 'Failed to delete service')
    } finally {
      setDeletingId('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId('')
    setServiceForm(initialServiceForm)
    setMessage('')
    setError('')
  }

  return (
    <DashboardShell
      title="Services Management"
      subtitle="Ei dashboard page theke `ServicesPage.jsx` er hero content, mission video, ar services card gulo create, read, update, delete korte parbe."
    >
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Services Page Content</p>
                <h2 className="mt-3 text-2xl font-black text-white">Hero and section settings</h2>
              </div>
              <button
                type="button"
                onClick={loadServicesData}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
              >
                Refresh
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handlePageSubmit}>
              {[
                ['heroTitle', 'Hero Title'],
                ['sectionLabel', 'Section Label'],
                ['sectionTitle', 'Section Title'],
                ['missionTitle', 'Mission Title'],
              ].map(([name, label]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">{label}</span>
                  <input
                    type="text"
                    name={name}
                    value={pageForm[name]}
                    onChange={handlePageChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#00d2ff]/40"
                  />
                </label>
              ))}

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">Hero Image Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileUpload(event, 'heroImage')}
                    className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
                  />
                  <p className="mt-2 text-xs text-white/50">
                    {uploadingField === 'heroImage' ? 'Uploading hero image...' : 'Choose an image file to upload'}
                  </p>
                  {pageForm.heroImage ? (
                    <p className="mt-2 break-all text-xs text-white/45">{pageForm.heroImage}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/82">Mission Video Upload</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(event) => handleFileUpload(event, 'missionVideo')}
                    className="block w-full text-sm text-white/75 file:mr-4 file:rounded-xl file:border-0 file:bg-[#00d2ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#000b1e]"
                  />
                  <p className="mt-2 text-xs text-white/50">
                    {uploadingField === 'missionVideo' ? 'Uploading mission video...' : 'Choose a video file to upload'}
                  </p>
                  {pageForm.missionVideo ? (
                    <p className="mt-2 break-all text-xs text-white/45">{pageForm.missionVideo}</p>
                  ) : null}
                </label>
              </div>

              <button
                type="submit"
                disabled={savingPage || Boolean(uploadingField)}
                className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {savingPage ? 'Saving...' : 'Save Page Content'}
              </button>
            </form>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Create or Update Service</p>
            <h2 className="mt-3 text-2xl font-black text-white">
              {editingId ? 'Edit selected service' : 'Add a new service card'}
            </h2>

            <form className="mt-6 space-y-4" onSubmit={handleServiceSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Service Title</span>
                <input
                  type="text"
                  name="title"
                  value={serviceForm.title}
                  onChange={handleServiceChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Description</span>
                <textarea
                  name="description"
                  value={serviceForm.description}
                  onChange={handleServiceChange}
                  rows="4"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/82">Icon</span>
                <input
                  type="text"
                  name="icon"
                  value={serviceForm.icon}
                  onChange={handleServiceChange}
                  placeholder="Example: 🛡️"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00d2ff]/40"
                  required
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={savingService}
                  className="rounded-2xl bg-[#00d2ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {savingService ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
                </button>

                {editingId ? (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d2ff]/22"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#000b1e]/42 p-5 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.52)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00d2ff]">Services List</p>
          <h2 className="mt-3 text-2xl font-black text-white">Current frontend services</h2>

          {message ? (
            <p className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/68">
                Loading services data...
              </div>
            ) : services.length ? (
              services.map((service) => (
                <div
                  key={service._id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00d2ff,#5b7cff)] text-xl">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{service.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-white/68">{service.description}</p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditService(service)}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#00d2ff]/22"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteService(service._id)}
                        disabled={deletingId === service._id}
                        className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-65"
                      >
                        {deletingId === service._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/68">
                No services found. Create your first service from the form.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
