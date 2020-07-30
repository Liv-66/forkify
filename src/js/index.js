import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
/**
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

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

        // search for recipes
        await state.search.getResults();

        // render the results on UI
        clearLoader();
        searchView.renderResults(state.search.results);
    
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


