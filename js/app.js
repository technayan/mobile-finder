// Define the variables
const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');

// Functions
const loadData = () => {
    const searchData = searchField.value;
    const apiLink = `https://openapi.programming-hero.com/api/phones?search=${searchData}`;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchData}`)
        .then(res => res.json())
        .then(data => console.log(data))
}



// Event Handlers
searchBtn.addEventListener('click', loadData);

