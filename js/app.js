// Define the variables
const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');
const results = document.getElementById('results');
const loadMoreBtn = document.getElementById('load-more-btn');

// Functions
const loadData = () => {
    results.innerText = "";
    const searchData = searchField.value;
    const apiLink = `https://openapi.programming-hero.com/api/phones?search=${searchData}`;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchData}`)
        .then(res => res.json())
        .then(data => showData(data))
}

const showData = (phones) => {
    const resultsQnt = phones.data;
    console.log(resultsQnt);
    if (resultsQnt.length > 20) {
        const firstTwenty = resultsQnt.slice(0,20);
        console.log(firstTwenty);
        firstTwenty.forEach(phone => {
            const phoneContainer = document.createElement('div');
            phoneContainer.classList.add = 'col';
            phoneContainer.innerHTML = `
            <div class="card h-100">
                <img src=${phone.image} class="card-img-top phone-img my-3 mx-auto w-50" alt="${phone.phone_name}">
                <div class="card-body phone-desc d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">Brand : ${phone.brand}</p>
                    </div>
                    <button class="btn btn-primary" id="phone-btn">Explore</button>
                </div>
            </div>`;
            results.appendChild(phoneContainer); 
            
        })


        loadMoreBtn.style.display = 'block'; 


        loadMoreBtn.addEventListener('click', loadMoreData);

        let afterTwenty = resultsQnt.slice(20,resultsQnt.length );

        function loadMoreData() {
            
            
            afterTwenty.forEach(phone => {
                const phoneContainer = document.createElement('div');
                phoneContainer.classList.add = 'col';
                phoneContainer.innerHTML = `
                <div class="card h-100">
                    <img src=${phone.image} class="card-img-top phone-img my-3 mx-auto w-50" alt="${phone.phone_name}">
                    <div class="card-body phone-desc d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">Brand : ${phone.brand}</p>
                        </div>
                        <button class="btn btn-primary" id="phone-btn">Explore</button>
                    </div>
                </div>`;
                results.appendChild(phoneContainer); 
                loadMoreBtn.style.display = 'none';
            })
            afterTwenty = [];
        }



    } else {
        resultsQnt.forEach(phone => {
            const phoneContainer = document.createElement('div');
            phoneContainer.classList.add = 'col';
            phoneContainer.innerHTML = `
            <div class="card h-100">
                <img src=${phone.image} class="card-img-top phone-img my-3 mx-auto w-50" alt="${phone.phone_name}">
                <div class="card-body phone-desc d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">Brand : ${phone.brand}</p>
                    </div>
                    <button class="btn btn-primary" id="phone-btn">Explore</button>
                </div>
            </div>`;
            results.appendChild(phoneContainer); 
        })
    }

    
}




// Event Handlers
searchBtn.addEventListener('click', loadData);



