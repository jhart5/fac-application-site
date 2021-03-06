// set navIcons height

const navIcons = document.getElementsByClassName("nav-icons");
const setNavHeight = () => {  // dynamically resizes navIcons on browser resize

    let navWidth = navIcons[0].clientWidth;
    navIcons[0].style.height = navWidth + "px";
    for (let i = 0; i < navIcons.length; i++)  { 
        navIcons[i].style.height = navWidth + "px"; // always circular
    }
}

setNavHeight();
window.addEventListener("resize", setNavHeight);



//navIcons make big and blue on hover                      //replaced with transform: scale in CSS


/* const navMouseOverAboutMe = () => {
    let aboutMeWidth = aboutMe.clientWidth;
    aboutMe.style.height = aboutMeWidth + "px";
}
const navMouseOverWhyProgramming = () => {
    let whyProgrammingWidth = whyProgramming.clientWidth;
    whyProgramming.style.height = whyProgrammingWidth + "px";
}
const navMouseOverWhyFac = () => {
    let whyFacWidth = whyFac.clientWidth;
    whyFac.style.height = whyFacWidth + "px";
}
const navMouseOverContactMe = () => {
    let contactMeWidth = contactMe.clientWidth;
    contactMe.style.height = contactMeWidth + "px";
}

aboutMe.addEventListener("mouseover", navMouseOverAboutMe);
aboutMe.addEventListener("mouseout", navMouseOverAboutMe);
whyProgramming.addEventListener("mouseover", navMouseOverWhyProgramming);
whyProgramming.addEventListener("mouseout", navMouseOverWhyProgramming);
whyFac.addEventListener("mouseover", navMouseOverWhyFac);
whyFac.addEventListener("mouseout", navMouseOverWhyFac);
contactMe.addEventListener("mouseover", navMouseOverContactMe);
contactMe.addEventListener("mouseout", navMouseOverContactMe); */

const aboutMeIcon = document.getElementById('about-me-icon');
const whyProgrammingIcon = document.getElementById('why-programming-icon');
const whyFacIcon = document.getElementById('why-fac-icon');
const contactMeIcon = document.getElementById('contact-me-icon');

const aboutMe = document.getElementById("about-me");
const whyProgramming = document.getElementById("why-programming")
const whyFac = document.getElementById("why-fac");
const contactMe = document.getElementById("contact-me");

//navIcon show/hide sections

const toggleAboutMe = () => {
    whyProgramming.style.display = "none";
    whyFac.style.display = "none";
    contactMe.style.display = "none";
    aboutMe.style.display = (aboutMe.style.display === "flex") ? "none" : "flex";
}
const toggleWhyProgramming = () => {;
    aboutMe.style.display = "none";
    whyFac.style.display = "none";
    contactMe.style.display = "none";
    whyProgramming.style.display = (whyProgramming.style.display === "flex") ? "none" : "flex";
}
const toggleWhyFac = () => {
    aboutMe.style.display = "none";
    whyProgramming.style.display = "none";
    contactMe.style.display = "none";
    whyFac.style.display = (whyFac.style.display === "flex") ? "none" : "flex";
}
const toggleContactMe = () => {  
    aboutMe.style.display = "none";
    whyProgramming.style.display = "none";
    whyFac.style.display = "none";
    contactMe.style.display = (contactMe.style.display === "flex") ? "none" : "flex";
}

aboutMeIcon.addEventListener("click", toggleAboutMe);
whyProgrammingIcon.addEventListener("click", toggleWhyProgramming);
whyFacIcon.addEventListener("click", toggleWhyFac);
contactMeIcon.addEventListener("click", toggleContactMe);





//declare carousel variables

const carouselSlide = document.querySelector(".my-slides");
const images = document.querySelectorAll(".my-slides img");
console.log(images) //testing

// counter
let counter = 1;
let scrollWidth;
window.addEventListener("load", () => {
        aboutMe.style.display = "flex";                             //show section to take width for a split second
        scrollWidth = images[1].clientWidth;
        aboutMe.style.display = "none";                             // hide section again
        carouselSlide.style.transform = "translateX(" + -scrollWidth * counter + "px)"; //translate to first 'real' image in album
});

