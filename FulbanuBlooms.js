/*
	This file is part of Fulbanu Blooms Boshonto Festival landing page.
	- Edit JavaScript here.
	- For structure/content, see FulbanuBlooms.html
	- For styles, see FulbanuBlooms.css
	For questions, contact the Fulbanu Blooms Team.
*/

// ...existing code...

// Copy all JS from <script> in FulbanuBlooms.html here
  // Floating petals animation
        function createPetals() {
            const petalsContainer = document.getElementById('petals');
            for (let i = 0; i < 15; i++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
                petal.style.animationDelay = Math.random() * 5 + 's';
                petalsContainer.appendChild(petal);
            }
        }
        createPetals();

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Scroll reveal
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => revealObserver.observe(reveal));

        // Quote carousel
        const quotes = [
            { text: "In your eyes, I found my home; in your smile, my spring.", author: "Sample Quote" },
            { text: "Love blooms where you plant it, and with you, it's always springtime.", author: "Sample Quote" },
            { text: "You are the flower in my garden of life, forever in bloom.", author: "Sample Quote" },
            { text: "Every petal reminds me of a moment we've shared together.", author: "Sample Quote" },
            { text: "Like spring returns each year, my love for you renews endlessly.", author: "Sample Quote" }
        ];

        let currentQuote = 0;
        const quoteCarousel = document.getElementById('quoteCarousel');
        const dotsContainer = document.getElementById('carouselDots');

        // Create dots
        quotes.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.onclick = () => showQuote(index);
            dotsContainer.appendChild(dot);
        });

        function showQuote(index) {
            currentQuote = index;
            quoteCarousel.innerHTML = `
                <p class="quote-text">"${quotes[index].text}"</p>
                <p class="quote-author">— ${quotes[index].author}</p>
            `;
            
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Auto-rotate quotes
        setInterval(() => {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        }, 5000);

        // FAQ toggle
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }

        // Modal functionality
        const modalData = {
            sweet: {
                title: '🌹 Sweet Gesture',
                emoji: '🌹',
                description: 'Perfect for those tender first moments or simple expressions of affection. This bouquet features two fresh roses elegantly tied with a hand-selected ribbon.',
                features: [
                    '2 Premium Fresh Roses',
                    'Artisan Hand-tied Ribbon',
                    'Minimalist Elegant Design',
                    'Free Personalized Love Quote Tag',
                    'Perfect for First Dates & Casual Gestures'
                ],
                price: '৳ 350'
            },
            love: {
                title: '🌺 Love Blooms',
                emoji: '🌺',
                description: 'Our most popular choice! A beautiful arrangement of three premium flowers with decorative fillers that create a fuller, more vibrant presentation.',
                features: [
                    '3 Premium Selected Flowers',
                    'Beautiful Decorative Fillers',
                    'Artisan Quality Ribbon',
                    'Free Personalized Love Quote Tag',
                    'Most Popular Festival Choice',
                    'Perfect Balance of Elegance & Impact'
                ],
                price: '৳ 550',
                badge: 'Most Popular'
            },
            eternal: {
                title: '💐 Eternal Promise',
                emoji: '💐',
                description: 'Make an unforgettable statement with our premium tier. Three luxury roses arranged with premium fillers, finished with a gold tag and wide silk ribbon.',
                features: [
                    '3 Luxury Premium Roses',
                    'Premium Quality Fillers',
                    'Gold Personalized Tag',
                    'Wide Silk Ribbon',
                    'Handwritten Calligraphy Quote',
                    'Perfect for Proposals & Anniversaries'
                ],
                price: '৳ 750'
            },
            lottery: {
                title: '💌 Love Quote Lottery',
                emoji: '💌',
                description: 'Join our free lottery to receive a personalized love quote with your bouquet! Our team crafts unique, heartfelt messages that make your gift even more special.',
                features: [
                    'Completely Free with Any Bouquet',
                    'Personalized to Your Story',
                    'Hand-Calligraphed on Golden Tag',
                    'Available in English & Bengali',
                    'Pre-Festival Email Reminder',
                    'Join 50+ Couples Already Signed Up!'
                ],
                isForm: true
            }
        };

        function openModal(type) {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modalBody');
            const modalTitle = document.getElementById('modalTitle');
            const data = modalData[type];

            if (!data) return;

            modalTitle.textContent = data.title;
            
            let content = `
                <div class="modal-image">${data.emoji}</div>
                <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem; color: #666;">${data.description}</p>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Features:</h3>
                <ul class="features" style="margin-bottom: 2rem;">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            `;

            if (data.isForm) {
                content += `
                    <form onsubmit="handleFormSubmit(event)" style="background: var(--warm-gray); padding: 2rem; border-radius: 16px;">
                        <h3 style="margin-bottom: 1rem;">Join the Lottery</h3>
                        <input type="text" placeholder="Your Name" required style="width: 100%; padding: 1rem; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 1rem; font-size: 1rem;">
                        <input type="text" placeholder="Partner's Name" required style="width: 100%; padding: 1rem; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 1rem; font-size: 1rem;">
                        <input type="email" placeholder="Your Email" required style="width: 100%; padding: 1rem; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 1rem; font-size: 1rem;">
                        <select style="width: 100%; padding: 1rem; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 1.5rem; font-size: 1rem;">
                            <option>Relationship Milestone (Optional)</option>
                            <option>First Date</option>
                            <option>Anniversary</option>
                            <option>Proposal</option>
                            <option>Just Because</option>
                        </select>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Join Free Lottery 🎁</button>
                    </form>
                `;
            } else {
                const whatsappText = encodeURIComponent(`Hi! I'd like to pre-order the ${data.title} bouquet`);
                content += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: var(--warm-gray); border-radius: 12px; margin-bottom: 1.5rem;">
                        <span style="font-size: 2rem; font-weight: 700; color: var(--marigold);">${data.price}</span>
                        ${data.badge ? `<span class="badge">${data.badge}</span>` : ''}
                    </div>
                    <a href="https://wa.me/8801234567890?text=${whatsappText}" target="_blank" class="btn btn-primary" style="width: 100%; text-align: center; text-decoration: none;">Pre-Order on WhatsApp 💬</a>
                `;
            }

            modalBody.innerHTML = content;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            alert("🎉 Thank you for joining! We'll send you a reminder before the festival.");
            closeModal();
        }

        // Close modal on outside click
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') {
                closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });