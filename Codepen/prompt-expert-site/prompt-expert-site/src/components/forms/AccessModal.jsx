import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X, Mail, User, Building, Phone, CheckCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { submitToGoogleSheets } from '../../services/googleSheets'

const AccessModal = ({ level, onClose, onSuccess }) => {
  const { updateUserLevel, userData } = useAuth()
  const [formData, setFormData] = useState({
    email: userData?.email || '',
    name: userData?.name || '',
    company: userData?.company || '',
    phone: userData?.phone || '',
    needs: '',
    industry: '',
    teamSize: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Validate required fields based on level
      if (level >= 1 && !formData.email) {
        throw new Error('El email es requerido')
      }
      if (level >= 2 && (!formData.name || !formData.company || !formData.phone)) {
        throw new Error('Todos los campos de contacto son requeridos')
      }
      if (level >= 3 && (!formData.needs || !formData.industry)) {
        throw new Error('Por favor completa toda la información solicitada')
      }

      // Submit to Google Sheets
      await submitToGoogleSheets(formData)
      
      // Update user level
      updateUserLevel(level, formData)
      
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getModalContent = () => {
    switch (level) {
      case 1:
        return {
          title: 'Acceso a Prompts',
          subtitle: 'Para copiar este prompt, necesitamos tu email:',
          benefits: [
            'Acceso inmediato a todos los prompts',
            'Sin spam, solo contenido de valor',
            'Notificaciones de nuevos prompts'
          ]
        }
      case 2:
        return {
          title: 'Acceso a Recursos Adicionales',
          subtitle: 'Para ver los recursos de memoria, completa tu información:',
          benefits: [
            'Estudios y documentos de referencia',
            'Plantillas y formatos adicionales',
            'Casos de uso detallados'
          ]
        }
      case 3:
        return {
          title: 'Acceso Completo',
          subtitle: 'Para ver los formatos de salida completos, cuéntanos más sobre ti:',
          benefits: [
            'Formatos de salida estructurados',
            'Ejemplos completos de resultados',
            'Recomendaciones personalizadas'
          ]
        }
      default:
        return { title: '', subtitle: '', benefits: [] }
    }
  }

  const content = getModalContent()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {content.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-muted-foreground mb-6">
            {content.subtitle}
          </p>

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            {/* Email (Level 1+) */}
            {level >= 1 && (
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            )}

            {/* Contact Info (Level 2+) */}
            {level >= 2 && (
              <>
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    Nombre Completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4" />
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    placeholder="Tu empresa u organización"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Tu teléfono de contacto"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Detailed Info (Level 3+) */}
            {level >= 3 && (
              <>
                <div>
                  <Label htmlFor="industry" className="mb-2 block">
                    Industria o Sector
                  </Label>
                  <Input
                    id="industry"
                    placeholder="ej. Tecnología, Marketing, Consultoría"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="teamSize" className="mb-2 block">
                    Tamaño del Equipo
                  </Label>
                  <Input
                    id="teamSize"
                    placeholder="ej. 1-5, 6-20, 21-50, 50+"
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="needs" className="mb-2 block">
                    ¿Qué necesidades específicas tienes con IA?
                  </Label>
                  <Textarea
                    id="needs"
                    placeholder="Describe brevemente cómo planeas usar los prompts o qué desafíos buscas resolver..."
                    value={formData.needs}
                    onChange={(e) => handleInputChange('needs', e.target.value)}
                    required
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Lo que obtienes:</h3>
            <ul className="space-y-2">
              {content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Procesando...' : 'Obtener Acceso'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccessModal

