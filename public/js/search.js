const searchKey = decodeURI(location.pathname.split('/').popup());

const searchSpanElement = document.querySelector('#search-key');
searchSpanElement.innerHTML = searchKey;