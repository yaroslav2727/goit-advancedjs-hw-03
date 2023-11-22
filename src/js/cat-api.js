import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_4cGo7pfpOk2mCrYNuFxrzN4x9Tr8FpKtStGbwBmJipn0B1TW87rAnmh8GPepxKDN";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds").then(res => {
    return res.data.map(el => {
      return {
        name: el.name,
        id: el.id,
      };
    });
  });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(res => {
    if (!res.data.length) {
      throw new Error("Chosen breed doesn't exist!");
    }
    const { url, breeds } = res.data[0];
    return {
      url,
      description: breeds[0].description,
      name: breeds[0].name,
      temperament: breeds[0].temperament,
    };
  });
}
