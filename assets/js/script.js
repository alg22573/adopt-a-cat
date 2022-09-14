var key = "6a6JVHNStMU8IAISdlfEMqHVnbEgPOj6rgTjAsCpON0KlwmiuN";
var secretKey = "Ys6MIVZGQRdpPHPkn63BCZpxnrCm9LzfJBkUsi4I";
var token

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
    .then((res) => res.json())
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

          .then((res) => res.json())
          .then((data) => console.log(data));
        })  
        
        
        
    

};