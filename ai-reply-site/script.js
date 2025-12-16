// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navCta = document.querySelector('.nav-cta');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navCta.classList.toggle('active');
});

// FAQ 展开/收起功能
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // 关闭其他展开的项
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // 切换当前项
        item.classList.toggle('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // 考虑固定的导航栏高度

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // 关闭移动端菜单
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navCta.classList.remove('active');
        }
    });
});

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 添加阴影效果
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// 按钮点击效果
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // 创建涟漪效果
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // 如果按钮已经有涟漪，移除旧的
        const oldRipple = this.querySelector('.ripple');
        if (oldRipple) {
            oldRipple.remove();
        }

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 场景卡片悬停效果增强
const scenarioCards = document.querySelectorAll('.scenario-card');

scenarioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 角色卡片选择效果
const roleCards = document.querySelectorAll('.role-card');

roleCards.forEach(card => {
    card.addEventListener('click', function() {
        // 移除其他卡片的选中状态
        roleCards.forEach(otherCard => {
            otherCard.classList.remove('selected');
        });

        // 添加选中状态
        this.classList.add('selected');

        // 获取角色名称
        const roleName = this.querySelector('h3').textContent;

        // 可以在这里添加处理逻辑，比如更新价格表或示例
        console.log('选中的角色：', roleName);
    });
});

// 价格卡片悬停效果
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('recommended')) {
            this.style.transform = 'translateY(-5px)';
        }
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('recommended')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有section添加观察
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
});

// CTA按钮点击处理
document.querySelectorAll('.btn-primary, .nav-cta').forEach(button => {
    if (button.textContent.includes('体验') || button.textContent.includes('试用')) {
        button.addEventListener('click', () => {
            // 这里可以添加跳转到试用页面的逻辑
            alert('正在跳转到试用页面...');
        });
    }
});

// 模拟实时用户数（可选）
function updateActiveUsers() {
    const baseUsers = 2847;
    const variation = Math.floor(Math.random() * 100) - 50;
    const activeUsers = baseUsers + variation;

    // 如果页面有显示用户数的元素
    const userCountElement = document.querySelector('.user-count');
    if (userCountElement) {
        userCountElement.textContent = activeUsers.toLocaleString();
    }
}

// 每30秒更新一次用户数
// setInterval(updateActiveUsers, 30000);

// 输入框焦点效果
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s';
    });

    element.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// 添加涟漪效果的CSS样式
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    button {
        position: relative;
        overflow: hidden;
    }

    .role-card.selected {
        border-color: var(--primary-color) !important;
        background: var(--secondary-color);
    }

    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-cta.active {
            display: block;
            position: absolute;
            top: 180px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1001;
        }
    }
`;
document.head.appendChild(style);