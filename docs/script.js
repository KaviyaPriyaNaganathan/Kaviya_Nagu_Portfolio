// ===========================================
// --- GLOBAL DATA & CONSTANTS ---
// ===========================================

// --- PROJECTS DATA (CONSOLIDATED & MASTER LIST) ---
const MASTER_PROJECT_DATA = [
    { id: 1, name: "Chatify", color: '#ef4444', githubLink: 'https://github.com/KaviyaPriyaNaganathan/Chatify_backend', description: "Developed and deployed a high-performance backend system for Chatify, focused on enabling one-to-one real-time communication. This system leverages WebSockets and a scalable architecture to handle persistent connections, message brokering, and secure user authentication, ensuring low-latency message delivery and a reliable foundation for instant messaging." },
    { id: 2, name: "ERP Mini System for Cadbury Dairy Milk", color: '#374151', githubLink: 'https://github.com/KaviyaPriyaNaganathan/ERP_Backend', description: "Developed a full-stack ERP mini system tailored for Cadbury Dairy Milk operations using HTML, CSS, JavaScript, Node.js, Express.js, and SQL. Implemented modules for product management, inventory tracking, and order processing, with secure user authentication and role-based access control." },
    { id: 3, name: "Dynamic Travel Planner Platform", color: '#6366f1', githubLink: 'https://github.com/KaviyaPriyaNaganathan/TRAVEL', description: "Developed a Travel Planner Web Application with a focus on enhancing user experience and server-side integration. This project implemented advanced frontend functionalities using Vanilla JavaScript for dynamic content manipulation and utilized AJAX (Fetch API) to connect with a Node.js backend for critical operations." },
    { id: 4, name: "The Neighborhood Brew", color: '#f59e0b', githubLink: 'https://github.com/KaviyaPriyaNaganathan/COFFEE', description: "Developed a fully responsive, mobile-first website for an artisanal coffee shop using HTML, CSS, and Vanilla JavaScript. Implemented core UI/UX features, ensuring optimal performance and navigation across all device types. The system includes structured sections for commitment, amenities, and a detailed menu for enhanced content organization." },
    { id: 5, name: "Emotion Recognition in Children with Autism Spectrum Disorder", color: '#10b981', githubLink: 'https://github.com/KaviyaPriyaNaganathan/Emotion-Recognition-in-Children-with-Autism-Spectrum-Disorder', description: "eveloped an advanced emotion recognition system focused on accurately detecting and classifying facial emotions in children with Autism Spectrum Disorder (ASD). The core architecture utilizes a combination of MTCNN, and a Swin Transformer for robust, final emotion classification."},
    { id: 6, name: "Cook Unity", color: '#9333ea', githubLink: 'https://github.com/KaviyaPriyaNaganathan/CookApp', description: "Designed a comprehensive mobile application (UI/UX) using Figma that combines AI-driven recipe generation with a community-focused social platform. Cook Unity serves as a central hub for food enthusiasts to discover recipes, connect with fellow cooks, and utilize smart cooking tools."},
    { id: 7, name: "Pixel Perfect", color: '#9333ea', githubLink: 'https://github.com/KaviyaPriyaNaganathan/Pitch_Perfect', description: "Designed a full-featured social media and sports streaming application tailored for cricket fans, focusing on a responsive design (Mobile and Web/Desktop) with a clean, unified user interface. Developed the UI/UX in Figma, integrating social networking essentials with real-time sports content."},
    { id: 8, name: "WicketFeed", color: '#9333ea', githubLink: 'https://github.com/KaviyaPriyaNaganathan/Cricket', description: "Designed and prototyped a dedicated mobile application (UI/UX) using Figma for cricket enthusiasts, focused on delivering real-time scores, match information, and supplementary content through an intuitive interface. The application features extensive filtering and section management to cater to different user interests and match formats."},

    
];
// --- CERTIFICATE DATA (MASTER LIST FOR ACCORDION) ---
// ===========================================
// --- CERTIFICATE DATA (MASTER LIST FOR ACCORDION) ---
// ===========================================
const certificates = [
    { 
        // This is the multi-module entry with 3 images
        name: "Course AZ-900T00-A: Introduction to Microsoft Azure",
        // NEW: Use an array for multiple images/modules
        imagePaths: [
            "assets/azure_1.jpg", // 💡 Module 1 Image
            "assets/azure_2.jpg", // 💡 Module 2 Image
            "assets/azure_3.jpg", // 💡 Module 3 Image
        ],
    },
    { 
        name: "Course AZ-2008-A: DevOps Foundations: The Core Principles and Practices",
        // Single image remains an array of one
        imagePaths: ["assets/devops.jpg"], 
    },
    { 
        name: "NPTEL - Ethical Hacking",
        imagePaths: ["assets/Ethical Hacking.jpg"],
    },
    { 
        name: "NPTEL - Design & Implementation of Human-Computer Interfaces",
        imagePaths: ["assets/Design & Implementation of Human-Computer Interfaces.jpg"],
    },
    { 
        name: "IEEE - Real Time Facial Recognition System for College Bus Transport using Deep Learning Techniques",
        imagePaths: ["assets/IEEE.jpg"],
    },
];

