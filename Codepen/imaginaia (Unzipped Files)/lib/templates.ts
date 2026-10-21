/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Theme {
    id: string;
    title: string;
    description: string;
    category: CategoryId;
    prompt: string;
}

export type CategoryId = 'creative' | 'decades' | 'costumes' | 'world';

export const CATEGORIES: Record<CategoryId, { title: string }> = {
    creative: {
        title: "Estilos Creativos",
    },
    decades: {
        title: "Viaje en el Tiempo",
    },
    costumes: {
        title: "Disfraces",
    },
    world: {
        title: "Estilos del Mundo",
    },
};

export const THEMES: Theme[] = [
    // --- Creative Styles ---
    {
        id: 'vintage-clock',
        title: 'Elegancia Atemporal',
        description: 'Un retrato cinematográfico en blanco y negro con detalles dorados.',
        category: 'creative',
        prompt: `Using the reference photo for the person's face and identity, create a hyper-realistic cinematic black-and-white portrait of the person sitting in front of a giant vintage clock with large Roman numerals. They are dressed in a sharp all-black outfit. They sit on stone steps in a confident pose. The image is monochrome, except for subtle golden highlights on the clock’s numerals and hands. Dramatic focused lighting creates strong shadows. The mood is mysterious and luxurious.`
    },
    {
        id: 'ink-sketch',
        title: 'Boceto a Tinta',
        description: 'Un boceto artístico de tu rostro en tinta azul sobre papel de cuaderno.',
        category: 'creative',
        prompt: `Create a photo-style line drawing / ink sketch of the face identical to the uploaded reference image — keep every facial feature, proportion, and expression exactly the same. Use blue and white ink tones with intricate, fine line detailing, drawn on a notebook-page style background. Show a right hand holding a pen near the sketch.`
    },
    {
        id: 'card-architecture',
        title: 'Castillo de Naipes',
        description: 'Una escena surrealista en un mundo hecho de cartas gigantes.',
        category: 'creative',
        prompt: `Place the person from the uploaded image into a surreal, towering, architectural space constructed entirely from giant playing cards. They should have a poised, confident stance, wearing a tailored black overcoat, a crisp white t-shirt, and form-fitting black jeans. Massive columns of stacked cards reach towards the ceiling. Dramatic beams of light stream down, creating a high-contrast, theatrical mood.`
    },
    {
        id: 'sleepy-tram',
        title: 'Viaje en Tranvía',
        description: 'Una ilustración melancólica y pacífica con la luz del atardecer.',
        category: 'creative',
        prompt: `A realistic cinematic illustration of the person from the reference photo sitting alone in a tram on a single seat by the window. They wear a black t-shirt and dark jeans. Their head is slightly tilted down as if falling asleep. Warm sunset light streams through the tram window, creating a calm, dreamy atmosphere. The reflection in the window glows softly. Highly detailed, photorealistic, 4k.`
    },
    
    // --- Decades ---
    {
        id: 'decade-1920s',
        title: 'Años 20 Rugientes',
        description: 'Glamour, Art Deco y fiestas clandestinas.',
        category: 'decades',
        prompt: 'Recreate the person from the photo in the style of the 1920s. They should be dressed in glamorous flapper attire or a sharp suit with a fedora, set against an Art Deco, speakeasy-style background. The image should have a vintage, sepia-toned photographic look.'
    },
    {
        id: 'decade-1950s',
        title: 'Rock & Roll de los 50',
        description: 'Diners, chaquetas de cuero y optimismo.',
        category: 'decades',
        prompt: 'Transform the person from the photo into a 1950s icon. Place them in a classic American diner setting. Attire should be a leather jacket and jeans for a greaser look, or a poodle skirt. The image should be vibrant, reminiscent of early Kodachrome photography.'
    },
    {
        id: 'decade-1980s',
        title: 'Neón de los 80',
        description: 'Peinados voluminosos, arcades y colores llamativos.',
        category: 'decades',
        prompt: 'Place the person from the photo into the 1980s. They should have big, styled hair and be wearing neon-colored athletic wear. The background is an arcade filled with glowing game screens. The lighting is dominated by pink and blue neon lights.'
    },

    // --- Costumes ---
    {
        id: 'costume-astronaut',
        title: 'Astronauta Espacial',
        description: 'Flota en gravedad cero con la Tierra de fondo.',
        category: 'costumes',
        prompt: 'Depict the person from the reference photo as an astronaut. They are wearing a detailed, modern spacesuit with a reflective helmet visor. They are floating in zero gravity inside a spaceship cockpit, with Earth visible through a porthole window. The lighting is cinematic and realistic.'
    },
    {
        id: 'costume-pirate',
        title: 'Capitán Pirata',
        description: 'Al mando de un barco en el mar del Caribe.',
        category: 'costumes',
        prompt: 'Turn the person from the uploaded photo into a fearsome pirate captain. They are on the deck of a weathered pirate ship at sunset. They are wearing a tricorne hat, an eyepatch, and rugged pirate clothing. The style should be a dramatic, cinematic oil painting.'
    },
    {
        id: 'costume-superhero',
        title: 'Superhéroe Épico',
        description: 'Vigilando la ciudad desde un rascacielos.',
        category: 'costumes',
        prompt: 'Transform the person from the photo into a powerful superhero. Design a unique, modern superhero costume for them. They are posing heroically on a skyscraper rooftop, overlooking a sprawling city at night. The mood is epic and cinematic.'
    },

    // --- World Styles ---
    {
        id: 'world-japan',
        title: 'Jardín Japonés',
        description: 'Paz y serenidad entre cerezos en flor.',
        category: 'world',
        prompt: 'Place the person from the reference image in a serene Japanese garden. They are dressed in an elegant, traditional silk kimono. The background features a gentle stream, a stone lantern, and blooming cherry blossom trees. High-resolution photograph with soft, natural lighting.'
    },
    {
        id: 'world-scotland',
        title: 'Tierras Altas de Escocia',
        description: 'La niebla, las colinas y el sonido de las gaitas.',
        category: 'world',
        prompt: 'Reimagine the person from the photo in the Scottish Highlands. They are wearing a traditional tartan kilt and woolen clothing. The background is a rugged, misty landscape with rolling green hills and a distant loch. A dramatic, wide-angle landscape photograph.'
    },
];