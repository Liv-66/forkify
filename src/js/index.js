import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/**
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};



/**
 * Search controller
 */
const controlSearch = async () => {
    // get the query from view
    const query = elements.searchInput.value;
    console.log(query);

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

            
            console.log(state.recipe);

        } catch (err) {
            alert ('Something wrong with recipe');
        }

    }
    


};

//window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));