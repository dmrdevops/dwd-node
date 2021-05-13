// Define elements
const navbar = document.getElementById("navbar");
const navHeight = navbar.clientHeight;
const welcome = document.getElementById("welcome");
const chevron = document.querySelector(".chevron");
const typewriter = document.querySelector('.typewriter')
const dwd = document.getElementById('DWD');
const dwd2 = document.getElementById('DWD2');
const dwd3 = document.getElementById('DWD3');
const flicker = document.querySelector('.flicker')
const intro = document.getElementById('intro')
const headerGroup = document.getElementById('header-group')

dwd2.onanimationend = (e) => {
  if(e.animationName === 'flicker-last') {
    headerGroup.style.display = 'none';
    intro.style.display = 'flex'
  } 
}


// Listen for page load and create an observer on viewport
window.addEventListener('load', (event) => createObserver(), false);
function createObserver() {
  // Set-up options for observer
  let optionRoot = {
    root: null,
    rootMargin: "0px"
  }
// Construct new observers
let rootObserver = new IntersectionObserver(rootIntersect, optionRoot);
// Telling new observers to observe welcome section
rootObserver.observe(welcome);
}
function rootIntersect(entries, rootObserver) {
  entries.forEach(entry => { 
    if(!entry.isIntersecting) {
/*       navbar.style.top = "0";
      navbar.style.position = "fixed";
      navbar.style.backgroundColor = "#131112"; */
      chevron.style.display = "flex";
   } else {
/*     navbar.style.backgroundColor = "#1311128a";
    navbar.style.position = "sticky";
    navbar.style.top = "2vh"; */
    chevron.style.display = "none";
   }
  })
};


/* window.addEventListener('resize', typeWidth());
function typeWidth() {
  const shWidth = window.getComputedStyle(subheading, null).width
  typewriter.style.width = shWidth
  console.log(shWidth)
} */


// Modal
const techImg = document.querySelectorAll(".tech-logo");
const modal = document.getElementById("certModal");
const displayCert = document.getElementById("display-cert");

techImg.forEach((img) => img.addEventListener("click", toggleModal));
modal.addEventListener("click", toggleModal);

function toggleModal(e) {
  let path = e.target.getAttribute("data-certSrc");
  displayCert.src = path;
  let modalActive = window.getComputedStyle(modal, null).display;
  if (modalActive == "none" && path) {
    modal.style.display = "flex";
    navbar.style.display = "none";
  } else {
    modal.style.display = "none";
    navbar.style.display = "flex";
  }
}
