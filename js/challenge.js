"use strict";

// Auto-increment counter every second
let playing = true;
let interval = startCounter();

function startCounter() {
    return setInterval(() => {
        const counter = document.getElementById("counter");
        counter.innerText = parseInt(counter.innerText) + 1;
    }, 1000);
}

// Get DOM elements
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
const pause = document.getElementById("pause");
const commentForm = document.getElementById("comment-form");

// Decrease counter
minus.addEventListener("click", () => {
    const counter = document.getElementById("counter");
    counter.innerText = parseInt(counter.innerText) - 1;
});

// Increase counter
plus.addEventListener("click", () => {
    const counter = document.getElementById("counter");
    counter.innerText = parseInt(counter.innerText) + 1;
});

// Like button functionality
heart.addEventListener("click", () => {
    const counter = document.getElementById("counter");
    const counterValue = parseInt(counter.innerText);
    const likesList = document.querySelector(".likes");

    let existingLike = document.querySelector(`[data-num='${counterValue}']`);

    if (existingLike) {
        let likeCount = existingLike.querySelector("span");
        likeCount.innerText = parseInt(likeCount.innerText) + 1;
        existingLike.innerHTML = `${counterValue} has been liked <span>${likeCount.innerText}</span> times`;
    } else {
        let newLike = document.createElement("li");
        newLike.setAttribute("data-num", counterValue);
        newLike.innerHTML = `${counterValue} has been liked <span>1</span> time`;
        likesList.appendChild(newLike);
    }
});

// Pause/Resume functionality
pause.addEventListener("click", () => {
    if (playing) {
        playing = false;
        clearInterval(interval);
        pause.innerText = "Resume";
    } else {
        playing = true;
        interval = startCounter();
        pause.innerText = "Pause";
    }

    // Disable other buttons when paused
    document.querySelectorAll("button").forEach((button) => {
        if (button.id !== "pause") button.disabled = !playing;
    });
});

// Comment submission
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const commentInput = event.target.querySelector("input");
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        const commentSection = document.querySelector(".comments");
        const commentElement = document.createElement("p");
        commentElement.innerText = commentText;
        commentSection.appendChild(commentElement);
        commentInput.value = ""; // Clear input field
    }
});
