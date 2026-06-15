/* ==========================================================================
   Happy Metal Corporate Website JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const navbar = document.getElementById('navbar');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on init

    // 2. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 3. Language Switcher Dropdown (Simulation)
    const langBtn = document.getElementById('lang-btn');
    const langItems = document.querySelectorAll('.lang-item');

    langItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all items
            langItems.forEach(i => i.classList.remove('active'));
            // Add to current item
            item.classList.add('active');
            // Update button label
            langBtn.querySelector('span').textContent = item.textContent;
            
            // Simple notification or language toggling logic could be placed here
            console.log(`Language changed to: ${item.textContent}`);
        });
    });

    // 4. Product Catalog Filter System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    const filterProducts = (filterValue) => {
        productItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            // Apply animations
            item.style.opacity = '0';
            item.style.transform = 'scale(0.85)';
            
            setTimeout(() => {
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Re-trigger visual style
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            filterProducts(filterValue);
        });
    });

    // 5. Connect Brand Cards & Footer Links to Catalog Filters
    const brandCards = document.querySelectorAll('.brand-card, .brand-card-btn, .brand-filter-link');

    brandCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const brandId = card.getAttribute('data-brand');
            if (!brandId) return;

            // Find matching catalog filter button
            const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${brandId}"]`);
            
            if (targetFilterBtn) {
                // We are on catalog.html (the filter button exists)
                e.preventDefault();
                e.stopPropagation();
                
                // Trigger catalog filter click
                targetFilterBtn.click();
                
                // Smooth scroll to catalog section
                const catalogSection = document.getElementById('catalog');
                if (catalogSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const sectionTop = catalogSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: sectionTop,
                        behavior: 'smooth'
                    });
                }
            } else {
                // We are NOT on catalog.html (filter button doesn't exist)
                // Redirect to catalog.html with the query parameter
                e.preventDefault();
                window.location.href = `catalog.html?brand=${encodeURIComponent(brandId)}`;
            }
        });
    });

    // 6. Lightbox Modal for Product Details
    const lightbox = document.getElementById('product-lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDesc = document.getElementById('lightbox-desc');
        const lightboxBadge = document.getElementById('lightbox-badge');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

        const viewDetailButtons = document.querySelectorAll('.btn-view-detail, .product-img-wrapper');

        viewDetailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Find parent product item container
                const productItem = btn.closest('.product-item');
                if (!productItem) return;

                const title = productItem.getAttribute('data-title');
                const desc = productItem.getAttribute('data-desc');
                const imgPath = productItem.getAttribute('data-img');
                const category = productItem.getAttribute('data-category');
                
                // Map category key to readable badge name and color
                let badgeText = '';
                let badgeColor = '';
                
                switch (category) {
                    case 'happy-tools':
                        badgeText = 'Happy Tools';
                        badgeColor = 'var(--color-brand-tools)';
                        lightboxBadge.style.color = '#000';
                        break;
                    case 'happy-welding':
                        badgeText = 'Happy Welding';
                        badgeColor = 'var(--color-brand-welding)';
                        lightboxBadge.style.color = '#fff';
                        break;
                    case 'happy-caster':
                        badgeText = 'Happy Caster';
                        badgeColor = 'var(--color-brand-caster)';
                        lightboxBadge.style.color = '#fff';
                        break;
                    case 'happy-venus':
                        badgeText = 'Happy Venus';
                        badgeColor = 'var(--color-brand-venus)';
                        lightboxBadge.style.color = '#fff';
                        break;
                    default:
                        // Check specific names for other items
                        const badgeElem = productItem.querySelector('.product-badge');
                        badgeText = badgeElem ? badgeElem.textContent : 'Other';
                        badgeColor = '#64748b';
                        lightboxBadge.style.color = '#fff';
                }

                // Populate Lightbox data
                if (lightboxImg) {
                    lightboxImg.src = imgPath;
                    lightboxImg.alt = title;
                }
                if (lightboxTitle) lightboxTitle.textContent = title;
                if (lightboxDesc) lightboxDesc.textContent = desc;
                if (lightboxBadge) {
                    lightboxBadge.textContent = badgeText;
                    lightboxBadge.style.backgroundColor = badgeColor;
                }
                
                // Show lightbox modal
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable page scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable page scrolling
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
        
        // Close lightbox on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 7. Scroll Animations (Intersection Observer)
    const animElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .brand-card, .product-card, .about-img-area, .about-content-area, .channel-card, .info-box, .contact-form-area'
    );

    // Add CSS initial state class
    animElements.forEach(el => {
        el.classList.add('fade-in-up-scroll');
    });

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, observerOptions);

        animElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animElements.forEach(el => el.classList.add('appear'));
    }

    // 8. Handle Brand Query Parameters on Catalog Page Load
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    if (brandParam) {
        setTimeout(() => {
            const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${brandParam}"]`);
            if (targetFilterBtn) {
                targetFilterBtn.click();
                
                // Smooth scroll to catalog section
                const catalogSection = document.getElementById('catalog');
                if (catalogSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const sectionTop = catalogSection.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: sectionTop,
                        behavior: 'smooth'
                    });
                }
            }
        }, 150); // Small delay to let styles/DOM settle
    }

});
