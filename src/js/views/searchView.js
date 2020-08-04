import { elements } from './base';


export const highlightSelected = id => {
    const arrResults = Array.from(document.querySelectorAll('.results__link'));
    arrResults.forEach(e => e.classList.remove('results__link--active'));
    // `a[href="#${id}"]`
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};




const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; // const => push array, object
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => { // split => array
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0); // 0 is the initial value of the accumulate
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

// type = 'next' or 'prev'
const creatButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'next' ? page + 1 : page - 1}">
        <span>Page ${type === 'next' ? page + 1 : page - 1}</span>    
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left'}"></use>
        </svg>
    </button>
`

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage); // to the next integer 

    let button;
    if (page === 1) {
        // Button to go to next page
        button = creatButton(page, 'next');
    } else if (page === pages) {
        // Button to go to prev page
        button = creatButton(page, 'prev');
    } else {
        // Both buttons
        button = `
            ${creatButton(page, 'prev')}
            ${creatButton(page, 'next')}
        `
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 6) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resPerPage);
};