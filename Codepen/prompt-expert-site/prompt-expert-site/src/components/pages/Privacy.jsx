const Privacy = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <div>
            <p className="text-muted-foreground mb-6">
              Última actualización: Diciembre 2024
            </p>
            <p className="text-muted-foreground">
              En Experto en Prompts GPT, respetamos tu privacidad y nos comprometemos 
              a proteger la información personal que compartes con nosotros.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Información que Recopilamos</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Información Básica (Nivel 1)</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                <li>Dirección de correo electrónico</li>
                <li>Fecha y hora de registro</li>
                <li>Prompts accedidos</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Información de Contacto (Nivel 2)</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                <li>Nombre completo</li>
                <li>Empresa u organización</li>
                <li>Teléfono web o de contacto</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Información Detallada (Nivel 3)</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Respuestas a preguntas específicas sobre necesidades</li>
                <li>Información sobre casos de uso</li>
                <li>Preferencias de comunicación</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cómo Utilizamos tu Información</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Servicios Principales</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Proporcionar acceso a prompts</li>
                  <li>Personalizar recomendaciones</li>
                  <li>Mejorar la experiencia del usuario</li>
                  <li>Soporte técnico</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Comunicación</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Envío de prompts y recursos</li>
                  <li>Actualizaciones de servicios</li>
                  <li>Ofertas de capacitación</li>
                  <li>Newsletter (opcional)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Protección de Datos</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Encriptación:</strong> Todos los datos se transmiten y almacenan de forma segura</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Acceso Limitado:</strong> Solo personal autorizado puede acceder a tu información</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Almacenamiento Seguro:</strong> Utilizamos Google Sheets con permisos restringidos</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>No Venta:</strong> Nunca vendemos tu información a terceros</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Tus Derechos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Acceso y Control</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Solicitar copia de tus datos</li>
                  <li>Actualizar información personal</li>
                  <li>Eliminar tu cuenta</li>
                  <li>Opt-out de comunicaciones</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contacto</h3>
                <p className="text-muted-foreground mb-2">
                  Para ejercer tus derechos o hacer preguntas sobre privacidad:
                </p>
                <p className="text-muted-foreground">
                  <strong>Email:</strong> privacidad@expertoprompts.com
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies y Tecnologías Similares</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos localStorage para recordar tu nivel de acceso y mejorar 
              tu experiencia. No utilizamos cookies de seguimiento de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cambios a esta Política</h2>
            <p className="text-muted-foreground">
              Podemos actualizar esta política ocasionalmente. Te notificaremos 
              sobre cambios significativos por email o mediante un aviso en el sitio web.
            </p>
          </section>

          <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-3">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              Los prompts proporcionados son para uso educativo y profesional. 
              Los resultados pueden variar según el contexto de implementación. 
              No garantizamos resultados específicos, aunque proporcionamos métricas 
              basadas en casos de uso reales. El usuario es responsable del uso 
              apropiado de los prompts y del cumplimiento de las políticas de 
              las plataformas de IA que utilice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy

