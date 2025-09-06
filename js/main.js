document.addEventListener('DOMContentLoaded', () => {
    // 初始化背景粒子
    initParticles();
    // 初始化打字机效果
    initTypingEffect();
    // 初始化滚动动画
    initScrollAnimations();
    // 初始化表单提交
    initContactForm();
});

// 背景粒子效果
function initParticles() {
    const container = document.body;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#64ffda';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animation = `float ${Math.random() * 10 + 15}s linear infinite`;
        particle.style.animationDelay = `-${Math.random() * 10}s`;
        container.appendChild(particle);
    }
}

// 打字机效果
function initTypingEffect() {
    const text = document.querySelector('.typing-text');
    const content = text.textContent;
    text.textContent = '';
    text.style.opacity = '1';

    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < content.length) {
            text.textContent += content.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// 滚动动画
function initScrollAnimations() {
    const header = document.querySelector('header');
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // 监听卡片元素
    cards.forEach(card => observer.observe(card));

    // 导航栏滚动效果
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;

        // 添加导航栏背景
        if (currentScroll > 50) {
            header.style.background = 'rgba(10, 25, 47, 0.95)';
            header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        } else {
            header.style.background = 'rgba(10, 25, 47, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 表单提交
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.innerHTML = '发送中... <span class="terminal-arrow">▶</span>';

        // 模拟表单提交
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 这里应该是实际的表单提交逻辑
        const success = Math.random() > 0.5; // 模拟成功/失败

        if (success) {
            submitButton.innerHTML = '发送成功 <span class="terminal-arrow">✓</span>';
            submitButton.style.borderColor = 'var(--secondary-color)';
            submitButton.style.color = 'var(--secondary-color)';
            form.reset();
        } else {
            submitButton.innerHTML = '发送失败 <span class="terminal-arrow">✗</span>';
            submitButton.style.borderColor = '#ff6b6b';
            submitButton.style.color = '#ff6b6b';
        }

        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '发送消息 <span class="terminal-arrow">▶</span>';
            submitButton.style.borderColor = '';
            submitButton.style.color = '';
        }, 3000);
    });
}