import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Bot, ArrowRight, Zap, Target, Clock } from 'lucide-react'
import PromptCard from '../prompts/PromptCard'
import { usePrompts } from '../../hooks/usePrompts'

const Home = () => {
  const { getFeaturedPrompts, isLoading } = usePrompts()
  const featuredPrompts = getFeaturedPrompts(3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Bot className="h-16 w-16 text-primary" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Prompts GPT{' '}
              <span className="text-primary">Validados</span>{' '}
              y Efectivos
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre prompts probados que reducen tiempo y maximizan resultados 
              en tus proyectos de IA. Cada prompt incluye casos de uso reales y 
              resultados medibles.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/prompts">
                  Explorar Prompts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <Link to="/about">
                  Sobre Mí
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ahorra Tiempo</h3>
              <p className="text-muted-foreground">
                Prompts optimizados que reducen el tiempo de iteración y 
                obtienen resultados precisos desde el primer intento.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Target className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resultados Precisos</h3>
              <p className="text-muted-foreground">
                Cada prompt ha sido probado en proyectos reales con 
                métricas de éxito documentadas y casos de uso específicos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fácil Adaptación</h3>
              <p className="text-muted-foreground">
                Incluye recomendaciones de uso, ejemplos prácticos y 
                variaciones para adaptar a tu contexto específico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section id="prompts" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Prompts Destacados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora algunos de los prompts más efectivos, organizados por 
              categoría y nivel de dificultad.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/prompts">
                Ver Todos los Prompts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ¿Necesitas Prompts Personalizados?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Trabajo con empresas y profesionales para desarrollar prompts 
              específicos que resuelvan sus desafíos únicos. También ofrezco 
              capacitaciones para equipos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/about">
                  Conoce Mi Trabajo
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/portfolio">
                  Ver Portafolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

