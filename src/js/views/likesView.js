import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const renderLikes = recipe => {
    const markup = `
        <li>
            <a class="likes__link" href="#${recipe.id}">
                <figure class="likes__fig">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="likes__author">${recipe.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const toggleLikeButton = islike => {
    const likeString = islike ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${likeString}`);
}


export const deleteLike = id => {
    const like = document.querySelector(`.likes__link[href="#${id}"]`);
    if(like) like.parentElement.parentElement.removeChild(like.parentElement);
};
