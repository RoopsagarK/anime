const searchItem = document.querySelector("#search");
const form = document.querySelector("#searchForm");
const exploreButton = document.querySelector(".cta-button");
const card = document.querySelector(".card");
const goto = document.querySelector(".goto");

exploreButton.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#cards').scrollIntoView({ behavior: 'smooth' });
});

const kebabCase = string => string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

card.addEventListener("click", function(){
    goto.click();
});