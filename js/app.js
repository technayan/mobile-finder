//****** Define the variables ******\\

const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');
const results = document.getElementById('results');
const spinner = document.getElementById('spinner');

//****** Functions ******\\


// Load Data Function
const loadData = () => {

    // Show Spinner
    spinner.style.display = 'block';

    results.innerText = "";
    const searchData = searchField.value;
    if (searchData.length > 0) {
        const apiLink = `https://openapi.programming-hero.com/api/phones?search=${searchData}`;
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchData}`)
            .then(res => res.json())
            .then(data => showData(data))
    } else {
        spinner.style.display = 'none';

        // Error Message Function Calling
        errorMessage('Please, enter a brand name!')
    }
    
}

// Show Data Function
const showData = (phones) => {
    if (phones.data.length > 0) {
        const resultsQnt = phones.data;
        if (resultsQnt.length > 20) {
            const firstTwenty = resultsQnt.slice(0,20);
            console.log(firstTwenty);
            firstTwenty.forEach(phone => {

                // Show Phon On UI Function Calling
                showPhone(phone);
            })

        } else {
            resultsQnt.forEach(phone => {

                // Show Phon On UI Function Calling
                showPhone(phone);
            })
        }
    } else {
        spinner.style.display = 'none';

        // Error Message Function Calling
        errorMessage('No mobile found!')
    }
    
}

// Show Phone on UI Function
const showPhone = (phone) => {
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

    spinner.style.display = 'none';
    results.appendChild(phoneContainer); 
}


// Error Message Function 
const errorMessage = (errorText) => {
    const message = document.createElement('h3');
    message.classList.add('text-center', 'mx-auto', 'text-danger');
    message.innerText = errorText;
    results.appendChild(message);
}



//****** Event Handlers ******\\
searchBtn.addEventListener('click', loadData);



