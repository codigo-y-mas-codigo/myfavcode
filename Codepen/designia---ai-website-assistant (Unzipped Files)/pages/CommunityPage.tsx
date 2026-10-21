
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

const CommunityCard: React.FC<{ icon: string; title: string; description: string; buttonText: string; href: string }> = ({ icon, title, description, buttonText, href }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Icon name={icon} className="text-primary text-3xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">{description}</p>
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-primary text-white py-3 px-4 rounded-button font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
            {buttonText}
        </a>
    </div>
);

const CommunityPage: React.FC = () => {
    return (
        <div className="flex flex-col h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            <Header />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                         <Icon name="team-line" className="text-5xl text-primary mx-auto mb-4" />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Únete a la Comunidad de DesignIA</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Conecta, comparte y crece con otros diseñadores y desarrolladores.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <CommunityCard 
                            icon="discord-line"
                            title="Servidor de Discord"
                            description="Chatea con el equipo y otros miembros de la comunidad en tiempo real. Obtén ayuda, comparte tus creaciones y participa en eventos."
                            buttonText="Únete a Discord"
                            href="#"
                        />
                        <CommunityCard 
                            icon="road-map-line"
                            title="Roadmap Público"
                            description="Mira en qué estamos trabajando y qué viene a continuación. Vota por las características que más te interesan y sugiere nuevas ideas."
                            buttonText="Ver Roadmap"
                            href="#"
                        />
                        <CommunityCard 
                            icon="discuss-line"
                            title="Foros de la Comunidad"
                            description="Participa en debates, haz preguntas y encuentra respuestas. Un espacio para aprender y compartir conocimientos con la comunidad."
                            buttonText="Ir a los Foros"
                            href="#"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CommunityPage;
