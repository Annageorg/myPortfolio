//Mouse circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
    mouseCircleBool &&
        (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`)
    
    mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};
//End of Mouse circle

// Animated Circles
const circles = document.querySelectorAll('.circle')
const mainImg = document.querySelector('.main-circle img')

let mX = 0;
let mY = 0;
const z = 100;
const animateCircles = (e, x, y) => {
    if (x < mX) {
        circles.forEach((circle) => {
            circle.style.left = `${z}px`
        })
        mainImg.style.left = `${z}px`
    } else if (x > mX) {
        circles.forEach((circle) => {
            circle.style.left = `-${z}px`
        })
        mainImg.style.left = `-${z}px`
    }
    if (y < mY) {
        circles.forEach((circle) => {
            circle.style.top = `${z}px`
        })
        mainImg.style.top = `${z}px`
    } else if (y > mY) {
        circles.forEach((circle) => {
            circle.style.top = `-${z}px`
        })
        mainImg.style.top = `-${z}px`
    }
    mX = e.clientX;
    mY = e.clientY;
}
// End of Animated Circles

let hoveredElPosition = []

const stickyElement = (x, y, hoveredEl) => {
    // Sticky Element
    if (hoveredEl.classList.contains("sticky")) {
        hoveredElPosition.length < 1 &&
            (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft])

        hoveredEl.style.cssText = `top: ${y}px; left: ${x}px;`

        if (hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
            hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
            hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
            hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
        ) {
            hoveredEl.style.cssText = ""
            hoveredElPosition = []
        }
        hoveredEl.onmouseleave = () => {
            hoveredEl.style.cssText = ""
            hoveredElPosition = []
        }
    }
    // End of Sticky Element
}

// Mouse circle transform
const mouseCircleTransform = (hoveredEl) => {
    if (hoveredEl.classList.contains('pointer-enter')) {
        hoveredEl.onmousemove = () => {
            mouseCircleBool = false
            mouseCircle.style.cssText = `
                width: ${hoveredEl.getBoundingClientRect().width}px;
                height: ${hoveredEl.getBoundingClientRect().height}px;
                top: ${hoveredEl.getBoundingClientRect().top}px;
                left: ${hoveredEl.getBoundingClientRect().left}px;
                opacity: 1;
                transform: translate(0, 0);
                animation: none;
                border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
                transition: width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s`
        }
        hoveredEl.onmouseleave = () => {
            mouseCircleBool = true
        }
        document.onscroll = () => {
            if (!mouseCircleBool) {
                mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`
            }
        }
    }
}
// End of Mouse circle transform

document.body.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    mouseCircleFn(x, y);
    animateCircles(e, x, y);

    const hoveredEl = document.elementFromPoint(x, y)
    stickyElement(x, y, hoveredEl)
    mouseCircleTransform(hoveredEl)
});

document.body.addEventListener('mouseleave', (e) => {
    mouseCircle.style.opacity = '0';
    mouseDot.style.opacity = '0';
})

// Main button
const mainBtns = document.querySelectorAll('.main-btn')


mainBtns.forEach(btn => {
    let ripple;
    btn.addEventListener('mouseenter', (e) => {
        const left = e.clientX - e.target.getBoundingClientRect().left;
        const top = e.clientY - e.target.getBoundingClientRect().top;

        ripple = document.createElement('div')
        ripple.classList.add('ripple')
        ripple.style.left = `${left}px`
        ripple.style.top = `${top}px`
        btn.prepend(ripple)
    })
    btn.addEventListener('mouseleave', () => {
        btn.removeChild(ripple)
    })
})
// End of Main button

// Progress bar
const sections = document.querySelectorAll('section')
const progressBar = document.querySelector('.progress-bar')
const halfCircles = document.querySelectorAll('.half-circle')
const halfCircleTop = document.querySelector('.half-circle-top')
const progressBarCircle = document.querySelector('.progress-bar-circle')

const progressBarFn = () => {
    const pageViewportHeight = window.innerHeight
    const pageHeight = document.documentElement.scrollHeight
    const scrolledPortion = window.pageYOffset

    const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewportHeight)) * 360

    halfCircles.forEach((el) => {
        el.style.transform = `rotate(${scrolledPortionDegree}deg)`

        if (scrolledPortionDegree >= 180) {
            halfCircles[0].style.transform = 'rotate(180deg)'
            halfCircleTop.style.opacity = "0"
        } else {
            halfCircleTop.style.opacity = "1"
        }
    })

    const scrollBool = scrolledPortion + pageViewportHeight === pageHeight
    // Progress bar click
    progressBar.onclick = (e) => {
        e.preventDefault()

        const sectionPositions = Array.from(sections).map((section) => {
            return scrolledPortion + section.getBoundingClientRect().top
        })

        const position = sectionPositions.find((sectionPosition) => {
            return sectionPosition > scrolledPortion
        })

        scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position)
    }
    // End of Progress bar click

    // Rotate  arrow
    if (scrollBool) {
        progressBarCircle.style.transform = "rotate(180deg)"
    } else {
        progressBarCircle.style.transform = "rotate(0deg)"
    }
    // End of Rotate  arrow
}
progressBarFn();
// End of Progress bar

