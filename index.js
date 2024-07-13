let slideIndex = 0;
let prevSlideIndex = -1;
let isReversing = false;
let slideInterval;

// Initialize the slideshow
showSlides();

// Function to control next and previous slides
function plusSlides(n) {
    pauseSlides(); // Pause slideshow when manual control is used
    isReversing = n < 0;
    prevSlideIndex = slideIndex;
    showSlides(slideIndex += n);
}

// Function to control current slide
function currentSlide(n) {
    pauseSlides(); // Pause slideshow when manual control is used
    isReversing = n - 1 < slideIndex;
    prevSlideIndex = slideIndex;
    showSlides(slideIndex = n - 1);
}

// Function to pause slideshow
function pauseSlides() {
    clearInterval(slideInterval);
}

// Function to resume slideshow
function resumeSlides() {
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000); // Change slide every 5 seconds
}

// Function to display slides
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("offer-item");
    let dots = document.getElementsByClassName("dot");

    // Wrap around when reaching end of slides
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    // Hide all slides and reset classes
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" active", "").replace(" inactive", "").replace(" active-reverse", "").replace(" inactive-reverse", "");
        slides[i].style.display = "none";
    }

    // Handle previous slide animation
    if (prevSlideIndex !== -1) {
        slides[prevSlideIndex].style.display = "block";
        slides[prevSlideIndex].className += isReversing ? " inactive-reverse" : " inactive";
    }

    // Handle current slide animation
    slides[slideIndex].style.display = "block";
    slides[slideIndex].className += isReversing ? " active-reverse" : " active";

    // Update active dot
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex].className += " active";

    // Reset slideshow timer
    pauseSlides(); // Clear any existing timer
    resumeSlides(); // Start slideshow with updated timing
}
