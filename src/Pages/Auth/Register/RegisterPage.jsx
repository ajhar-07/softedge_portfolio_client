import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/Authcontext/AuthContext'
import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'

export default function RegisterPage() {
  const { registerUser, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await registerUser(formData.name, formData.email, formData.password)
      navigate('/', { replace: true })
    } catch (authError) {
      setError(authError.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-dvh min-h-screen items-center justify-center px-4 py-24 text-white sm:px-6">
      <ScrollReveal variant="scale" duration={0.55} className="w-full max-w-lg">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#000b1e]/45 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl backdrop-saturate-150">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(0,210,255,0.14),rgba(10,49,70,0.1))] px-6 py-8 sm:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00d2ff]">Create Account</p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Register with Firebase</h1>
            <p className="mt-3 text-sm leading-7 text-white/70">
              New user register korle Firebase profile e name save hobe ar backend e default role
              `user` hisebe sync hobe.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/85">User name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0a3146]/30 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#00d2ff]/60"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/85">Email address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0a3146]/30 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#00d2ff]/60"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/85">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0a3146]/30 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#00d2ff]/60"
                />
              </label>

              {error ? (
                <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#00d2ff] px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#000b1e] transition hover:bg-[#38ddff] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-3 text-sm text-white/70">
              <Link to="/" className="transition hover:text-[#00d2ff]">
                Back to Home
              </Link>
              <Link to="/login" className="font-semibold text-[#00d2ff] transition hover:text-white">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
