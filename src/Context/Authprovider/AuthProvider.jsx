import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../Authcontext/AuthContext'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../../Firebase/firebase.init'

const providerGoogle = new GoogleAuthProvider()
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const syncUserToBackend = async (currentUser) => {
    if (!currentUser?.email) return null

    const payload = {
      uid: currentUser.uid,
      email: currentUser.email,
      name: currentUser.displayName || currentUser.email.split('@')[0],
      photoURL: currentUser.photoURL || '',
    }

    const response = await fetch(`${API_BASE_URL}/api/users/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Failed to sync user with backend')
    }

    return response.json()
  }

  const registerUser = async (name, email, password) => {
    setLoading(true)
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: name })
      await syncUserToBackend({
        ...credential.user,
        displayName: name,
      })
      return credential
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const loginUser = async (email, password) => {
    setLoading(true)
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    try {
      return await signInWithPopup(auth, providerGoogle)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      return await signOut(auth)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (!currentUser) {
        setLoading(false)
        return
      }

      syncUserToBackend(currentUser)
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })

    return () => unsubscribe()
  }, [])

  const AuthInfo = useMemo(
    () => ({
      user,
      loading,
      registerUser,
      loginUser,
      googleLogin,
      logout,
      syncUserToBackend,
    }),
    [loading, user],
  )

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
