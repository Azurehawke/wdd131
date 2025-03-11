document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector('#search-input').value;
    console.log('Search term:', searchTerm);
});