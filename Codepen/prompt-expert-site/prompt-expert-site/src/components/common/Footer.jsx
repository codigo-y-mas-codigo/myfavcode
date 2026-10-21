import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Experto en Prompts GPT
            </h3>
            <p className="text-sm text-muted-foreground">
              Prompts validados y efectivos para maximizar tus resultados con IA.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Términos de Uso
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Disclaimer
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Experto en Prompts GPT. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

