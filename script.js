
// Get all navigation links
const navLinks = document.querySelectorAll(".nav-links a");

// GET ALL CLICKABLE ELEMENTS
const openButtons = document.querySelectorAll(".open-modal");

// GET ALL MODALS
const modals = document.querySelectorAll(".modal-overlay");


// OPEN MODAL
openButtons.forEach(element => {

    element.addEventListener("click", function() {

        const modalId = this.getAttribute("data-modal");

        const modal = document.getElementById(modalId);

        if (modal) {
            modal.classList.add("active");
        }

    });

});


// CLOSE BUTTONS
document.querySelectorAll(".close-modal").forEach(button => {

    button.addEventListener("click", function() {

        this.closest(".modal-overlay").classList.remove("active");

    });

});


// CLOSE WHEN CLICKING OUTSIDE
modals.forEach(modal => {

    modal.addEventListener("click", function(e) {

        if (e.target === modal) {
            modal.classList.remove("active");
        }

    });

});


// CLOSE USING ESCAPE KEY
document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {

        modals.forEach(modal => {
            modal.classList.remove("active");
        });

    }

});


// FORM SUBMISSION
document.getElementById("contactForm").addEventListener("submit", function(e) {

    e.preventDefault();

    alert("Thank you for contacting me!");

    this.reset();

    document.getElementById("contactModal").classList.remove("active");

});


// Add click event to each link
navLinks.forEach(link => {
    link.addEventListener("click", function() {

        // Remove active class from all links
        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        // Add active class to selected link
        this.classList.add("active");

    });
});


// GET DRAGON ELEMENTS

const dragon = document.getElementById("dragon");

const speech = document.getElementById("speech");

const textElements = document.querySelectorAll (
    "h2, h3, p"
)


textElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        const message = element.getAttribute("data-message");

        if (message) {
            speech.textContent = message;
        }

        dragon.classList.add("talking");

    });

    element.addEventListener("mouseleave", () => {

        dragon.classList.remove("talking");

        // // CLEAR TEXT SPEECH CONTENT
        speech.textContent = "Hi! Welcome! 👋";
    });

});

// CLICK TO BREATHE FIRE

dragon.addEventListener("click", function() {

    // Start fire

    dragon.classList.add("breathing");

    // Change greeting

    speech.textContent = "ARAY MO! 🔥";


    // Stop fire after 2 seconds

    setTimeout(function() {

        dragon.classList.remove("breathing");

        speech.textContent = "Hi! Welcome! 👋";

    }, 2000);

});


// MOUSE ENTER

dragon.addEventListener("mouseenter", function() {

    speech.textContent = "RAWR! 🔥";

});


// MOUSE LEAVE

dragon.addEventListener("mouseleave", function() {

    if (!dragon.classList.contains("breathing")) {

        speech.textContent = "Hi! Welcome! 👋";

    }

});

