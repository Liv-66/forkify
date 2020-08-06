export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    resultsLink: document.querySelector('.results__link'),
    shoppingList: document.querySelector('.shopping__list'),
    likesList: document.querySelector('.likes__list')
    
};

export const elementStrings = {
    loader: 'loader',
    linkActive: 'results__link--active'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}

/*
// not child
export const clearHighlightSelected = () => {
    const highlight = document.querySelector(`.results__link--active`);
    if (highlight) {
        highlight.parentElement.removeChild(highlight);
    }
    
};
*/