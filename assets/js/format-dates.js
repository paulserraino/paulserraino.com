document.addEventListener('DOMContentLoaded', main, false);

function main () {
    formatDates();
};

function formatDates() {
    if ( !moment ) return;

    var dates = [].slice.call( document.querySelectorAll('[data-date]') );
    dates.forEach( onDate );

    function onDate( date ) {
        date.innerText = moment( date.getAttribute('data-date') ).fromNow();
    };
};
