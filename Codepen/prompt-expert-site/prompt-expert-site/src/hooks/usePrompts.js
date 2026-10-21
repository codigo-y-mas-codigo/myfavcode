import { useState, useEffect } from 'react'

export const usePrompts = () => {
  const [prompts, setPrompts] = useState([])
  const [categories, setCategories] = useState([])
  const [difficulties, setDifficulties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/prompts.json')
        
        if (!response.ok) {
          throw new Error('Error al cargar los prompts')
        }
        
        const data = await response.json()
        setPrompts(data.prompts || [])
        setCategories(data.categories || [])
        setDifficulties(data.difficulties || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching prompts:', err)
        setError(err.message)
        setPrompts([])
        setCategories([])
        setDifficulties([])
      } finally {
        setLoading(false)
      }
    }

    fetchPrompts()
  }, [])

  // Función para obtener un prompt por ID
  const getPromptById = (id) => {
    return prompts.find(prompt => prompt.id === id)
  }

  // Función para obtener prompts por categoría
  const getPromptsByCategory = (category) => {
    return prompts.filter(prompt => 
      prompt.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Función para obtener prompts destacados
  const getFeaturedPrompts = (limit = 3) => {
    const featured = prompts.filter(prompt => prompt.featured)
    return limit ? featured.slice(0, limit) : featured
  }

  // Función para buscar prompts
  const searchPrompts = (searchTerm) => {
    if (!searchTerm) return prompts
    
    const term = searchTerm.toLowerCase()
    return prompts.filter(prompt =>
      prompt.title.toLowerCase().includes(term) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(term)) ||
      prompt.story.toLowerCase().includes(term) ||
      prompt.category.toLowerCase().includes(term)
    )
  }

  return {
    prompts,
    categories,
    difficulties,
    loading,
    error,
    getPromptById,
    getPromptsByCategory,
    getFeaturedPrompts,
    searchPrompts
  }
}

