import View from './View.js'
import icons from 'url:../../img/icons.svg'; 


class PaginationView extends View {
    _parentEl = document.querySelector('.pagination');


    addHandlerClick(handler) {
      this._parentEl.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--inline');
        if(!btn) return;
        const goToPage = +btn.dataset.goto   
        handler(goToPage)
      })
    }


    _generateMarkupBtn(prev) {
      if(prev) {
      return `
        <button data-goto=${this._data.page - 1} class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page -1}</span>
        </button>
        ` 
      } else {
        return `
        <button data-goto=${this._data.page + 1} class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `
      }
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const curPage = this._data.page;

        
        // Page 1, and there are other pages
        if(curPage === 1 && numPages > 1) {
           return this._generateMarkupBtn()
        }

        // Last page
        if(curPage === numPages && numPages > 1) {
           return this._generateMarkupBtn('prev')
        }

        // Other page
        if(curPage < numPages) {
          return ['prev',''].map(hand => this._generateMarkupBtn(hand)); 

        }

        // Page 1, and there are NO other pages
          return  '' ;
      

    }
}

export default new PaginationView()