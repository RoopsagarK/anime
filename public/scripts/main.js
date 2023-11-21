const searchItem = document.querySelector("#search");
const form = document.querySelector("#searchForm");
const exploreButton = document.querySelector(".cta-button");

exploreButton.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#cards').scrollIntoView({ behavior: 'smooth' });
});

form.addEventListener("submit", (event) => {
    searchItem.value = "";
});

const kebabCase = string => string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();