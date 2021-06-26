gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

var clipImageInterval;

const sections = document.querySelectorAll(".section");

function bodyLoad() {
    clipImageInterval = setInterval(() => {
        clipImage(".section-2", ".slide-image");
        clipImage(".section-3", ".slide-image");
        clipImage(".section-4", ".slide-image");
    }, 10);

    slideshow();

    hideScrollDown();

    scrollSnapping();

    ScrollTrigger.defaults({
        toggleActions: "restart none restart none",
    });

    addImageAnimation(".section-2", ".slide-image");
    addImageAnimation(".section-3", ".slide-image");
    addImageAnimation(".section-4", ".slide-image");

    addTextAnimation(".section-2", ".slide-text");
    addTextAnimation(".section-3", ".slide-text");
    addTextAnimation(".section-4", ".slide-text");
}

function slideshow() {
    const sliderTL = gsap.timeline({ repeat: -1 });
    const slides = document.querySelectorAll(".slideshow-slide");
    const lineTL = gsap.timeline({ repeat: -1 });
    const lines = document.querySelectorAll(".slide-line");

    lineTL
        .from(lines[0], { duration: 0.3, x: 0 })
        .to(lines[0], { duration: 2.7, x: 2000 });
    lineTL
        .from(lines[1], { duration: 0.3, y: 0 })
        .to(lines[1], { duration: 2.7, y: -2000 });
    lineTL
        .from(lines[2], { duration: 0.3, x: 0 })
        .to(lines[2], { duration: 2.7, x: -2000 });
    lineTL
        .from(lines[3], { duration: 0.3, y: 0 })
        .to(lines[3], { duration: 2.7, y: 2000 });

    slides.forEach((slide) => {
        sliderTL
            .from(slide, { duration: 1, opacity: 0 })
            .to(slide, { duration: 2 });
    });
}

function checkBottom() {
    const bottomElement = document.querySelector("main").lastElementChild;
    let footerBottom = bottomElement.getBoundingClientRect().bottom;
    if (footerBottom < window.innerHeight) {
        var y =
            footerBottom +
            window.pageYOffset -
            document.documentElement.clientHeight;
        window.scrollTo(window.scrollX, y);
    }
}

function clipImage(parent, selector) {
    const slideImageWrapper = document
        .querySelector(parent)
        .querySelector(".slide-image-wrapper");
    const slideImage = slideImageWrapper.querySelector(selector);

    let bottomWrapper = slideImageWrapper.getBoundingClientRect().bottom;
    let bottomImage = slideImage.getBoundingClientRect().bottom;

    let rightWrapper = slideImageWrapper.getBoundingClientRect().right;
    let rightImage = slideImage.getBoundingClientRect().right;

    slideImage.style.clipPath = `inset(0 ${rightImage - rightWrapper}px ${
        bottomImage - bottomWrapper
    }px 0`;
}

function addImageAnimation(triggerElement, selector) {
    gsap.to(triggerElement + " " + selector, {
        scrollTrigger: {
            trigger: triggerElement,
        },
        delay: 0.5,
        x: -30,
        opacity: 1,
        duration: 2,
        ease: "back.out(2)",
    });
}

function addTextAnimation(triggerElement, selector) {
    gsap.to(triggerElement + " " + selector, {
        scrollTrigger: {
            trigger: triggerElement,
        },
        delay: 0.5,
        x: 30,
        opacity: 1,
        duration: 1,
        ease: "back.out(2)",
    });
}

function hideScrollDown() {
    const scrollDown = document.querySelector(".scroll-down-text");
    gsap.to(scrollDown, {
        scrollTrigger: {
            trigger: scrollDown,
            toggleActions: "restart none reverse none",
            start: "bottom 80%",
        },
        y: "1000%",
        duration: 0.75,
        ease: "none",
    });
}

function goToSection(section) {
    gsap.to(window, {
        scrollTo: {
            y: section,
            autokill: false,
        },
        duration: 1,
    });
}

function scrollSnapping() {
    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            toggleClass: "active",
            end: "bottom top+=1",
            onEnter: () => goToSection(section),
            onEnterBack: () => goToSection(section),
        });
    });
}
