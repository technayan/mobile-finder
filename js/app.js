//****** Define the variables ******\\

const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');
const results = document.getElementById('results');
const spinner = document.getElementById('spinner');

//****** Functions ******\\


// Load Data Function
const loadData = () => {
    // Single Phone Details Remove
    document.querySelector('.single-phone').style.display = "none";
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
        <div class="card-body phone-desc d-md-flex text-center text-md-start justify-content-between align-items-center">
            <div>
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand : ${phone.brand}</p>
            </div>
            <button onclick="singleDataLoad('${phone.slug}')" class="btn btn-primary mt-3 mt-md-0" id="phone-btn">Explore</button>
        </div>
    </div>`;

    spinner.style.display = 'none';
    results.appendChild(phoneContainer); 
}

const singleDataLoad = (phoneId) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(single => singlePhoneDetails(single))
}

const singlePhoneDetails = (single) => {
    document.querySelector('.single-phone').style.display = "block";
    console.log(single);
    const singlePhone = document.getElementById('single-phone-details');
    singlePhone.innerHTML = `
    <div class="col-md-4 text-center">
        <img src="${single.data.image}" alt="" class="mt-3 mb-5 my-md-0 w-75">
    </div>
    <div class="col-md-8">
        <h2>${single.data.name}</h2>
        <p>Brand: <span>${single.data.brand}</span></p>
        <p>Release Date: <span>${single.data.releaseDate}</span></p>
        

            <h5>Features:</h5>
            <table class="table">
                <tbody>
                <tr>
                    <td>Storage:</td>
                    <td class="feature">${single.data.mainFeatures.storage}</td>
                </tr>
                <tr>
                    <td>Display Size:</td>
                    <td class="feature">${single.data.mainFeatures.displaySize}</td>
                </tr>
                <tr>
                    <td>Chipset:</td>
                    <td class="feature">${single.data.mainFeatures.chipSet}</td>
                </tr>
                <tr>
                    <td>Memory:</td>
                    <td class="feature">${single.data.mainFeatures.memory}</td>
                </tr>
                <tr>
                    <td>Sensor:</td>
                    <td class="feature">${single.data.mainFeatures.sensors}</td>
                </tr>
                </tbody>
            </table>
            <h5>Others:</h5>
            <table class="table">
                <tbody>
                <tr>
                    <td>WLAN:</td>
                    <td class="feature">${single.data?.others?.WLAN}</td>
                </tr>
                <tr>
                    <td>Bluetooth:</td>
                    <td class="feature">${single.data?.others?.Bluetooth}</td>
                </tr>
                <tr>
                    <td>GPS:</td>
                    <td class="feature">${single.data?.others?.GPS}</td>
                </tr>
                <tr>
                    <td>NFC:</td>
                    <td class="feature">${single.data?.others?.NFC}</td>
                </tr>
                <tr>
                    <td>Radio:</td>
                    <td class="feature">${single.data?.others?.Radio}</td>
                </tr>
                <tr>
                    <td>USB:</td>
                    <td class="feature">${single.data?.others?.USB}</td>
                </tr>
                </tbody>
            </table>
        
        
    </div>
    `;
    window.scrollTo(0, 0);
    console.log(single.data.name);
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



