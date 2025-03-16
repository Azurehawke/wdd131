import recipes from './recipes.mjs';

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomListEntry(list) {
  const randomIndex = getRandomNumber(list.length);
  return list[randomIndex];
}

function recipeTemplate(recipe) {
  return `
    <img src="${recipe.image}" alt="${recipe.name}">
    <div class="recipe-details">
      ${tagsTemplate(recipe.tags)}
      <h2>${recipe.name}</h2>
      ${ratingTemplate(recipe.rating)}
      <p class="description">${recipe.description}</p>
    </div>
  `;
}

function tagsTemplate(tags) {
  const tagItems = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  return `<div class="tags">${tagItems}</div>`;
}

function ratingTemplate(rating) {
  let html = `
    <span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
  `;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function renderRecipes(recipeList) {
  const outputElement = document.querySelector('#recipe-output');
  let html;
  if (recipeList.length === 0) {
    html = `<p class="no-results">Sorry, we couldn't find any recipes matching your search.</p>`;
  } else {
    html = recipeList.map(recipe => recipeTemplate(recipe)).join('');
  }
  outputElement.innerHTML = html;
}

function filterRecipes(query) {
  const filtered = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(query);
    const descMatch = recipe.description.toLowerCase().includes(query);
    const tagMatch = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const ingredMatch = recipe.ingredients?.find(ing => ing.toLowerCase().includes(query));
    return nameMatch || descMatch || tagMatch || ingredMatch;
  });
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
  e.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const query = searchInput.value.toLowerCase();
  const filteredRecipes = filterRecipes(query);
  renderRecipes(filteredRecipes);
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

init();
document.querySelector('#search-btn').addEventListener('click', searchHandler);