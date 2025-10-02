console.log("script.js loaded");




// Create the "Back to Top" button
// learnt from: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
const button = document.createElement("button");
button.innerText = "↑ Top";
button.id = "backToTop";
document.body.appendChild(button);


button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.padding = "25px 15px";
button.style.fontSize = "16px";
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.background = "#0d0d0c";
button.style.color = "#fff";
button.style.cursor = "pointer";
button.style.display = "none"; // Hidden by default.. and only appears when you scroll
button.style.zIndex = "1000";

// Show the button only when scrolling down
window.addEventListener("scroll", () => {
  button.style.display = window.scrollY > 300 ? "block" : "none";
});

// Smooth scroll to top when clicked
button.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// this adds a small zoom effect to all images on hover
document.querySelectorAll("img").forEach(img => {
    img.style.transition = "transform 0.3s"; // smooth animation
    img.addEventListener("mouseenter", () => img.style.transform = "scale(1.05)");
    img.addEventListener("mouseleave", () => img.style.transform = "scale(1)");
  });

/* Typewriter Effect for My Name (keeps the space visible) */

//https://www.w3schools.com/howto/howto_js_typewriter.asp
const nameEl = document.querySelector("h1");
if (nameEl) {
  const fullText = "MANMEET\u00A0SAGRI"; // \u00A0 = non-breaking space //CHATGPT HELPED TO SOLVE THIS ISSUE
  nameEl.textContent = ""; // clear first
  let i = 0;

  (function type() {
    if (i < fullText.length) {
      nameEl.textContent += fullText[i];
      i++;
      setTimeout(type, 150);
    }
  })();
}
