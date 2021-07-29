//Remove intro elements after tv-effect animation
const dwd = document.getElementById("DWD");
dwd.addEventListener("animationend", (e) => {
  if (e.animationName === "tv-effect") {
    return (dwd.style.display = "none");
  } // else nothing
});

const chevron = document.querySelector(".chevron");
/* const subheading = document.getElementById("subheading");
const typewriter = document.querySelector(".typewriter"); */

// Change navbar opacity when scrolled out of welcome section
/* const changeOpacity = () => {
  const windowHeight = window.innerHeight; //Viewport height
  const scrollPosition = window.scrollY; //Viewport scroll height
  if(scrollposition >= windowHeight - navHeight) {
    navbar.style.backgroundColor = "#131112";
  } else {
    navbar.style.backgroundColor = "#1311128a";
  }
}; */
/* 
// Listen for page load and create an observer on viewport
window.addEventListener("load", (event) => createObserver(), false);
function createObserver() {
  // Set-up options for observer
  let optionRoot = {
    root: null,
    rootMargin: "0px",
  };
  // Construct new observers
  let rootObserver = new IntersectionObserver(rootIntersect, optionRoot);
  // Telling new observers to observe welcome section
  rootObserver.observe(welcome);
}
function rootIntersect(entries, rootObserver) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
            navbar.style.top = "0";
      navbar.style.position = "fixed";
      navbar.style.backgroundColor = "#131112";
      chevron.style.display = "flex";
    } else {
          navbar.style.backgroundColor = "#1311128a";
    navbar.style.position = "sticky";
    navbar.style.top = "2vh";
      chevron.style.display = "none";
    }
  });
} */

/* window.addEventListener("resize", typeWidth());
function typeWidth() {
  const shWidth = window.getComputedStyle(subheading, null).width;
  typewriter.style.width = shWidth;
  console.log(shWidth);
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