// --- GLOBAL STATE ---
// New map to track the active module index for each multi-image certificate
const moduleActiveIndices = {};

// --- CONSTANTS ---
const CONTENT_FADE_DURATION = 300;
const CARD_CYCLE_DELAY = 500; // Delay for desktop cycling animation
const MOBILE_BREAKPOINT = 768;

// --- GLOBAL STATE ---
let projectData = [...MASTER_PROJECT_DATA];
let mobileActiveIndex = 0;
let isCurrentlyMobile = window.innerWidth < MOBILE_BREAKPOINT;

// Deprecated cert carousel variables removed:
// let activeCertIndex = 0;
// let certElements = [];
// let certTouchStartX = 0;
// let certTouchEndX = 0;
// const certSwipeThreshold = 50;
// let isCertSwiping = false; 


// ===========================================
// --- 2. PROJECTS CARD SWIPER/CAROUSEL LOGIC ---
// ===========================================

// --- DOM ELEMENTS ---
// Desktop
const cardStack = document.getElementById('card-stack-container');
const dynamicContentWrapper = document.getElementById('dynamic-content-wrapper');
const projectTitleEl = document.getElementById('movie-title');
const projectDescriptionEl = document.getElementById('movie-description');
const githubLinkButton = document.getElementById('github-link-button');
const desktopProjectContainer = document.querySelector('.glass-container');
const prevBtnDesktop = document.getElementById('prev-btn-desktop');
const nextBtnDesktop = document.getElementById('next-btn-desktop');

// Mobile

const mobileCarouselWrapper = document.getElementById('mobile-project-carousel');

// --- DOM ELEMENTS ---
// Desktop
// ... (Desktop elements unchanged) ...

// Mobile
// 🛑 FIX THIS LINE: Use the correct ID from your HTML: 'mobile-card-display'
const mobileProjectContainer = document.getElementById('mobile-card-display'); 
// const mobileCarouselWrapper = document.getElementById('mobile-project-carousel'); // Removed this, as the ID doesn't exist in the HTML

const prevBtnMobile = document.getElementById('prev-btn-mobile');
const nextBtnMobile = document.getElementById('next-btn-mobile');

function isSmallScreen() {
    return window.innerWidth < MOBILE_BREAKPOINT;
}

// --- In your script.js file, find the createMobileCardHTML function:

function createMobileCardHTML(data) {
    return `
        <div id="mobile-card-${data.id}" 
             class="bg-custom-glass-bg backdrop-blur-md rounded-2xl shadow-2xl p-6 
                    transition-opacity duration-300 ease-in-out border-t-8 border-custom-border w-full **h-[280px]**" 
             style="border-top-color: ${data.color};">
            
            <h4 class="text-2xl font-bold text-yellow-400 mb-2">${data.name}</h4>
            <p class="text-base text-gray-300 mb-6">${data.description}</p>
            
            <a href="${data.githubLink}" target="_blank" class="bg-yellow-400 hover:bg-transparent text-black hover:text-yellow-600 border-2 border-yellow-400 hover:border-yellow-600 font-semibold py-2 px-4 rounded-lg text-sm inline-flex items-center space-x-2 transition-colors">
                <i class="fas fa-code"></i>
                <span>View Code</span>
            </a>
        </div>
    `;
}
// --- DESKTOP/TABLET LOGIC FUNCTIONS (PROJECTS) ---

/**
 * FINAL CORRECTED: Shifts the entire card stack to the left.
 */
function getCardTransform(index) {
    // Top card (index 0): Shift left by 100px
    if (index === 0) return { transform: 'translateX(-100px)', zIndex: 30, opacity: 1, cursor: 'pointer' };
    
    // Adjusted positions for stacked cards
    if (index === 1) return { transform: 'translate(-80px, 15px) rotate(4deg) scale(0.95)', zIndex: 20, opacity: 0.85, cursor: 'pointer' };
    if (index === 2) return { transform: 'translate(-60px, 30px) rotate(8deg) scale(0.9)', zIndex: 10, opacity: 0.7, cursor: 'pointer' };
    
    // Hidden cards (ensures they fade out and are positioned relative to the stack)
    const offset = (index - 2) * 20;
    return { transform: `translate(${10 + offset}px, ${45 + offset}px) rotate(${12 + offset / 2}deg) scale(0.85)`, zIndex: 5, opacity: 0, cursor: 'default' };
}