window.addEventListener('resize', () => {
        scrollWidth = images[0].clientWidth                         // adjust width varable accordingly
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; // translate the correct distance to whichever image counter is up to.
});


//transition slide functions
const transitionSlideForward = () => { 
    if (document.hidden) return;  // disables the function if user is on another tab. Stops loop bug with transitionEnd event listener
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter++;
    carouselSlide.style.transform = "translateX(" + -scrollWidth * counter + "px)";
   

}

const transitionSlideBackward= () => { 
    if (document.hidden) return;
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter--;
    carouselSlide.style.transform = "translateX(" + -scrollWidth * counter + "px)";
}


//PlayPause button text change

const button = document.getElementById('playpause');

// const changeText = () => {
//     if (button.innerText === "PLAY") {
//         button.innerText = "PAUSE";
//     } else {
//         button.innerText = "PLAY";
//     }
// }

const changeText = () => {
    button.innerText = (button.innerText === "PLAY" ? "PAUSE" : "PLAY");  //use the ternary operator!
}

//PlayPause button main function

let loopVar; // will play when page loads by default


const playPause = () => {
    if (button.innerText == "PLAY") {
        loopVar = setInterval(transitionSlideForward, 3000);  // reassign loopVar to initial value when "Play" is pressed.
    } else {
        clearInterval(loopVar);        // clear loopVar interval when "Pause" is pressed
    }
}

//stop carousel if 'About Me' is hidden

const playOnDisplay = () => {
    if(aboutMe.style.display !== "flex" || button.innerText == "PLAY") {
        clearInterval(loopVar);
    } else {
        loopVar = setInterval(transitionSlideForward, 3000);
    }
}

document.getElementById("nav-icons-container").addEventListener("click", playOnDisplay)



//PlayPause button invoke functions
button.addEventListener("click", playPause);
button.addEventListener("click", changeText);

//Add functionality to next image / previous image buttons

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let myVar = true; // this is used to set the prev/next button time outs.

const forwardResetTimer = () => { // function to slide forward and reset auto loop.
    if (myVar === true) {
        transitionSlideForward();
        myVar = false;
        setTimeout(function(){ myVar = true }, 650); // disables button for 600ms to ensure transition is completed before next transition.
    }
    if (button.innerText == "PAUSE"){
        clearInterval(loopVar);
        loopVar = setInterval(transitionSlideForward, 3000);

    }
}

const backwardResetTimer = () => {//function to slide backward and reset auto loop
    if (myVar === true) {
        transitionSlideBackward();
        myVar = false;
        setTimeout(function(){ myVar = true }, 650);
    }
    if (button.innerText == "PAUSE"){
        clearInterval(loopVar);
        loopVar = setInterval(transitionSlideForward, 3000);
        
    }
}
nextBtn.addEventListener("click", forwardResetTimer);
prevBtn.addEventListener("click", backwardResetTimer);


// add keyboard functionality to carousel

const keyboardNav = (e) => {
    if (e.keyCode == "37") { // if left arrow key
        backwardResetTimer(); // do the same thing as hitting prev button
    } else if (e.keyCode == "39") { // if right arrow key
        forwardResetTimer(); // same as forward button
    }
}

window.addEventListener('keydown', keyboardNav); //listens for arrow key presses and invokes function

// Clone image loop. Add event listener for end of transition

carouselSlide.addEventListener("transitionend", () => { // waits until transition is complete before doing anything
    if (images[counter].id == "last-clone") {  // if we are on our clone
        carouselSlide.style.transition = 'none'; // remove transition effects 
        counter = images.length - 2; 
        carouselSlide.style.transform = "translateX(" + -scrollWidth * counter + "px)"; // and jump immediately to picture clone was cloned from
    }
    if (images[counter].id == "first-clone") {
        carouselSlide.style.transition = 'none';
        counter = 1;
        carouselSlide.style.transform = "translateX(" + -scrollWidth * counter + "px)";
    }
});