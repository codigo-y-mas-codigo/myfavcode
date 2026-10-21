import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqs = [
    {
      question: "¿Cómo funcionan los niveles de acceso?",
      answer: "Tenemos 3 niveles: Nivel 1 (solo email) te da acceso a copiar todos los prompts. Nivel 2 (datos de contacto) te permite ver recursos adicionales como estudios y plantillas. Nivel 3 (preguntas específicas) te da acceso a formatos de salida completos y ejemplos detallados."
    },
    {
      question: "¿Los prompts realmente funcionan como se describe?",
      answer: "Sí, cada prompt ha sido probado en proyectos reales. Incluyo métricas específicas como porcentajes de reducción de tiempo y mejoras en resultados. Todos los casos de uso están documentados con contexto real."
    },
    {
      question: "¿Puedo adaptar los prompts a mi industria específica?",
      answer: "Absolutamente. Cada prompt incluye recomendaciones de uso y ejemplos de adaptación. Además, ofrezco servicios de personalización para desarrollar prompts específicos para tu industria o caso de uso."
    },
    {
      question: "¿Qué incluye una capacitación para equipos?",
      answer: "Las capacitaciones incluyen: fundamentos de prompting efectivo, análisis de casos de uso específicos de tu empresa, desarrollo de prompts personalizados, mejores prácticas de implementación, y seguimiento post-capacitación."
    },
    {
      question: "¿Cómo mides el éxito de un prompt?",
      answer: "Utilizo métricas cuantificables como: tiempo de ejecución de tareas, calidad de resultados (medida por KPIs específicos), tasa de éxito en primera iteración, y satisfacción del usuario final. Cada prompt incluye estas métricas."
    },
    {
      question: "¿Ofreces garantía en tus servicios?",
      answer: "Sí, ofrezco garantía de satisfacción. Si un prompt personalizado no cumple con los objetivos acordados, trabajo sin costo adicional hasta lograr los resultados esperados o reembolso completo."
    },
    {
      question: "¿Cuánto tiempo toma desarrollar un prompt personalizado?",
      answer: "Depende de la complejidad, pero típicamente: prompts simples (1-2 semanas), prompts complejos (3-4 semanas), sistemas completos de prompts (1-2 meses). Incluye análisis, desarrollo, pruebas y refinamiento."
    },
    {
      question: "¿Trabajas con empresas de cualquier tamaño?",
      answer: "Sí, trabajo desde startups hasta grandes corporaciones. Adapto mi metodología y precios según el tamaño y necesidades específicas de cada organización."
    }
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-muted-foreground">
            Respuestas a las preguntas más comunes sobre mis servicios y prompts.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                {openItems.has(index) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿No Encuentras tu Pregunta?</h2>
          <p className="text-muted-foreground mb-6">
            Estoy aquí para resolver cualquier duda específica sobre mis servicios 
            o cómo los prompts pueden ayudar en tu caso particular.
          </p>
          <a 
            href="mailto:contacto@expertoprompts.com" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Hacer una Pregunta
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ

