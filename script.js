const menubar = document.querySelector('#menu');
const Navbar = document.querySelector('.navbar');
const section = document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a');
const projectCards = document.querySelectorAll('.project-card');

menubar.onclick = () => {

    menubar.classList.toggle('bx-x');
    Navbar.classList.toggle('active');

};

window.onscroll = () => {

    section.forEach(sec => {

        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top > offset && top < offset + height) {

            sec.classList.add('start-animation');

            navlink.forEach(links => {

                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

            });

        }

    });

    var header = document.querySelector('.header');

    header.classList.toggle('sticky', window.scrollY > 100);
    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active');

};

const animateProjects = () => {

    const scrollPosition = window.scrollY + window.innerHeight;

    projectCards.forEach(card => {

        const cardTop = card.getBoundingClientRect().top + window.scrollY;
        const cardHeight = card.offsetHeight;
        
        if (scrollPosition > cardTop + cardHeight / 3) {

            card.classList.add('show-project');

        } else {

            card.classList.remove('show-project');

        }

    });

};


window.addEventListener('scroll', animateProjects);
window.addEventListener('load', animateProjects);

document.getElementById('contactButton').addEventListener('click', function() {

    window.open('https://wa.me/19998221360/?text=Olá, gostaria de mais informações sobre seu trabalho!', '_blank');

});

document.addEventListener('DOMContentLoaded', function () {

    const socialMediaLinks = [

        {
            class: 'bxl-instagram',
            href: 'https://www.instagram.com/lehhofman/'
        },
        {
            class: 'bxl-github',
            href: 'https://github.com/lehhofman'
        },
        {
            class: 'bxl-linkedin',
            href: 'https://www.linkedin.com/in/leticia-hofman-202955299/'
        }

    ];

    socialMediaLinks.forEach(link => {

        const element = document.querySelector(`.bx.${link.class}`);

        if (element) {

            element.addEventListener('click', () => {

                window.open(link.href, '_blank');

            });

        }

    });

});

document.addEventListener('DOMContentLoaded', function () {

    const button = document.querySelector('.btnr');

    button.addEventListener('click', function () {

        window.open('./assets/Currículo-Leh.pdf', '_blank');

    });
    
});