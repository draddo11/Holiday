document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const rewriteBtn = document.getElementById('rewriteBtn');
    const destinationInput = document.getElementById('destinationInput');
    const detailsInput = document.getElementById('detailsInput');
    const rewriteInput = document.getElementById('rewriteInput');
    const itineraryOutput = document.getElementById('itineraryOutput');

    let currentPlan = '';

    async function initAI() {
        if ('ai' in window) {
            console.log('Built-in AI is supported.');
        } else {
            alert('Built-in AI not supported—enable in chrome://flags');
        }
    }

    async function generateItinerary(destination, details) {
        try {
            const writer = await window.ai.writer.create();
            const itinerary = await writer.write(`Create a detailed 3-day travel itinerary for ${destination}.`, details);
            return itinerary;
        } catch (error) {
            console.error('Error generating itinerary:', error);
            return 'Could not generate itinerary. Please try again.';
        }
    }

    async function summarizeAttraction(description) {
        try {
            const summarizer = await window.ai.summarizer.create();
            return await summarizer.summarize(description, { format: 'paragraph', length: 'medium' });
        } catch (error) {
            console.error('Error summarizing attraction:', error);
            return 'Could not summarize attraction.';
        }
    }

    async function translatePhrase(phrase, targetLang) {
        try {
            const translator = await window.ai.translator.create();
            return await translator.translate(phrase, targetLang);
        } catch (error) {
            console.error('Error translating phrase:', error);
            return 'Could not translate phrase.';
        }
    }

    async function rewritePlan(originalPlan, instructions) {
        try {
            const rewriter = await window.ai.rewriter.create();
            return await rewriter.rewrite(originalPlan, instructions);
        } catch (error) {
            console.error('Error rewriting plan:', error);
            return 'Could not rewrite plan.';
        }
    }

    generateBtn.addEventListener('click', async () => {
        const dest = destinationInput.value;
        const details = detailsInput.value;
        if (!dest) {
            alert('Please enter a destination.');
            return;
        }
        itineraryOutput.innerHTML = '<p>Generating itinerary...</p>';
        currentPlan = await generateItinerary(dest, details);
        itineraryOutput.innerHTML = currentPlan;
        localStorage.setItem('wanderai_plan', currentPlan);
    });

    rewriteBtn.addEventListener('click', async () => {
        const instructions = rewriteInput.value;
        if (!currentPlan) {
            alert('Please generate an itinerary first.');
            return;
        }
        if (!instructions) {
            alert('Please enter rewrite instructions.');
            return;
        }
        itineraryOutput.innerHTML = '<p>Rewriting plan...</p>';
        const newPlan = await rewritePlan(currentPlan, instructions);
        currentPlan = newPlan;
        itineraryOutput.innerHTML = currentPlan;
        localStorage.setItem('wanderai_plan', currentPlan);
    });

    // Load saved plan on startup
    const savedPlan = localStorage.getItem('wanderai_plan');
    if (savedPlan) {
        currentPlan = savedPlan;
        itineraryOutput.innerHTML = currentPlan;
    }

    initAI();
});
