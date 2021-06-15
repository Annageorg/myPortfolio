//Mouse circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x, y) => {
    mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
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

document.body.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
  
    mouseCircleFn(x, y);
    animateCircles(e, x, y);
});

document.body.addEventListener('mouseleave' , (e) => {
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
        ripple.style.left=`${left}px`    
        ripple.style.top=`${top}px`
        btn.prepend(ripple)    
    })
    btn.addEventListener('mouseleave', () => {
        btn.removeChild(ripple)
    })
})


// End of Main button

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
        (project.style.cssText ="display: none; opacity: 0;")
    
})

// Projects button
const section3 = document.querySelector('.section-3')
const projectsBtn = document.querySelector('.projects-btn')
const projectsBtnText = document.querySelector('.projects-btn span')
let showHideBool = true;

projectsBtn.addEventListener('click', (e) => {
    e.preventDefault()

    projectsBtn.firstElementChild.nextElementSibling.classList.toggle('change')

    projects.forEach((project, i) => {
        if (i >= 6) {
            if (showHideBool){
                setTimeout(() => {
                    project.style.display = "flex"
                    section3.scrollIntoView({ block: "end" })
                }, 600)
                setTimeout(() => {
                    project.style.opacity = "1"
                }, i*200)

                projectsBtnText.textContent = 'Show Less'
            } else {
                setTimeout(() => {
                    project.style.display = "none"
                }, 1200)
                setTimeout(() => {
                    project.style.opacity = "0"
                }, i*100)
                projectsBtnText.textContent = 'Show More'
            }
        }
    })
    showHideBool = !showHideBool
})
// End of Projects button

// End of Projects

