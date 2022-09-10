const { response } = import("express");
const res = import("express/lib/response");

let hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})


document.querySelectorAll(".nav-link").forEach(n => n.
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))


/* Quotes */
const quote = document.querySelector('#quote');
const btn = document.querySelector('#btn')
btn.addEventListener('click', randomQuote)

function randomQuote(){
    fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data =>{
        quote.innerHTML = `"${data.content}"`;

    })
}
window.addEventListener("load", getQuote);