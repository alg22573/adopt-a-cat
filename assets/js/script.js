

var catForm = document.querySelector("#cat-form");



catForm.addEventListener("submit", fetchCats);

function fetchCats(event) {
    event.preventDefault();

    var zipCode = document.querySelector("#zip-code").value;
    console.log(zipCode)

}