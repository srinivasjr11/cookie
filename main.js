/**
 * Cookie Jar - Home Bakery, Sattur
 * Client-side TypeScript Application
 */
const BAKERY_CONFIG = {
    name: "Cookie Jar",
    location: "Sattur, Tamil Nadu",
    phone: "+919876543210",
    whatsappNumber: "919876543210",
    defaultMessage: "Hi Cookie Jar! I would like to place an order from your bakery in Sattur."
};
const MENU_DATA = {
    brownies: {
        name: "Fudgy Brownie Box",
        sizes: [
            { label: "Box of 4 pieces", price: 280 },
            { label: "Box of 6 pieces (Popular)", price: 400 },
            { label: "Box of 9 pieces (Party Pack)", price: 580 }
        ],
        flavors: [
            "Classic Belgian Fudge",
            "Walnut Crinkle",
            "Triple Chocochunk",
            "Salted Caramel Swirl"
        ]
    },
    cake: {
        name: "Custom Celebration Cake",
        sizes: [
            { label: "0.5 kg (Small Celebration)", price: 450 },
            { label: "1.0 kg (Family Party)", price: 850 },
            { label: "1.5 kg (Tiered / Standard)", price: 1250 },
            { label: "2.0 kg+ (Grand Celebration)", price: 1650 }
        ],
        flavors: [
            "Dutch Chocolate Truffle",
            "Belgian Dark Ganache",
            "Red Velvet & Cream Cheese",
            "Butterscotch Crunch",
            "Fresh Vanilla Bean",
            "Black Forest Classic"
        ]
    },
    cookies: {
        name: "Cookie Jar Assortment",
        sizes: [
            { label: "Box of 6 cookies", price: 220 },
            { label: "Box of 12 cookies", price: 400 },
            { label: "Glass Cookie Jar Assortment", price: 550 }
        ],
        flavors: [
            "Classic Chocolate Chip",
            "Salted Butter Shortbread",
            "Berry Jam Drops",
            "Chef's Assorted Mix"
        ]
    },
    cheeseballs: {
        name: "Crispy Cheese Balls",
        sizes: [
            { label: "Platter of 10 pieces", price: 180 },
            { label: "Platter of 20 pieces", price: 340 },
            { label: "Party Platter of 35 pieces", price: 550 }
        ],
        flavors: [
            "Classic Cheddar & Herbs",
            "Spicy Peri Peri Melt",
            "Garlic & Herb Infusion"
        ]
    },
    palkova: {
        name: "Traditional Palkova Pal",
        sizes: [
            { label: "250g Gift Box", price: 200 },
            { label: "500g Fresh Box", price: 380 },
            { label: "1.0 kg Celebration Box", price: 720 }
        ],
        flavors: [
            "Traditional Slow-Simmered Palkova",
            "Pistachio & Cardamom Infused"
        ]
    }
};
/**
 * Generates a pre-filled WhatsApp click-to-chat URL
 */
function createWhatsAppUrl(message) {
    const encodedText = encodeURIComponent(message.trim());
    return `https://wa.me/${BAKERY_CONFIG.whatsappNumber}?text=${encodedText}`;
}
/**
 * Sets current year in the footer
 */
function initYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
}
/**
 * Handles sticky header shadow behavior on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header)
        return;
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        }
        else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}
/**
 * Handles mobile hamburger navigation toggle
 */
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!navToggle || !mobileMenu)
        return;
    const toggleMenu = (open) => {
        const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
        mobileMenu.classList.toggle('open', shouldOpen);
        navToggle.setAttribute('aria-expanded', String(shouldOpen));
    };
    navToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });
    // Close menu when clicking any nav link
    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
    });
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(event.target) &&
            !navToggle.contains(event.target)) {
            toggleMenu(false);
        }
    });
    // Close menu on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
            toggleMenu(false);
        }
    });
}
/**
 * Active navigation spy for section scrolling
 */
function initActiveNavSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navlinks a[href^="#"]');
    if (!sections.length || !navLinks.length)
        return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    }
                    else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });
    sections.forEach((section) => observer.observe(section));
}
/**
 * Menu category filtering
 */
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.menu-filters .filter-btn');
    const menuCards = document.querySelectorAll('.menu-card-photo');
    if (!filterBtns.length || !menuCards.length)
        return;
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const filterValue = btn.getAttribute('data-filter');
            menuCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                }
                else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}
/**
 * FAQ Accordion toggle
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn)
            return;
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all other items for neat accordion behavior
            faqItems.forEach((other) => {
                if (other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                }
            });
            item.classList.toggle('active', !isActive);
            questionBtn.setAttribute('aria-expanded', String(!isActive));
        });
    });
}
/**
 * Interactive WhatsApp Order Builder Modal
 */
