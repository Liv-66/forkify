import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader, clearHighlightSelected } from './views/base';
/**
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

window.state = state;

/**
 * Search controller
 */
const controlSearch = async () => {
    // get the query from view
    const query = elements.searchInput.value;

    if(query) {
        // new search object and add to state
        state.search = new Search(query);

        // prepare UI for results
        elements.searchInput.value = '';
        elements.searchResList.innerHTML = '';
        renderLoader(elements.searchRes);

        try {
            // search for recipes
            await state.search.getResults();
    
            // render the results on UI
            clearLoader();
            searchView.renderResults(state.search.results);
        } catch (err) {
            alert('Something wrong with search');
            clearLoader();
        }
    
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto);
        elements.searchResList.innerHTML = '';
        elements.searchResPages.innerHTML = '';
        searchView.renderResults(state.search.results, goToPage);
    }
})


/**
 * Recipe controller
 */

const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.replace('#', ''); // string can replace

    if (id) {
        // Prepare UI for change
        elements.recipe.innerHTML = '';
        renderLoader(elements.recipe);

        // Highlight selected search item
        if(state.search) {
            searchView.highlightSelected(id);
        }

        // Creat new recipe object
        state.recipe = new Recipe(id);


        try {
            // Get recipe data and parse indegrients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients(); 
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();           

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);


        } catch (err) {
            alert ('Something wrong with recipe');
        }

    }
    


};

//window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));


/**
 * List controller
 */
const controlList = () => {
    // Creat List
    if(!state.list) {
        state.list = new List();
    }

    // Add Item
    state.recipe.ingredients.forEach(e => {
        const item = state.list.addItem(e.count, e.unit, e.ingredient);
        // Render Item
        listView.renderItem(item);
    })

};


// 

elements.recipe.addEventListener('click', e => {
    // * => any child of the element
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1)
        state.recipe.updateServings('dec');
        recipeView.updataServingsIngredients(state.recipe);
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updataServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn-list, .recipe__btn-list *')) {
        controlList();
    }   
})

elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-btn')) {
        const value = parseFloat(e.target.value);
        state.list.updataCount(id, value);
    }

});