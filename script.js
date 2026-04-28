// 加载动画
window.addEventListener('DOMContentLoaded', function() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.classList.add('fade-out');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // 回到顶部按钮显示/隐藏
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // 导航栏活动状态
    updateNavActiveState();
});

// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// 页面滚动动画
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.section-title, .about-content, .skill-item, .project-item, .contact-content, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始化滚动动画元素
function initScrollAnimation() {
    const elements = document.querySelectorAll('.section-title, .about-content, .skill-item, .project-item, .contact-content, .stat-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// 数字动画
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current) + '+';
        }, 16);
    });
}

// 技能过滤功能
function initSkillFilter() {
    const skillFilterBtns = document.querySelectorAll('.skills-filter .filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            skillItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 300);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 项目过滤功能 - 已移除
// function initProjectFilter() {
//     const projectFilterBtns = document.querySelectorAll('.projects-filter .filter-btn');
//     const projectItems = document.querySelectorAll('.project-item');
//     
//     projectFilterBtns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             projectFilterBtns.forEach(b => b.classList.remove('active'));
//             this.classList.add('active');
//             
//             const filter = this.getAttribute('data-filter');
//             
//             projectItems.forEach(item => {
//                 if (filter === 'all' || item.getAttribute('data-category') === filter) {
//                     item.classList.remove('hidden');
//                     setTimeout(() => {
//                         item.style.display = 'block';
//                     }, 300);
//                 } else {
//                     item.classList.add('hidden');
//                     setTimeout(() => {
//                         item.style.display = 'none';
//                     }, 300);
//                 }
//             });
//         });
//     });
// }

// 回到顶部按钮
function initBackToTop() {
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 按钮波纹效果
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn, .nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 导航栏活动状态
function updateNavActiveState() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// 表单提交处理
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 简单验证
            if (!name || !email || !subject || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 邮箱验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // 模拟表单提交
            alert('消息已发送！我们会尽快回复您。');
            contactForm.reset();
        });
    }
}

// 图片加载错误处理
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/150';
        this.alt = '图片加载失败';
    });
});

// 监听技能 section 进入视口
const skillsSection = document.getElementById('skills');
const aboutSection = document.getElementById('about');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'skills') {
                animateSkillBars();
                observer.unobserve(skillsSection);
            } else if (entry.target.id === 'about') {
                animateNumbers();
                observer.unobserve(aboutSection);
            }
        }
    });
}, { threshold: 0.5 });

// 页面加载完成后执行
window.addEventListener('load', function() {
    // 初始化滚动动画
    initScrollAnimation();
    handleScrollAnimation();

    // 初始化过滤器
    initSkillFilter();
    // initProjectFilter(); // 已移除作品集过滤功能

    // 初始化其他功能
    initBackToTop();
    initButtonRipple();
    initContactForm();
    
    // 观察元素
    observer.observe(skillsSection);
    observer.observe(aboutSection);
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScrollAnimation);
});

// 添加按钮波纹样式
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 鼠标跟随粒子效果
function initMouseFollower() {
    const mouseFollower = document.getElementById('mouseFollower');
    const hero = document.querySelector('.hero');
    
    if (!mouseFollower || !hero) return;
    
    let particles = [];
    const maxParticles = 50;
    
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 创建新粒子
        createParticle(x, y);
    });
    
    function createParticle(x, y) {
        if (particles.length >= maxParticles) {
            const oldParticle = particles.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.parentNode.removeChild(oldParticle);
            }
        }
        
        const particle = document.createElement('div');
        particle.className = 'mouse-particle';
        
        // 随机大小
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // 随机颜色
        const colors = [
            'rgba(255, 182, 193, 0.8)',
            'rgba(255, 192, 203, 0.8)',
            'rgba(255, 105, 180, 0.8)',
            'rgba(248, 165, 194, 0.8)',
            'rgba(255, 20, 147, 0.6)',
            'rgba(219, 112, 147, 0.7)',
            'rgba(255, 255, 255, 0.7)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 ${size * 2}px ${randomColor}`;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        mouseFollower.appendChild(particle);
        particles.push(particle);
        
        // 动画
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        let scale = 1;
        
        function animate() {
            posX += vx * 0.016;
            posY += vy * 0.016;
            opacity -= 0.02;
            scale -= 0.01;
            
            if (opacity <= 0 || scale <= 0) {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
                const index = particles.indexOf(particle);
                if (index > -1) {
                    particles.splice(index, 1);
                }
                return;
            }
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }
    
    // 触摸设备支持
    hero.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const rect = hero.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        createParticle(x, y);
    });
}

// 页面加载完成后初始化鼠标跟随
window.addEventListener('load', function() {
    // ... 现有代码 ...
    initMouseFollower();
});

// 添加鼠标粒子样式
const mouseParticleStyle = document.createElement('style');
mouseParticleStyle.textContent = `
    .mouse-follower {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 3;
        overflow: hidden;
    }
    
    .mouse-particle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        animation: none;
    }
`;
document.head.appendChild(mouseParticleStyle);