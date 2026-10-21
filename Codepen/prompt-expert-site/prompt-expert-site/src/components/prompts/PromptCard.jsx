import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, Target } from 'lucide-react'

const PromptCard = ({ prompt }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
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

  return (
    <div className="group relative bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {prompt.category}
            </Badge>
            <Badge 
              variant="outline" 
              className={`text-xs ${getDifficultyColor(prompt.difficulty)}`}
            >
              {prompt.difficulty}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {prompt.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 line-clamp-3">
        {prompt.narrative.context}. {prompt.narrative.solution}.
      </p>

      {/* Results */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="text-muted-foreground">
            Redujo: <span className="text-foreground">{prompt.narrative.results.reduced}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Target className="h-4 w-4 text-blue-500" />
          <span className="text-muted-foreground">
            Maximizó: <span className="text-foreground">{prompt.narrative.results.maximized}</span>
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag}
            className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
          >
            #{tag}
          </span>
        ))}
        {prompt.tags.length > 3 && (
          <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
            +{prompt.tags.length - 3}
          </span>
        )}
      </div>

      {/* Action */}
      <Button 
        variant="outline" 
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        asChild
      >
        <Link to={`/prompt/${prompt.id}`}>
          Ver Detalles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export default PromptCard

