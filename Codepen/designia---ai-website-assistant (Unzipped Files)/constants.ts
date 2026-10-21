
export const initialHtmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DesignIA - Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        secondary: '#8b5cf6'
                    },
                    borderRadius: {
                        'button': '8px'
                    }
                }
            }
        }
    </script>
</head>
<body class="font-sans">
    <div class="relative">
        <div class="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center" style="background-image: url('https://picsum.photos/1200/400?random=1'); background-size: cover; background-position: center;">
            <div class="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent"></div>
            <div class="relative z-10 max-w-6xl mx-auto px-6 flex items-center">
                <div class="w-1/2">
                    <h1 class="text-5xl font-bold text-gray-900 mb-6">Revoluciona tu Negocio con Tecnología Avanzada</h1>
                    <p class="text-xl text-gray-600 mb-8">Soluciones innovadoras que transforman la manera en que trabajas y conectas con tus clientes.</p>
                    <div class="flex space-x-4">
                        <button class="bg-primary text-white px-8 py-3 rounded-button font-medium hover:bg-blue-600 transition-colors whitespace-nowrap">
                            Comenzar Ahora
                        </button>
                        <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-button font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                            Ver Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-20 px-6">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir nuestra plataforma?</h2>
                    <p class="text-xl text-gray-600">Características que marcan la diferencia</p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="ri-rocket-line text-primary text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Velocidad Incomparable</h3>
                        <p class="text-gray-600">Procesamiento ultra-rápido que acelera todos tus procesos de trabajo diarios.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                           <i class="ri-shield-check-line text-secondary text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Seguridad Avanzada</h3>
                        <p class="text-gray-600">Protección de nivel empresarial para mantener tus datos completamente seguros.</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                           <i class="ri-team-line text-green-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Colaboración Fluida</h3>
                        <p class="text-gray-600">Herramientas diseñadas para equipos que trabajan juntos de manera eficiente.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-50 py-20 px-6">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
                </div>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-white p-8 rounded-lg shadow-sm">
                        <div class="flex items-center mb-4">
                            <img src="https://picsum.photos/48/48?random=2" class="w-12 h-12 rounded-full mr-4" alt="Ana Herrera">
                            <div>
                                <div class="font-semibold text-gray-900">Ana Herrera</div>
                                <div class="text-sm text-gray-600">CEO, InnovaTech</div>
                            </div>
                        </div>
                        <p class="text-gray-700">"Esta plataforma ha transformado completamente nuestra forma de trabajar. La eficiencia ha aumentado un 300% desde que la implementamos."</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow-sm">
                        <div class="flex items-center mb-4">
                            <img src="https://picsum.photos/48/48?random=3" class="w-12 h-12 rounded-full mr-4" alt="Carlos Rodríguez">
                            <div>
                                <div class="font-semibold text-gray-900">Carlos Rodríguez</div>
                                <div class="text-sm text-gray-600">Director, DigitalFlow</div>
                            </div>
                        </div>
                        <p class="text-gray-700">"La mejor inversión que hemos hecho. El retorno se vio inmediatamente y nuestros clientes están más satisfechos que nunca."</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
