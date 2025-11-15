document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });

            navLinks.forEach(navLink => {
                if (navLink === link) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
        });
    });

    // --- Destination Data ---
    const destinations = [
        {
            id: 'paris',
            name: 'Paris, France',
            tagline: 'The City of Love and Lights',
            image: 'https://frenchmoments.eu/wp-content/uploads/2013/09/Paris-France-2-web-copyright-French-Moments-scaled-1.jpg',
            places: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame Cathedral', 'Montmartre'],
            activities: ['Seine River Cruise', 'Enjoy French Cuisine', 'Explore Art Galleries'],
            facts: 'Paris is the capital and most populous city of France. It is known for its art, fashion, gastronomy, and culture.'
        },
        {
            id: 'tokyo',
            name: 'Tokyo, Japan',
            tagline: 'A Blend of Tradition and Technology',
            image: 'https://cdn-imgix.headout.com/media/images/68caee32b46762b2b4b85c70622057f5-Tokyo%20Tower%20card%20image.jpg',
            places: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Imperial Palace'],
            activities: ['Experience a Tea Ceremony', 'Visit a Robot Restaurant', 'Explore Akihabara'],
            facts: 'Tokyo is the capital of Japan and the most populous metropolis in the world. It is a center for technology, fashion, and pop culture.'
        },
        {
            id: 'santorini',
            name: 'Santorini, Greece',
            tagline: 'Breathtaking Sunsets',
            image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1d/81/30/3f/caption.jpg',
            places: ['Oia', 'Fira', 'Akrotiri Archaeological Site', 'Red Beach'],
            activities: ['Sunset Cruise', 'Wine Tasting', 'Explore Volcanic Beaches'],
            facts: 'Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its stunning caldera views and unique architecture.'
        },
        {
            id: 'new-york',
            name: 'New York, USA',
            tagline: 'The City That Never Sleeps',
            image: 'https://images.squarespace-cdn.com/content/v1/64029dd1934e23132f21c5a1/1681758635678-AXL2805J5X7LOYJ0I5NG/Statue-of-Liberty-NYC.jpg',
            places: ['Statue of Liberty', 'Times Square', 'Central Park', 'Empire State Building'],
            activities: ['Broadway Show', 'Visit Museums', 'Walk Across Brooklyn Bridge'],
            facts: 'New York City is the most populous city in the United States. It is a global hub of finance, culture, and media.'
        },
        {
            id: 'sydney',
            name: 'Sydney, Australia',
            tagline: 'Harbour Views and Iconic Landmarks',
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/93/a7/be/sydney-opera-house.jpg?w=500&h=500&s=1',
            places: ['Sydney Opera House', 'Sydney Harbour Bridge', 'Bondi Beach', 'The Rocks'],
            activities: ['Climb the Harbour Bridge', 'Surf at Bondi', 'Explore the Royal Botanic Garden'],
            facts: 'Sydney is the capital of New South Wales and one of Australia\'s largest cities. It is known for its harbourfront Sydney Opera House and Bridge.'
        },
        {
            id: 'bali',
            name: 'Bali, Indonesia',
            tagline: 'The Island of the Gods',
            image: 'https://www.gtholidays.in/wp-content/uploads/2022/11/Honeymoon-Package-Bali.jpg',
            places: ['Ubud Monkey Forest', 'Tanah Lot Temple', 'Uluwatu Temple', 'Tegallalang Rice Terraces'],
            activities: ['Surfing in Kuta', 'Yoga and Meditation in Ubud', 'Explore Waterfalls'],
            facts: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.'
        }
    ];

    const destinationGrid = document.getElementById('destination-grid');

    function renderDestinations() {
        destinationGrid.innerHTML = '';
        destinations.forEach(dest => {
            const card = document.createElement('div');
            card.classList.add('destination-card');
            card.dataset.id = dest.id;
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}">
                <div class="card-title">
                    <span>${dest.name}</span>
                    <sl-icon name="heart"></sl-icon>
                </div>
                <div class="card-info">${dest.tagline}</div>
            `;
            destinationGrid.appendChild(card);

            card.addEventListener('click', () => {
                showDestinationDetails(dest.id);
            });
        });
    }

    function showDestinationDetails(destId) {
        const dest = destinations.find(d => d.id === destId);
        if (!dest) return;

        const dialog = document.createElement('sl-dialog');
        dialog.label = dest.name;
        dialog.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
            <p><strong>${dest.facts}</strong></p>
            <h3>Places to Visit</h3>
            <ul>${dest.places.map(p => `<li>${p}</li>`).join('')}</ul>
            <h3>Activities</h3>
            <ul>${dest.activities.map(a => `<li>${a}</li>`).join('')}</ul>
            <sl-button slot="footer" variant="primary">Close</sl-button>
        `;
        document.body.appendChild(dialog);
        dialog.show();

        dialog.querySelector('sl-button[slot="footer"]').addEventListener('click', () => dialog.hide());
        dialog.addEventListener('sl-after-hide', () => dialog.remove());
    }

    // --- AI Photo Generation ---
    const generatePhotoBtn = document.getElementById('generate-photo-btn');
    const imageUpload = document.getElementById('image-upload');
    const locationInput = document.getElementById('location-input');
    const loadingIndicator = document.getElementById('loading-indicator');
    const outputImageContainer = document.getElementById('output-image-container');

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    generatePhotoBtn.addEventListener('click', async () => {
        const userImageFile = imageUpload.value;
        const location = locationInput.value;

        if (!userImageFile || !location) {
            const alert = document.createElement('sl-alert');
            alert.variant = 'warning';
            alert.closable = true;
            alert.innerHTML = `
                <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
                Please upload an image and enter a location.
            `;
            document.body.appendChild(alert);
            alert.toast();
            return;
        }

        loadingIndicator.classList.remove('hidden');
        outputImageContainer.innerHTML = '';

        try {
            // 1. Search for the location image
            const searchResponse = await fetch(`http://127.0.0.1:5000/search-location-image?location=${encodeURIComponent(location)}`);
            const searchResult = await searchResponse.json();

            if (!searchResponse.ok) {
                throw new Error(searchResult.error || 'Could not find an image for the location.');
            }

            const backgroundImageUrl = searchResult.imageUrl;

            // 2. Generate the travel photo
            const userImageBase64 = await fileToBase64(userImageFile);
            const generateResponse = await fetch('http://127.0.0.1:5000/generate-travel-photo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userImage: userImageBase64,
                    backgroundImageUrl: backgroundImageUrl
                }),
            });

            const generateResult = await generateResponse.json();

            if (generateResponse.ok) {
                outputImageContainer.innerHTML = `
                    <div class="generated-card">
                        <h3>You're now in ${location}!</h3>
                        <img src="${generateResult.generatedImageUrl}" alt="Generated Travel Photo">
                        <p>Here's your travel postcard!</p>
                    </div>
                `;
            } else {
                throw new Error(generateResult.error || 'Something went wrong during image generation.');
            }
        } catch (error) {
            console.error('Error generating travel photo:', error);
            const alert = document.createElement('sl-alert');
            alert.variant = 'danger';
            alert.closable = true;
            alert.innerHTML = `
                <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
                <strong>Error:</strong> ${error.message}
            `;
            document.body.appendChild(alert);
            alert.toast();
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    });

    // --- Initial Render ---
    renderDestinations();
});
