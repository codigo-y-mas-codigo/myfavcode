
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Logo from '../components/Logo';

const FeatureCard: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
            <Icon name={icon} className="text-primary text-2xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
);

const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
     try {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error("Could not use pushState, falling back to full navigation:", error);
      window.location.href = href;
    }
};

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative text-center py-24 sm:py-32 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"></div>
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/50 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-60"></div>
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-200/50 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-60"></div>
                    
                    <div className="relative max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            Crea Sitios Web Increíbles con el Poder de la <span className="text-primary font-display">IA</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                            Describe la web de tus sueños en lenguaje natural y DesignIA la creará para ti en segundos. Edita visualmente y exporta código listo para producción.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <a 
                                href="/app"
                                onClick={(e) => handleNav(e, '/app')}
                                className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-button font-semibold text-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg whitespace-nowrap flex items-center justify-center"
                            >
                                <Icon name="magic-line" className="mr-2"/>
                                Comenzar a Crear Gratis
                            </a>
                            <a 
                                href="#"
                                className="w-full sm:w-auto text-primary px-8 py-4 rounded-button font-medium hover:bg-primary/10 transition-colors whitespace-nowrap flex items-center justify-center"
                            >
                                Ver Demo
                                <Icon name="play-circle-line" className="ml-2"/>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 sm:py-24 px-6 bg-white dark:bg-gray-800/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">El futuro del diseño web está aquí</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">Todo lo que necesitas para pasar de la idea al sitio web en minutos.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard 
                                icon="chat-4-line"
                                title="Generación por Prompt"
                                description="Simplemente describe tu idea. Nuestra IA interpretará tu visión y generará un diseño web completo y funcional."
                            />
                            <FeatureCard 
                                icon="drag-move-2-line"
                                title="Edición Visual Intuitiva"
                                description="Ajusta y personaliza cada detalle directamente en el lienzo. Cambia textos, imágenes y estilos sin tocar una línea de código."
                            />
                            <FeatureCard 
                                icon="code-s-slash-line"
                                title="Exportación de Código Limpio"
                                description="Obtén código de alta calidad en HTML, React y UniApp, listo para llevar a producción o seguir desarrollando."
                            />
                        </div>
                    </div>
                </section>
                
                {/* Showcase Section */}
                <section className="py-20 sm:py-24 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">De la Idea al Código, en un Instante</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                            Observa cómo DesignIA transforma una simple descripción en una página web impresionante y totalmente editable.
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                            <img src="https://i.imgur.com/eAnm63j.png" alt="DesignIA app showcase" className="rounded-lg w-full" />
                        </div>
                    </div>
                </section>

                 {/* Final CTA Section */}
                <section className="py-20 sm:py-24 px-6 bg-white dark:bg-gray-800/30">
                    <div className="max-w-4xl mx-auto text-center">
                        <Logo className="justify-center mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">¿Listo para construir el futuro de la web?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                            Únete a miles de diseñadores y desarrolladores que están acelerando su flujo de trabajo con DesignIA.
                        </p>
                        <a 
                            href="/app"
                            onClick={(e) => handleNav(e, '/app')}
                            className="inline-block bg-primary text-white px-8 py-4 rounded-button font-semibold text-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Empieza a diseñar con IA
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
