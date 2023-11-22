import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

iziToast.settings({
  position: "topRight",
});

const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const contentEl = document.querySelector(".cat-info");

selectEl.addEventListener("input", onSelect);

fetchBreeds()
  .then(breeds => {
    selectEl.innerHTML = breeds
      .map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      })
      .join("");
    selectEl.classList.remove("hidden");
  })
  .catch(err => {
    iziToast.error({
      message: err.message,
    });
    errorEl.classList.remove("hidden");
  })
  .finally(() => {
    loaderEl.classList.add("hidden");
  });

function onSelect(event) {
  const breedId = event.target.value;
  loaderEl.classList.remove("hidden");
  fetchCatByBreed(breedId)
    .then(({ url, description, name, temperament }) => {
      contentEl.innerHTML = `
        <img src="${url}" alt="a cat of ${name} breed" width="500px" />
        <div class="textblock">
            <h1 class="title">${name}</h1>
            <p class="text">${description}</p>
            <p class="text"><span class="bold">Temperament: </span>${temperament}</p>
        </div>
      `;
      contentEl.classList.remove("hidden");
      errorEl.classList.add("hidden");
    })
    .catch(err => {
      iziToast.error({
        message: err.message,
      });
      contentEl.classList.add("hidden");
      errorEl.classList.remove("hidden");
    })
    .finally(() => {
      loaderEl.classList.add("hidden");
    });
}
