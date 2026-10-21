 document.addEventListener('DOMContentLoaded', () => {
        const subjectEl = document.getElementById('subject');
        const actionEl = document.getElementById('action');
        const customStyleEl = document.getElementById('custom-style');
        const detailsEl = document.getElementById('details');
        const generatedPromptEnEl = document.getElementById('generated-prompt-en');
        const generatedPromptEsEl = document.getElementById('generated-prompt-es');
        const generateButton = document.getElementById('generate-button');
        const clearButton = document.getElementById('clear-button');
        const copyButtonEn = document.getElementById('copy-button-en');
        const copyButtonEs = document.getElementById('copy-button-es');
        const copyFeedbackEn = document.getElementById('copy-feedback-en');
        const copyFeedbackEs = document.getElementById('copy-feedback-es');
        const styleOptionsContainer = document.getElementById('style-options');
        const cameraOptionsContainer = document.getElementById('camera-options');
        const examplesList = document.getElementById('examples-list');
        const luckyButton = document.getElementById('lucky-button');

        const luckyPrompts = [
            { subject: 'an ancient librarian made of swirling constellations', action: 'cataloging glowing books in a library at the edge of the universe', style: 'fantasy art', camera: '', details: 'ethereal, magical lighting, infinite bookshelves, cosmic glow' },
            { subject: 'a tiny robot gardener with expressive LED eyes', action: 'tending to a single, vibrant flower growing on a desolate, metallic planet', style: 'sci-fi', camera: 'close-up shot', details: 'macro photography, detailed textures, lonely atmosphere, soft morning light' },
            { subject: 'a jazz club in the 1920s run by well-dressed cats', action: 'a feline singer croons into a vintage microphone while a tabby cat plays a saxophone', style: 'anime', camera: 'medium shot', details: 'smoky atmosphere, art deco style, rich colors, expressive characters' },
            { subject: 'a medieval knight in ornate, polished armor', action: 'sharing a meal with a friendly, iridescent dragon in front of a cozy campfire', style: 'cinematic', camera: 'medium shot', details: 'warm firelight, detailed armor and scales, peaceful forest at night, photorealistic, 8K' },
            { subject: 'a bustling city built on the back of a giant, floating turtle', action: 'with waterfalls cascading from its shell and citizens flying on trained giant birds', style: '3d render', camera: 'wide angle shot', details: 'solarpunk aesthetic, lush greenery, intricate architecture, bright daylight, highly detailed' },
            { subject: 'an origami world coming to life', action: 'paper cranes fly over a folded paper forest as a paper river flows', style: '3d render', camera: 'drone shot', details: 'soft, diffused lighting, delicate paper textures, pastel colors, magical realism' }
        ];

        generateButton.addEventListener('click', () => {
            const activeStyleButton = styleOptionsContainer.querySelector('.hs-segmented-control-active');
            const styleFromButtons = activeStyleButton ? activeStyleButton.dataset.value : '';
            const style = customStyleEl.value.trim() || styleFromButtons;

            const activeCameraButton = cameraOptionsContainer.querySelector('.hs-segmented-control-active');
            const camera = activeCameraButton ? activeCameraButton.dataset.value : '';

            const subject = subjectEl.value.trim();
            const action = actionEl.value.trim();
            const details = detailsEl.value.trim();

            if (!subject || !action) {
                generatedPromptEnEl.value = 'Please complete at least the "Main Subject" and "Action & Scene" fields.';
                generatedPromptEsEl.value = 'Por favor, completa al menos los campos "Sujeto Principal" y "Acción y Escena".';
                return;
            }

            let promptPartsEn = [style, camera, `of ${subject} ${action}`, details].filter(Boolean);
            generatedPromptEnEl.value = promptPartsEn.join(', ');

            let promptPartsEs = [style, camera, `de ${subject} ${action}`, details].filter(Boolean);
            generatedPromptEsEl.value = promptPartsEs.join(', ');
        });

        clearButton.addEventListener('click', () => {
            subjectEl.value = '';
            actionEl.value = '';
            customStyleEl.value = '';
            detailsEl.value = '';
            generatedPromptEnEl.value = '';
            generatedPromptEsEl.value = '';

            styleOptionsContainer.querySelectorAll('.hs-segmented-control-option').forEach(btn => btn.classList.remove('hs-segmented-control-active'));
            cameraOptionsContainer.querySelectorAll('.hs-segmented-control-option').forEach(btn => btn.classList.remove('hs-segmented-control-active'));
        });

        function handleCopy(textareaEl, feedbackEl, message) {
            if (!textareaEl.value) return;
            textareaEl.select();
            try {
                document.execCommand('copy');
                feedbackEl.textContent = message;
                feedbackEl.classList.remove('opacity-0');
                setTimeout(() => feedbackEl.classList.add('opacity-0'), 2000);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
        }

        copyButtonEn.addEventListener('click', () => handleCopy(generatedPromptEnEl, copyFeedbackEn, 'Copied!'));
        copyButtonEs.addEventListener('click', () => handleCopy(generatedPromptEsEl, copyFeedbackEs, '¡Copiado!'));

        examplesList.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                 const textToCopy = e.target.textContent.trim();
                 const textarea = document.createElement('textarea');
                 textarea.value = textToCopy;
                 textarea.style.position = 'fixed';
                 document.body.appendChild(textarea);
                 textarea.select();
                 try {
                    document.execCommand('copy');
                    copyFeedbackEn.textContent = 'Example copied!';
                    copyFeedbackEn.classList.remove('opacity-0');
                    copyFeedbackEs.textContent = '¡Ejemplo copiado!';
                    copyFeedbackEs.classList.remove('opacity-0');
                    setTimeout(() => {
                        copyFeedbackEn.classList.add('opacity-0');
                        copyFeedbackEs.classList.add('opacity-0');
                    }, 2000);
                 } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                 }
                 document.body.removeChild(textarea);
            }
        });

        luckyButton.addEventListener('click', () => {
            clearButton.click();
            const prompt = luckyPrompts[Math.floor(Math.random() * luckyPrompts.length)];
            
            subjectEl.value = prompt.subject;
            actionEl.value = prompt.action;
            detailsEl.value = prompt.details;
            
            // For Preline, we manually set the active class
            if (prompt.style) {
                 const styleButton = styleOptionsContainer.querySelector(`[data-value="${prompt.style}"]`);
                 if (styleButton) styleButton.classList.add('hs-segmented-control-active');
                 else customStyleEl.value = prompt.style;
            }

            if (prompt.camera) {
                 const cameraButton = cameraOptionsContainer.querySelector(`[data-value="${prompt.camera}"]`);
                 if (cameraButton) cameraButton.classList.add('hs-segmented-control-active');
            }

            generateButton.click();
        });
    });