// Define the variables
const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');

// Functions
const loadData = () => {
    const searchData = searchField.value;
    const apiLink = `https://openapi.programming-hero.com/api/phones?search=${searchData}`;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchData}`)
        .then(res => res.json())
        .then(data => showData(data))
}

const showData = (phones) => {
    console.log(phones);
    phones.data.forEach(phone => {
        const results = document.getElementById('results') 
        const phoneContainer = document.createElement('div');
        phoneContainer.classList.add = 'col';
        phoneContainer.innerHTML = `
        <div class="card h-100">
            <img src=${phone.image} class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand : ${phone.brand}</p>
            </div>
        </div>`;
        results.appendChild(phoneContainer);
    })
}


// Event Handlers
searchBtn.addEventListener('click', loadData);