function createProjectCardElement(data) {
    const card = document.createElement('div');
    card.className = 'card-base absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-[360px] rounded-2xl shadow-lg cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]';
    card.style.backgroundColor = data.color;
    card.setAttribute('data-id', data.id);
    card.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
            <span class="text-xl text-white font-semibold">${data.name}</span>
        </div>
    `;
    return card;
}

function updateContent(topProjectData) {
    if (!dynamicContentWrapper || isSmallScreen()) return;

    dynamicContentWrapper.style.opacity = '0';

    setTimeout(() => {
        if (projectTitleEl) projectTitleEl.textContent = topProjectData.name;
        if (projectTitleEl) projectTitleEl.style.color = '#facc15';
        if (projectDescriptionEl) projectDescriptionEl.textContent = topProjectData.description;
        if (githubLinkButton) githubLinkButton.href = topProjectData.githubLink;

        dynamicContentWrapper.style.opacity = '1';
    }, CONTENT_FADE_DURATION);
}

function updateCardStackStyles() {
    if (!cardStack || isSmallScreen()) return;

    const cards = Array.from(cardStack.children);
    cardStack.style.pointerEvents = 'none'; 

    cards.forEach((card, index) => {
        const styles = getCardTransform(index);
        
        card.style.transition = `transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-in-out`;
        
        card.style.transform = styles.transform;
        card.style.zIndex = styles.zIndex;
        card.style.opacity = styles.opacity;
        card.style.cursor = styles.cursor;

        card.onclick = null;

        if (index < 3) {
            const dataId = parseInt(card.getAttribute('data-id'));
            
            card.onclick = (e) => {
                e.stopPropagation(); 
                bringCardToFront(dataId, card);
            };
        }
    });
    
    setTimeout(() => {
        cardStack.style.pointerEvents = 'auto';
    }, 50);
}

function bringCardToFront(dataId, clickedCardEl) {
    if (!cardStack || isSmallScreen() || projectData[0].id === dataId) return;

    const clickedIndex = projectData.findIndex(p => p.id === dataId);
    if (clickedIndex === -1) return;

    clickedCardEl.animate(
        [
            { transform: clickedCardEl.style.transform, offset: 0 },
            { transform: 'translateY(-20px) scale(1.05)', offset: 0.5 },
            { transform: clickedCardEl.style.transform, offset: 1 }
        ],
        { duration: 400, easing: 'ease-out' }
    );

    const [projectToMove] = projectData.splice(clickedIndex, 1);
    projectData.unshift(projectToMove);

    setTimeout(renderCardStack, 300);
}

function forwardCycleCard() {
    if (!cardStack || isSmallScreen()) return;

    cardStack.style.pointerEvents = 'none';

    const cards = Array.from(cardStack.children);
    if (cards.length === 0) return;
    const topCard = cards[0];

    topCard.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-in';
    topCard.style.transform = 'translateY(100px) scale(0.85) rotate(-5deg)';
    topCard.style.opacity = '0';
    topCard.style.zIndex = '1';
    topCard.onclick = null;

    setTimeout(() => {
        const cycledProject = projectData.shift();
        projectData.push(cycledProject);

        renderCardStack(); 
        cardStack.style.pointerEvents = 'auto';

    }, CARD_CYCLE_DELAY);
}

function reverseCycleCard() {
    if (!cardStack || isSmallScreen() || projectData.length <= 1) return;

    cardStack.style.pointerEvents = 'none';

    const lastProject = projectData.pop();
    projectData.unshift(lastProject);

    renderCardStack();

    const cards = Array.from(cardStack.children);
    const newTopCard = cards[0];
    const initialTransform = getCardTransform(1).transform; 

    newTopCard.style.transition = 'none';
    newTopCard.style.transform = initialTransform;
    newTopCard.style.opacity = '0';
    
    newTopCard.offsetHeight; 

    newTopCard.style.transition = `transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-in-out`;
    newTopCard.style.transform = getCardTransform(0).transform;
    newTopCard.style.opacity = '1';

    setTimeout(() => {
        updateCardStackStyles();
        cardStack.style.pointerEvents = 'auto';
    }, CARD_CYCLE_DELAY);
}

function renderCardStack() {
    if (!cardStack || isSmallScreen()) return;

    cardStack.innerHTML = '';
    projectData.forEach((data) => {
        const cardEl = createProjectCardElement(data);
        cardStack.appendChild(cardEl);
    });
    updateCardStackStyles();
    updateContent(projectData[0]);
    
    // 🚀 NEW: Call the function to check and set button states
    updateDesktopButtonStates(); 
}

function initializeDesktopControls() {
    if (nextBtnDesktop) {
        nextBtnDesktop.onclick = forwardCycleCard;
    }
    if (prevBtnDesktop) {
        prevBtnDesktop.onclick = reverseCycleCard;
    }
}

// --- New function to manage desktop button states ---
function updateDesktopButtonStates() {
    if (!projectData.length || isSmallScreen()) return;

    // Get the ID of the project currently displayed as the top card (index 0)
    const currentTopCardId = projectData[0].id;
    
    // Get the IDs of the first and last project from the static master list
    const firstProjectId = MASTER_PROJECT_DATA[0].id;
    const lastProjectId = MASTER_PROJECT_DATA[MASTER_PROJECT_DATA.length - 1].id;
    
    // Check if current project is the first in the master list
    const isFirstProject = currentTopCardId === firstProjectId;
    
    // Check if current project is the last in the master list
    const isLastProject = currentTopCardId === lastProjectId;

    // Update Previous Button (Disabled at the start)
    if (prevBtnDesktop) {
        prevBtnDesktop.disabled = isFirstProject;
        prevBtnDesktop.classList.toggle('opacity-50', isFirstProject);
        prevBtnDesktop.classList.toggle('cursor-not-allowed', isFirstProject);
    }

    // Update Next Button (Disabled at the end)
    if (nextBtnDesktop) {
        nextBtnDesktop.disabled = isLastProject;
        nextBtnDesktop.classList.toggle('opacity-50', isLastProject);
        nextBtnDesktop.classList.toggle('cursor-not-allowed', isLastProject);
    }
}

function forwardCycleCard() {
    if (!cardStack || isSmallScreen()) return;

    const currentTopCardId = projectData[0].id;
    const lastProjectId = MASTER_PROJECT_DATA[MASTER_PROJECT_DATA.length - 1].id;

    // 🛑 STOP: If the current top card is the last project, do nothing.
    if (currentTopCardId === lastProjectId) {
        updateDesktopButtonStates(); // Re-render states just in case
        return;
    }
    
    // ... (rest of the animation and shifting logic) ...

    cardStack.style.pointerEvents = 'none';

    const cards = Array.from(cardStack.children);
    if (cards.length === 0) return;
    const topCard = cards[0];

    topCard.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-in';
    topCard.style.transform = 'translateY(100px) scale(0.85) rotate(-5deg)';
    topCard.style.opacity = '0';
    topCard.style.zIndex = '1';
    topCard.onclick = null;

    setTimeout(() => {
        // --- ONLY SHIFT IF NOT THE LAST CARD ---
        const cycledProject = projectData.shift(); 
        projectData.push(cycledProject); // This line needs adjustment for non-cycling

        // To make it truly non-cycling, we shouldn't push it back to the end.
        // However, given the current logic, shifting is equivalent to advancing.
        // The array order is: [Current, Next, Next-next, ..., Last]
        
        // Since we are not cycling, we simply use the projectData array as a sliding window.
        // To prevent the shift from cycling, we only need to remove the shift/push, but 
        // the existing rendering relies on the new order.
        
        // Let's rely on the early return and just re-render:
        renderCardStack(); 
        cardStack.style.pointerEvents = 'auto';

    }, CARD_CYCLE_DELAY);
}

function reverseCycleCard() {
    if (!cardStack || isSmallScreen() || projectData.length <= 1) return;

    const currentTopCardId = projectData[0].id;
    const firstProjectId = MASTER_PROJECT_DATA[0].id;

    // 🛑 STOP: If the current top card is the first project, do nothing.
    if (currentTopCardId === firstProjectId) {
        updateDesktopButtonStates(); // Re-render states just in case
        return;
    }

    // ... (rest of the animation and shifting logic) ...

    cardStack.style.pointerEvents = 'none';

    // The shift logic for reverse is already correct for non-cycling (moves the last to the front)
    const lastProject = projectData.pop();
    projectData.unshift(lastProject);

    renderCardStack();

    // ... (rest of the visual transition logic) ...

    const cards = Array.from(cardStack.children);
    const newTopCard = cards[0];
    const initialTransform = getCardTransform(1).transform; 

    newTopCard.style.transition = 'none';
    newTopCard.style.transform = initialTransform;
    newTopCard.style.opacity = '0';
    
    newTopCard.offsetHeight; 

    newTopCard.style.transition = `transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-in-out`;
    newTopCard.style.transform = getCardTransform(0).transform;
    newTopCard.style.opacity = '1';

    setTimeout(() => {
        updateCardStackStyles();
        cardStack.style.pointerEvents = 'auto';
    }, CARD_CYCLE_DELAY);
}

// --- MOBILE CAROUSEL LOGIC (PROJECTS) ---

function createMobileCardHTML(data) {
    return `
        <div id="mobile-card-${data.id}" class="bg-custom-glass-bg backdrop-blur-md rounded-2xl shadow-2xl p-6 transition-opacity duration-300 ease-in-out border-t-8 border-custom-border w-full" style="border-top-color: ${data.color};">
            <h4 class="text-2xl font-bold text-yellow-400 mb-2">${data.name}</h4>
            <p class="text-base text-gray-300 mb-6">${data.description}</p>
            <a href="${data.githubLink}" target="_blank" class="bg-yellow-400 hover:bg-transparent text-black hover:text-yellow-600 border-2 border-yellow-400 hover:border-yellow-600 font-semibold py-2 px-4 rounded-lg text-sm inline-flex items-center space-x-2 transition-colors">
                <i class="fas fa-code"></i>
                <span>View Code</span>
            </a>
        </div>
    `;
}

function renderMobileCarousel() {
    if (!mobileProjectContainer || !isSmallScreen()) return;

    const currentProject = MASTER_PROJECT_DATA[mobileActiveIndex];

    mobileProjectContainer.style.opacity = '0';

    setTimeout(() => {
        mobileProjectContainer.innerHTML = createMobileCardHTML(currentProject);
        mobileProjectContainer.style.opacity = '1';

        if (prevBtnMobile) {
            prevBtnMobile.disabled = mobileActiveIndex === 0;
            prevBtnMobile.classList.toggle('opacity-50', mobileActiveIndex === 0);
        }
        if (nextBtnMobile) {
            nextBtnMobile.disabled = mobileActiveIndex === MASTER_PROJECT_DATA.length - 1;
            nextBtnMobile.classList.toggle('opacity-50', mobileActiveIndex === MASTER_PROJECT_DATA.length - 1);
        }

    }, CONTENT_FADE_DURATION);
}

function navigateMobile(direction) {
    let newIndex = mobileActiveIndex + direction;

    if (newIndex < 0 || newIndex >= MASTER_PROJECT_DATA.length) {
        return;
    }

    mobileActiveIndex = newIndex;
    renderMobileCarousel();
}

// --- MASTER PROJECT RENDER FUNCTION (VISIBILITY CONTROL) ---

function renderProjectSection() {
    const isMobileNow = isSmallScreen();

    if (isMobileNow) {
        // --- Activate Mobile View ---
        if (desktopProjectContainer) desktopProjectContainer.classList.add('hidden');
        if (mobileCarouselWrapper) mobileCarouselWrapper.classList.remove('hidden');

        projectData = [...MASTER_PROJECT_DATA];
        renderMobileCarousel();

        if (prevBtnMobile && nextBtnMobile) {
            prevBtnMobile.onclick = () => navigateMobile(-1);
            nextBtnMobile.onclick = () => navigateMobile(1);
        }
    } else {
        // --- Activate Desktop View ---
        if (desktopProjectContainer) desktopProjectContainer.classList.remove('hidden');
        if (mobileCarouselWrapper) mobileCarouselWrapper.classList.add('hidden');

        mobileActiveIndex = 0;
        if (projectData.length !== MASTER_PROJECT_DATA.length) {
            projectData = [...MASTER_PROJECT_DATA];
        }

        renderCardStack();
        initializeDesktopControls();

        if (prevBtnMobile && nextBtnMobile) {
            prevBtnMobile.onclick = null;
            nextBtnMobile.onclick = null;
        }
    }

    isCurrentlyMobile = isMobileNow;
}


// ===========================================
// --- 3. CERTIFICATE ACCORDION LOGIC (NEW) ---
// ===========================================
// ===========================================
// --- 3. CERTIFICATE ACCORDION LOGIC (NEW) ---
// ===========================================

const accordionContainer = document.getElementById('certifications-accordion');
    
function initializeCertAccordion() {
    if (!accordionContainer || certificates.length === 0) return;

    accordionContainer.innerHTML = ''; 

    certificates.forEach((cert, index) => {
        const isMultiModule = cert.imagePaths.length > 1;
        
        // Initialize the index tracker for multi-module certs
        if (isMultiModule) {
            moduleActiveIndices[index] = 0;
        }

        const item = document.createElement('div');
        item.className = 'accordion-item bg-custom-glass-bg backdrop-blur-sm border border-custom-border rounded-xl shadow-lg transition-all duration-300 overflow-hidden';
        
        const header = document.createElement('button');
        header.className = 'accordion-header w-full flex justify-between items-center p-4 text-left text-lg font-semibold hover:bg-white/10 transition-colors';
        header.setAttribute('data-cert-index', index);
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = cert.name;
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down transition-transform duration-300';
        
        header.appendChild(nameSpan);
        header.appendChild(icon);
        
        const content = document.createElement('div');
        content.className = 'accordion-content max-h-0 transition-[max-height] duration-500 ease-in-out';
        content.setAttribute('aria-hidden', 'true');
        
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'p-4 pt-0 flex justify-center relative mx-auto max-w-2xl'; // Added relative for absolute positioning of controls
        
        const img = document.createElement('img');
        img.alt = `${cert.name} Certificate`;
        img.className = 'cert-image w-full h-auto rounded-lg border border-gray-700 object-contain mx-auto transition-opacity duration-300';
        img.style.maxWidth = '100%'; 
        img.style.maxHeight = window.innerWidth >= MOBILE_BREAKPOINT ? '700px' : '400px'; 
        
        // Set the initial image source
        img.src = cert.imagePaths[0]; 

        imageWrapper.appendChild(img);

        // --- CAROUSEL NAVIGATION SETUP (NEW) ---
        if (isMultiModule) {
            // Function to update the image and button states
            const updateModuleCarousel = (itemEl, currentModuleIndex) => {
                const imgEl = itemEl.querySelector('.cert-image');
                const prevBtn = itemEl.querySelector('.cert-prev-btn');
                const nextBtn = itemEl.querySelector('.cert-next-btn');

                // 1. Update Image Source
                imgEl.style.opacity = '0';
                setTimeout(() => {
                    imgEl.src = cert.imagePaths[currentModuleIndex];
                    imgEl.style.opacity = '1';
                }, 300);

                // 2. Update Button States
                const isFirst = currentModuleIndex === 0;
                const isLast = currentModuleIndex === cert.imagePaths.length - 1;

                prevBtn.disabled = isFirst;
                nextBtn.disabled = isLast;
                prevBtn.classList.toggle('opacity-50', isFirst);
                nextBtn.classList.toggle('opacity-50', isLast);
            };


            // Create navigation buttons
            const navContainer = document.createElement('div');
            navContainer.className = 'absolute inset-0 flex items-center justify-between pointer-events-none p-2';

            const createButton = (isPrev) => {
                const btn = document.createElement('button');
                btn.className = `p-2 m-2 bg-black/50 hover:bg-black/80 text-white rounded-full pointer-events-auto transition-opacity duration-300 ${isPrev ? 'cert-prev-btn' : 'cert-next-btn'}`;
                btn.innerHTML = `<i class="fas fa-chevron-${isPrev ? 'left' : 'right'}"></i>`;
                
                // Initial state update
                btn.disabled = isPrev ? true : false; 
                btn.classList.toggle('opacity-50', isPrev);
                
                // Click handler
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let newIndex = moduleActiveIndices[index] + (isPrev ? -1 : 1);
                    
                    if (newIndex >= 0 && newIndex < cert.imagePaths.length) {
                        moduleActiveIndices[index] = newIndex;
                        updateModuleCarousel(item, newIndex);
                    }
                });
                return btn;
            };

            navContainer.appendChild(createButton(true));  // Previous Button
            navContainer.appendChild(createButton(false)); // Next Button

            imageWrapper.appendChild(navContainer);
            
            // Ensure initial state is correct for the very first render
            setTimeout(() => updateModuleCarousel(item, 0), 10);
        }
        // --- END CAROUSEL SETUP ---

        content.appendChild(imageWrapper);

        item.appendChild(header);
        item.appendChild(content);
        accordionContainer.appendChild(item);

        // Accordion toggle logic remains the same
        header.addEventListener('click', () => {
            const isOpened = item.classList.contains('active');
            
            // 1. Close all other open items
            document.querySelectorAll('.accordion-item.active').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('active');
                    openItem.querySelector('.accordion-content').style.maxHeight = '0';
                    const upIcon = openItem.querySelector('.fa-chevron-up');
                    if (upIcon) upIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });

            // 2. Toggle the current item
            item.classList.toggle('active', !isOpened);
            content.setAttribute('aria-hidden', isOpened);
            
            if (!isOpened) {
                // Open: set max-height to the scroll height
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                // Close
                content.style.maxHeight = '0';
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });

    // Resize handler remains the same
    window.addEventListener('resize', () => {
        document.querySelectorAll('.accordion-item img').forEach(img => {
            img.style.maxHeight = window.innerWidth >= MOBILE_BREAKPOINT ? '700px' : '400px';
        });
        
        document.querySelectorAll('.accordion-item.active .accordion-content').forEach(content => {
            content.style.maxHeight = content.scrollHeight + "px";
        });
    });
}

    // Handle window resize for dynamic image max-height and open accordions
    window.addEventListener('resize', () => {
        document.querySelectorAll('.accordion-item img').forEach(img => {
            // Update max-height on image elements for responsive sizing
            img.style.maxHeight = window.innerWidth >= MOBILE_BREAKPOINT ? '700px' : '400px';
        });
        
        // Re-calculate max-height for currently open content to prevent cutoff
        document.querySelectorAll('.accordion-item.active .accordion-content').forEach(content => {
            // Must set max-height to scrollHeight on resize if it's open
            content.style.maxHeight = content.scrollHeight + "px";
        });
    });


// The master render function for this section simply calls the initialization
function renderCertSection() {
    // We only need to ensure the accordion container exists for the JS to run
    if (accordionContainer) {
        // Hide the old desktop/mobile carousel wrappers (since they were removed from the HTML anyway)
        const desktopCertWrapper = document.getElementById('desktop-cert-wrapper'); 
        const mobileCertWrapper = document.getElementById('mobile-cert-wrapper'); 
        if (desktopCertWrapper) desktopCertWrapper.classList.add('hidden');
        if (mobileCertWrapper) mobileCertWrapper.classList.add('hidden');
        
        // Initialize the new accordion view (which is responsive by nature)
        initializeCertAccordion();
    }
}


// ===========================================
// --- 4. THEME TOGGLE & NAVBAR LOGIC (UNCHANGED) ---
// ===========================================

const themeCheckbox = document.getElementById("theme-checkbox");
if (themeCheckbox) {
    themeCheckbox.addEventListener("change", () => {
        document.body.classList.toggle("dark", themeCheckbox.checked);
    });
}

const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.querySelector(".nav-links");

if (hamburger && navLinksContainer) {
    hamburger.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}


// ===========================================
// --- 5. INITIALIZATION & SCROLLSPY (UPDATED) ---
// ===========================================

let resizeTimeout;

document.addEventListener('DOMContentLoaded', function() {

    if (cardStack || mobileProjectContainer) {
        renderProjectSection();
    }
    
    // Initialize Certificate Section (Calls the new accordion setup)
    renderCertSection();

    // ... (ScrollSpy logic remains unchanged) ...
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === id) {
                link.classList.add('active');
            }
        });
    };

    const scrollSpy = () => {
        let currentSectionId = 'hero';
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollPosition >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        setActiveLink(currentSectionId);
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();
});


// Responsive resize handler
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    const isMobileNow = isSmallScreen();
    // Only re-render if the breakpoint boundary is crossed
    if (isMobileNow !== isCurrentlyMobile) {
        resizeTimeout = setTimeout(() => {
            renderProjectSection();
            // renderCertSection is not strictly needed here as the accordion handles its own resize
            isCurrentlyMobile = isMobileNow; // Update global state after render
        }, 250);
    }
});