function initOrderModal() {
    const modal = document.getElementById('orderModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const orderForm = document.getElementById('orderForm');
    const itemSelect = document.getElementById('orderItemSelect');
    const sizeSelect = document.getElementById('orderSizeSelect');
    const flavorSelect = document.getElementById('orderFlavorSelect');
    const egglessToggle = document.getElementById('egglessToggle');
    const messageInput = document.getElementById('orderMessageInput');
    const dateInput = document.getElementById('orderDateInput');
    const nameInput = document.getElementById('customerNameInput');
    const priceDisplay = document.getElementById('priceEstimateDisplay');
    if (!modal || !itemSelect || !sizeSelect || !flavorSelect || !priceDisplay || !dateInput)
        return;
    // Set minimum date to tomorrow for pre-orders
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDateStr = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDateStr;
    dateInput.value = minDateStr;
    const updateSubOptions = (selectedKey) => {
        const itemData = MENU_DATA[selectedKey] || MENU_DATA['brownies'];
        // Populate sizes
        sizeSelect.innerHTML = '';
        itemData.sizes.forEach((s, idx) => {
            const opt = document.createElement('option');
            opt.value = String(s.price);
            opt.textContent = `${s.label} — ₹${s.price}`;
            if (idx === 0)
                opt.selected = true;
            sizeSelect.appendChild(opt);
        });
        // Populate flavors
        flavorSelect.innerHTML = '';
        itemData.flavors.forEach((f, idx) => {
            const opt = document.createElement('option');
            opt.value = f;
            opt.textContent = f;
            if (idx === 0)
                opt.selected = true;
            flavorSelect.appendChild(opt);
        });
        updateEstimate();
    };
    const updateEstimate = () => {
        const selectedPrice = parseInt(sizeSelect.value, 10) || 300;
        const isEggless = egglessToggle?.checked ?? false;
        // Eggless surcharge (minimal or none)
        const finalPrice = isEggless && itemSelect.value === 'cake' ? selectedPrice + 50 : selectedPrice;
        priceDisplay.textContent = `₹${finalPrice}`;
    };
    const openModal = (preselectedItemId) => {
        if (preselectedItemId && MENU_DATA[preselectedItemId]) {
            itemSelect.value = preselectedItemId;
        }
        updateSubOptions(itemSelect.value);
        modal.classList.add('open');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        modal.classList.remove('open');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
    // Event Listeners for Select changes
    itemSelect.addEventListener('change', () => {
        updateSubOptions(itemSelect.value);
    });
    sizeSelect.addEventListener('change', updateEstimate);
    egglessToggle?.addEventListener('change', updateEstimate);
    // Close handlers
    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal)
            closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
    // Attach openModal triggers
    document.getElementById('navOrderBtn')?.addEventListener('click', () => openModal('cake'));
    document.getElementById('mobileOrderBtn')?.addEventListener('click', () => openModal('cake'));
    document.getElementById('heroOrderBtn')?.addEventListener('click', () => openModal('brownies'));
    document.getElementById('ctaOrderBtn')?.addEventListener('click', () => openModal('cake'));
    document.getElementById('floatingWaBtn')?.addEventListener('click', () => openModal('brownies'));
    // Order buttons inside menu cards
    document.querySelectorAll('[data-order-item]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = btn.getAttribute('data-order-item') || 'brownies';
            openModal(itemId);
        });
    });
    // Form Submission -> Format WhatsApp Message
    orderForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedItemKey = itemSelect.value;
        const itemData = MENU_DATA[selectedItemKey] || MENU_DATA['brownies'];
        const sizeText = sizeSelect.options[sizeSelect.selectedIndex]?.text.split(' — ')[0] || '';
        const flavorText = flavorSelect.value;
        const isEggless = egglessToggle?.checked ? 'Yes (100% Eggless 🌿)' : 'Regular recipe';
        const cakeMessage = messageInput?.value.trim() || 'None';
        const dateNeeded = dateInput.value;
        const customerName = nameInput?.value.trim() || 'Customer';
        const estimatedCost = priceDisplay.textContent;
        const messageLines = [
            `🎂 *New Bakery Order — Cookie Jar, Sattur*`,
            `---------------------------------------`,
            `👤 *Customer:* ${customerName}`,
            `📦 *Item:* ${itemData.name}`,
            `⚖️ *Portion/Size:* ${sizeText}`,
            `✨ *Flavor:* ${flavorText}`,
            `🌿 *Eggless:* ${isEggless}`,
            `📅 *Date Needed:* ${dateNeeded}`,
            cakeMessage !== 'None' ? `✍️ *Custom Note/Wording:* "${cakeMessage}"` : '',
            `💰 *Estimated Cost:* ${estimatedCost}`,
            `---------------------------------------`,
            `Hi Cookie Jar! I would like to verify availability and confirm this order.`
        ].filter(Boolean);
        const fullMessage = messageLines.join('\n');
        const waUrl = createWhatsAppUrl(fullMessage);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        closeModal();
    });
    // Initialize defaults
    updateSubOptions(itemSelect.value);
}
/**
 * Main application bootstrap
 */
document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initHeaderScroll();
    initMobileNavigation();
    initActiveNavSpy();
    initMenuFilters();
    initFaqAccordion();
    initOrderModal();
});
export { BAKERY_CONFIG, MENU_DATA, createWhatsAppUrl };
