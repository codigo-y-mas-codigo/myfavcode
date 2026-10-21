const Portfolio = () => {
  const projects = [
    {
      title: "Startup Tecnológica - Marketing de Contenido",
      description: "Desarrollo de prompts para generación de ideas de contenido que redujo el tiempo de ideación en 30%",
      results: ["30% menos tiempo de ideación", "50% más diversidad de temas", "25% aumento en engagement"],
      category: "Marketing"
    },
    {
      title: "Empresa de Software - Revisión de Código",
      description: "Implementación de prompts para revisión automatizada de código que mejoró la calidad del desarrollo",
      results: ["40% reducción en tiempo de revisión", "60% menos bugs en producción", "Estandarización de procesos"],
      category: "Desarrollo"
    },
    {
      title: "Consultora de BI - Análisis de Datos",
      description: "Creación de prompts para análisis de datos que aceleró la generación de insights para clientes",
      results: ["50% menos tiempo de análisis", "Insights más precisos", "Mayor satisfacción del cliente"],
      category: "Análisis"
    }
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Portafolio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Casos de éxito reales donde mis prompts han generado resultados 
            medibles para empresas y profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">Resultados:</h4>
                <ul className="space-y-1">
                  {project.results.map((result, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Quieres Ser el Próximo Caso de Éxito?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Cada proyecto es único. Trabajo contigo para entender tus desafíos 
            específicos y desarrollar prompts que generen resultados medibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contacto@expertoprompts.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Discutir Mi Proyecto
            </a>
            <a 
              href="/about" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors"
            >
              Conocer Mi Metodología
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio

