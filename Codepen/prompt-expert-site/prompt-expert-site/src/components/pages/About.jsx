const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Sobre Mí</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Soy un especialista en prompts de IA con más de 3 años de experiencia 
            ayudando a empresas y profesionales a maximizar el potencial de la 
            inteligencia artificial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Mi Experiencia</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• +100 prompts desarrollados y validados</li>
                <li>• +50 empresas asesoradas</li>
                <li>• +200 profesionales capacitados</li>
                <li>• Especialización en Marketing, Desarrollo y Análisis</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Desarrollo de prompts personalizados</li>
                <li>• Capacitación de equipos</li>
                <li>• Consultoría en implementación de IA</li>
                <li>• Auditoría de procesos con IA</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Mi Metodología</h2>
          <p className="text-muted-foreground mb-6">
            Cada prompt que desarrollo sigue un proceso riguroso de validación:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Análisis</h4>
              <p className="text-sm text-muted-foreground">
                Identifico el problema específico y los objetivos del cliente
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Desarrollo</h4>
              <p className="text-sm text-muted-foreground">
                Creo y refino el prompt a través de múltiples iteraciones
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Validación</h4>
              <p className="text-sm text-muted-foreground">
                Pruebo en casos reales y mido resultados cuantificables
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">¿Por Qué Trabajar Conmigo?</h2>
          <p className="text-muted-foreground mb-6">
            No solo creo prompts, sino que desarrollo soluciones completas que se 
            integran en tus procesos de trabajo y generan resultados medibles.
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">¿Listo para Optimizar tus Procesos con IA?</h3>
            <p className="text-muted-foreground mb-4">
              Contáctame para una consulta gratuita donde analizaremos tus necesidades 
              específicas y cómo los prompts personalizados pueden transformar tu trabajo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:contacto@expertoprompts.com" 
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contactar por Email
              </a>
              <a 
                href="https://calendly.com/expertoprompts" 
                className="inline-flex items-center justify-center px-6 py-2 border border-border rounded-md hover:bg-muted transition-colors"
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

