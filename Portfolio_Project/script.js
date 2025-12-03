// HERO TEXT ANIMATION
gsap.from(".hero-left .one", {
    opacity: 0,
    y: 50,
    duration: 1
});

gsap.from(".hero-left .two", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3
});

gsap.from(".hero-left .btn", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.6,
    stagger: 0.2
});

gsap.from(".hero-right img", {
    opacity: 0,
    x: 100,
    duration: 1.2,
    delay: 0.4
});


// NAVBAR ANIMATION
gsap.from("nav", {
    opacity: 0,
    y: -40,
    duration: 1
});


// PROJECT SECTIONS SCROLL ANIMATION
gsap.utils.toArray(".project").forEach((proj) => {
    gsap.from(proj, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        scrollTrigger: {
            trigger: proj,
            start: "top 85%",
        }
    });
});


// FOOTER ANIMATION
gsap.from("footer", {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
        trigger: "footer",
        start: "top 90%"
    }
});


// BUTTON HOVER EFFECT (subtle scale)
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.08, duration: 0.2 });
    });

    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.2 });
    });
});
