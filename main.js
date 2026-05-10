// Перемикання мови
function changeLanguage(lang) {
    document.querySelectorAll('[data-ua]').forEach(el => {
        el.textContent = lang === 'ua' ? el.getAttribute('data-ua') : el.getAttribute('data-en');
    });
    document.getElementById('btn-ua').classList.toggle('active', lang === 'ua');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.body.classList.toggle('lang-ua', lang === 'ua');
}

// Music
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.classList.remove('muted');
    } else {
        music.pause();
        musicBtn.classList.add('muted');
    }
}

music.volume = 0.4;
music.play().catch(() => {
    // Браузер заблокував — запускаємо при першому дотику
    document.addEventListener('click', () => {
        music.play();
        musicBtn.classList.remove('muted');
    }, { once: true });
    musicBtn.classList.add('muted');
});

document.addEventListener('DOMContentLoaded', () => {
    // Reveal при скролі
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal-hidden').forEach(el => observer.observe(el));

    // Анімація лінії таймлайну
    const line = document.querySelector('.tl-center-line');
    if (line) {
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) line.classList.add('drawn');
            });
        }, { threshold: 0.1 });
        lineObserver.observe(line);
    }

    // Паралакс на hero при скролі
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.setProperty('--parallax', `${scrolled * 0.3}px`);
        }
    });
});
