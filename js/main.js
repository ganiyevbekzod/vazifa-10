let elCard = document.querySelector(".card");
let elCards = document.querySelector(".cards");
let elTemplate = document.querySelector(".js-template").content;
let elImg = document.querySelector(".card-img-top");
let ElInput = document.querySelector(".js-input");
let ElForm = document.querySelector(".js-form");
let elTitle = document.querySelector(".card-title");
let elPopular = document.querySelector(".popular");
let elCapital = document.querySelector(".capital");
let elRegion = document.querySelector(".region");
let ElSelect = document.querySelector(".js-select");

const fragment = document.createDocumentFragment();

// Fetch

const renderCountres = (array, node) => {
  elCards.innerHTML = "";
  array.forEach((item) => {
    const newTemplate = elTemplate.cloneNode(true);
    newTemplate.querySelector(".card-title").textContent = item.name.common;
    newTemplate.querySelector(".card-img-top").src = item.flags.svg;
    // elTitle.textContent=el.name.common;
    newTemplate.querySelector(".popular").textContent =
      "Population:" + " " + item.population;
    newTemplate.querySelector(".capital").textContent =
      "Population:" + " " + item.capital;
    newTemplate.querySelector(".region").textContent =
      "Population:" + " " + item.region;
    // elCapital.textContent="Capital:"+elTitle.capital;
    fragment.appendChild(newTemplate);
  });

  node.appendChild(fragment);
  ElInput.value = "";
};

// Select option
function optionFunc(array, node) {
  let sets = new Set();
  array.forEach((item) => {
    sets.add(item.region);
  });

  sets.forEach((item) => {
    let newOption = document.createElement("option");
    newOption.textContent = item;
    node.append(newOption);
  });
}

async function countries() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let data = await response.json();
  renderCountres(data, elCards);
  optionFunc(data, ElSelect);
}
countries();

// Input Sort
// function InputSort(array, node) {
ElForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  let sorted = await fetch(
    `https://restcountries.com/v3.1/name/${ElInput.value.trim()}`
  );
  let sortedResult = await sorted.json();
  sortedResult.forEach((item) => {
    if (item.name.common.toLowerCase().includes(ElInput.value.toLowerCase())) {
      renderCountres(sortedResult, elCards);
    }
  });
});
// }


// Select
ElSelect.addEventListener("change", async (evt) => {
  let responseSelect = await fetch(
    `https://restcountries.com/v3.1/region/${ElSelect.value}`
  );
  let datas = await responseSelect.json();

  renderCountres(datas, elCards);
});
