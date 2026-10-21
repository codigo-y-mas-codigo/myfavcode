import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Copy, Lock, Unlock, Clock, Target, BookOpen, FileText } from 'lucide-react'
import { usePrompts } from '../../hooks/usePrompts'
import { useAuth } from '../../hooks/useAuth.jsx'
import AccessModal from '../forms/AccessModal'

const PromptDetail = () => {
  const { id } = useParams()
  const { getPromptById } = usePrompts()
  const { hasAccess } = useAuth()
  const [prompt, setPrompt] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalLevel, setModalLevel] = useState(1)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const foundPrompt = getPromptById(id)
    setPrompt(foundPrompt)
  }, [id, getPromptById])

  const handleCopyPrompt = async () => {
    if (!hasAccess(1)) {
      setModalLevel(1)
      setShowModal(true)
      return
    }

    try {
      await navigator.clipboard.writeText(prompt.prompt_text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleViewResources = () => {
    if (!hasAccess(2)) {
      setModalLevel(2)
      setShowModal(true)
      return
    }
    // Show resources
  }

  const handleViewFormats = () => {
    if (!hasAccess(3)) {
      setModalLevel(3)
      setShowModal(true)
      return
    }
    // Show formats
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'principiante':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'intermedio':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'avanzado':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  if (!prompt) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Prompt no encontrado
          </h1>
          <Button asChild>
            <Link to="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>

          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{prompt.category}</Badge>
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(prompt.difficulty)}
                >
                  {prompt.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {prompt.title}
              </h1>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-block px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Historia del Prompt</h2>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {prompt.narrative.context}. {prompt.narrative.problem}. {prompt.narrative.solution}.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Redujo</p>
                  <p className="text-sm text-muted-foreground">{prompt.narrative.results.reduced}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg">
                <Target className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Maximizó</p>
                  <p className="text-sm text-muted-foreground">{prompt.narrative.results.maximized}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">💡 Recomendaciones de Uso</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="space-y-2">
              {prompt.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prompt Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 El Prompt</h2>
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Prompt listo para usar
                </span>
                <Button 
                  onClick={handleCopyPrompt}
                  variant={copied ? "default" : "outline"}
                  size="sm"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? 'Copiado!' : 'Copiar'}
                </Button>
              </div>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                {prompt.prompt_text}
              </pre>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🎯 Ejemplos de Uso</h2>
          <div className="space-y-4">
            {prompt.usage_examples.map((example, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Ejemplo {index + 1}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Contexto:</strong> {example.context}
                </p>
                <p className="text-sm font-mono bg-muted p-3 rounded">
                  {example.input}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Access Levels */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Resources */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                {hasAccess(2) ? (
                  <Unlock className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
                <h3 className="text-lg font-semibold">Recursos de Memoria</h3>
              </div>
              
              {hasAccess(2) ? (
                <div className="space-y-3">
                  {prompt.memory_resources.map((resource, index) => (
                    <div key={index} className="p-3 bg-muted rounded">
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-1 inline-block">
                        {resource.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Accede a estudios, plantillas y recursos adicionales que complementan este prompt.
                  </p>
                  <Button onClick={handleViewResources} variant="outline" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    Ver Recursos
                  </Button>
                </div>
              )}
            </div>

            {/* Output Formats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                {hasAccess(3) ? (
                  <Unlock className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
                <h3 className="text-lg font-semibold">Formatos de Salida</h3>
              </div>
              
              {hasAccess(3) ? (
                <div className="space-y-3">
                  {prompt.output_formats.map((format, index) => (
                    <div key={index} className="p-3 bg-muted rounded">
                      <h4 className="font-medium text-sm">{format.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{format.description}</p>
                      <pre className="text-xs bg-background p-2 rounded font-mono">
                        {format.example}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Obtén formatos de salida estructurados y ejemplos completos de resultados.
                  </p>
                  <Button onClick={handleViewFormats} variant="outline" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    Ver Formatos
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Te Gustó Este Prompt?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Puedo desarrollar prompts personalizados para tus necesidades específicas 
            o capacitar a tu equipo en el uso efectivo de IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/about">Conocer Mis Servicios</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/portfolio">Ver Más Casos de Éxito</Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Access Modal */}
      {showModal && (
        <AccessModal 
          level={modalLevel}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false)
            // Refresh the component to show new access level
            window.location.reload()
          }}
        />
      )}
    </div>
  )
}

export default PromptDetail

