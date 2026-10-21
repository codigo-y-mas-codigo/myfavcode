import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [userLevel, setUserLevel] = useState(0)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cargar estado desde localStorage al inicializar
    try {
      const savedData = localStorage.getItem('userAuth')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setUserLevel(parsed.level || 0)
        setUserData(parsed.data || null)
      }
    } catch (error) {
      console.error('Error loading user auth data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateUserLevel = (level, data) => {
    setUserLevel(level)
    setUserData(data)
    
    // Guardar en localStorage
    try {
      localStorage.setItem('userAuth', JSON.stringify({ level, data }))
    } catch (error) {
      console.error('Error saving user auth data:', error)
    }
  }

  const hasAccess = (requiredLevel) => {
    return userLevel >= requiredLevel
  }

  const getUserDisplayName = () => {
    if (!userData) return null
    return userData.name || userData.email || 'Usuario'
  }

  const value = {
    userLevel,
    userData,
    isLoading,
    updateUserLevel,
    hasAccess,
    getUserDisplayName
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

