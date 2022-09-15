var key = "6a6JVHNStMU8IAISdlfEMqHVnbEgPOj6rgTjAsCpON0KlwmiuN";
var secretKey = "Ys6MIVZGQRdpPHPkn63BCZpxnrCm9LzfJBkUsi4I";
var token



var info = document.querySelector("#information");

var catForm = document.querySelector("#cat-form");


catForm.addEventListener("submit", fetchCats);

function fetchCats(event) {
    event.preventDefault();

    var zipCode = document.querySelector("#zip-code").value;
    
    
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        body:"grant_type=client_credentials&client_id=" + key + "&client_secret=" + secretKey, 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          } 
     
    })
    .then((response) => response.json())
    .then((data) => {
      token = data.access_token;
    })
    .then(() => {
        fetch(`https://api.petfinder.com/v2/animals?type=cat&location=${zipCode}`,
        {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          })

          .then((response) => response.json())
          .then((data) => displayCats(data.animals));
        })  
     

};

function displayCats(cats) {
    console.log(cats)
    var info = document.querySelector("#information");
    info.innerHTML = "";

    for (var i = 0; i <= 17; i++) {
        var catInfo = cats[i];
        createCatCards(catInfo);
    }
};

var createCatCards = function (cat) {
    console.log(cat)
    //picture of cat
    var catPic = document.createElement("div")
    // if (cat.photos[0]= null) {
    //     catPic.innerHTML = '<img src = assets/images/cat-5.gpeg>'
    // }
    catPic.innerHTML = `<img src="${cat.photos[0] ? cat.photos[0].medium : ""}"/>`
    

    //getting name of cat
    var catName = document.createElement("h3");
    catName.innerHTML = "My name is " + `${cat.name}`;

    //getting age of cat
    var catAge = document.createElement("h4");
    catAge.innerHTML = "I'm " + `${cat.age}`;

    //getting cat's gender
    var catGender = document.createElement("h4");
    catGender.innerHTML = "Gender: " + `${cat.gender}`;

    //gettin cat breed
    var catBreed = document.createElement("h4");
    catBreed.innerHTML = "Breed: " + `${cat.breeds.primary}`

    //email for more info
    var catPhone = document.createElement("p");
    catPhone.innerHTML = "My phone number: " + `${cat.contact.phone}`;


    var cardSection = document.createElement("div");
    
    cardSection.appendChild(catName);
    cardSection.appendChild(catAge);
    cardSection.appendChild(catGender);
    cardSection.appendChild(catBreed);
    cardSection.appendChild(catPhone);

    var catCard = document.createElement("div")
    catCard.classList.add("card")
    catCard.appendChild(catPic);
    catCard.appendChild(cardSection);
    var catCell = document.createElement("div")
    catCell.classList.add("cell", "small-4");
    catCell.appendChild(catCard);
   
    
    info.classList.add("grid-x")
    info.appendChild(catCell);

}    


// random cat fact API
let catFact;
const getData = () => {
    fetch("https://meowfacts.herokuapp.com/?count=3")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        catFact = data.data;
        document.getElementById("facts").innerHTML = `
        <div>
        ${catFact[0]}
        </div>
        `;
    });
    };

document.getElementById("button").addEventListener("click", getData);

