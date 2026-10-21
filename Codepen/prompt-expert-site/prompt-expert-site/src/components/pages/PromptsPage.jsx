import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Star } from 'lucide-react'
import { usePrompts } from '../../hooks/usePrompts'
import PromptCard from '../prompts/PromptCard'

const PromptsPage = () => {
  const { prompts, categories, difficulties, loading } = usePrompts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Filtrar prompts basado en criterios
  const filteredPrompts = useMemo(() => {
    if (!prompts) return []

    return prompts.filter(prompt => {
      // Filtro de búsqueda
      const matchesSearch = searchTerm === '' || 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        prompt.story.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de categoría
      const matchesCategory = selectedCategory === 'all' || 
        prompt.category.toLowerCase() === selectedCategory.toLowerCase()

      // Filtro de dificultad
      const matchesDifficulty = selectedDifficulty === 'all' || 
        prompt.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()

      // Filtro de destacados
      const matchesFeatured = !showFeaturedOnly || prompt.featured

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFeatured
    })
  }, [prompts, searchTerm, selectedCategory, selectedDifficulty, showFeaturedOnly])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando prompts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Biblioteca de Prompts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección completa de prompts validados y efectivos, 
            organizados por categoría y nivel de dificultad.
          </p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro de Categoría */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">Todas las categorías</option>
              {categories?.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Filtro de Dificultad */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">Todas las dificultades</option>
              {difficulties?.map(difficulty => (
                <option key={difficulty.id} value={difficulty.name}>
                  {difficulty.name}
                </option>
              ))}
            </select>

            {/* Filtro de Destacados */}
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="flex items-center gap-2"
            >
              <Star className={`h-4 w-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />
              Solo Destacados
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Mostrando {filteredPrompts.length} de {prompts?.length || 0} prompts
            </span>
            <div className="flex gap-4">
              <span>{prompts?.filter(p => p.featured).length || 0} destacados</span>
              <span>{categories?.length || 0} categorías</span>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron prompts
            </h3>
            <p className="text-muted-foreground mb-4">
              Intenta ajustar los filtros o términos de búsqueda
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedDifficulty('all')
                setShowFeaturedOnly(false)
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-card border border-border rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-muted-foreground mb-6">
            Puedo desarrollar prompts personalizados para tus necesidades específicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/about">Conocer Mis Servicios</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/portfolio">Ver Casos de Éxito</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptsPage

