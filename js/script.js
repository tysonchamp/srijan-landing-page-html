/**
 * SRIJAN - Main Javascript
 */

document.addEventListener("DOMContentLoaded", () => {

    // Navbar scroll effect
    const navbar = document.getElementById("mainNav");
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        };
        // Initial check
        onScroll();
        window.addEventListener("scroll", onScroll);
    }

    // Number Counter Animation via Intersection Observer
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; // lower is slower

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCount();
                observer.unobserve(counter); // Only animate once
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Geography Map highlight functions
window.highlightMap = function (blockId) {
    const nodes = document.querySelectorAll('.map-node');
    nodes.forEach(node => {
        if (node.id === 'map-' + blockId) {
            node.classList.add('active');
            node.querySelector('.node-pulse').style.animation = 'none'; // pause pulse
            node.querySelector('.node-pulse').style.transform = 'scale(1.5)';
        } else {
            node.style.opacity = '0.5';
        }
    });
};

window.resetMap = function () {
    const nodes = document.querySelectorAll('.map-node');
    nodes.forEach(node => {
        node.classList.remove('active');
        node.style.opacity = '1';
        node.querySelector('.node-pulse').style.animation = 'pulse 2s infinite';
        node.querySelector('.node-pulse').style.transform = '';
    });
};

// Before/After Slider Logic
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('sliderContainer');
    const beforeImage = document.getElementById('beforeImage');
    const beforeImgEl = document.getElementById('beforeImgEl');
    const handle = document.getElementById('sliderHandle');

    if (container && beforeImage && handle) {
        let isDragging = false;

        // Sync inner image width to container size properly
        const updateImageWidths = () => {
            if (beforeImgEl) {
                beforeImgEl.style.width = container.offsetWidth + 'px';
            }
        };

        // Run once & on resize
        updateImageWidths();
        window.addEventListener('resize', updateImageWidths);

        const moveSlider = (e) => {
            if (!isDragging) return;

            let rect = container.getBoundingClientRect();
            let x = e.clientX - rect.left;

            // touch support
            if (e.type.includes('touch')) {
                x = e.touches[0].clientX - rect.left;
            }

            // Clamp
            x = Math.max(0, Math.min(x, rect.width));

            // Calculate percentage
            let percent = (x / rect.width) * 100;

            beforeImage.style.width = percent + '%';
            handle.style.left = percent + '%';
        };

        // Mouse Events
        handle.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', moveSlider);

        // Touch Events
        handle.addEventListener('touchstart', () => isDragging = true, { passive: true });
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', moveSlider, { passive: true });
    }

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

});