// Navigation
const menuIcon = document.querySelector('.menu-icon')
const navbar = document.querySelector('.navbar')

const scrollFn = () => {
    menuIcon.classList.add('show-menu-icon')
    navbar.classList.add('hide-navbar')
    if (window.scrollY === 0) {
        menuIcon.classList.remove('show-menu-icon')
        navbar.classList.remove('hide-navbar')
    }
    progressBarFn()
}

document.addEventListener('scroll', scrollFn)
menuIcon.addEventListener('click', () => {
    menuIcon.classList.remove('show-menu-icon')
    navbar.classList.remove('hide-navbar')
})
// End of Navigation

// About me text
const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTextContent = `I am an MEng, MSc, MPhil mechanical engineer. As my next step, I am pursuing a career change to Software Development and I am looking for roles where I can put my strengths to use to help people.`;

Array.from(aboutMeTextContent).forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    aboutMeText.appendChild(span);

    span.addEventListener('mouseenter', (e) => {
        e.target.style.animation = 'aboutMeTextAnim 15s infinite'
    })
})
// End of About me text

// Projects
const projects = document.querySelectorAll('.project');

projects.forEach((project, i) => {
    project.addEventListener('mouseenter', () => {
        project.firstElementChild.style.top =
            `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`
    })
    project.addEventListener('mouseleave', () => {
        project.firstElementChild.style.top = '2rem'
    })
    i >= 6 &&
        (project.style.cssText = "display: none; opacity: 0;")

})

// Projects button
const section3 = document.querySelector('.section-3')
const projectsBtn = document.querySelector('.projects-btn')
const projectsBtnText = document.querySelector('.projects-btn span')
let showHideBool = true;

const showProjects = (project, i) => {
    setTimeout(() => {
        project.style.display = "flex";
        section3.scrollIntoView({ block: "end" });
    }, 600);

    setTimeout(() => {
        project.style.opacity = "1";
    }, i * 200);
};

const hideProjects = (project, i) => {
    setTimeout(() => {
        project.style.display = "none";
        section3.scrollIntoView({ block: "end" });
    }, 1200);

    setTimeout(() => {
        project.style.opacity = "0";
    }, i * 100);
};

projectsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

    showHideBool
        ? (projectsBtnText.textContent = "Show Less")
        : (projectsBtnText.textContent = "Show More");

    projects.forEach((project, i) => {
        i >= 6 &&
            (showHideBool ? showProjects(project, i) : hideProjects(project, i));
    });
    showHideBool = !showHideBool;
});
// End of Projects button

// End of Projects

// Section 4 
// Form 
const formHeading = document.querySelector('.form-heading')
const formInputs = document.querySelectorAll('.contact-form-input')

formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
        formHeading.style.opacity = '0'
        setTimeout(() => {
            formHeading.textContent = `Your ${input.placeholder}`
            formHeading.style.opacity = '1'
        }, 300)
    })
    input.addEventListener('blur', () => {
        formHeading.style.opacity = '0'
        setTimeout(() => {
            formHeading.textContent = `Let's Talk`
            formHeading.style.opacity = '1'
        }, 300)
    })
})

// **************************Form submission
let form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    let status = document.getElementById("my-form-status");
    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        status.innerHTML = "Thank you for your submission!";
        status.classList.add('my-form-status')
        form.reset()
    }).catch(error => {
        status.innerHTML = "Oops! Something went wrong"
    });
}
form.addEventListener("submit", handleSubmit)
// End of Form 

// Slideshow
const slideshow = document.querySelector('.slideshow')
setInterval(() => {
    const firstIcon = slideshow.firstElementChild
    firstIcon.classList.add('faded-out')

    const secondIcon = slideshow.children[2]
    secondIcon.classList.add('light')
    secondIcon.previousElementSibling.classList.remove('light')

    setTimeout(() => {
        slideshow.removeChild(firstIcon)
        slideshow.appendChild(firstIcon)

        setTimeout(() => {
            firstIcon.classList.remove('faded-out')
        }, 500)

    }, 500)

}, 5000)
// End of Slideshow
// End of Section 4 

