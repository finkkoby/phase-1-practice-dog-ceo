//Global variables
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const dropdown = document.querySelector("select#breed-dropdown");
const breedList = document.querySelector("#dog-breeds");

//Execute on page load
function init(e) {
    images(e);
    breeds(e);
}

//Add event listeners
document.addEventListener("DOMContentLoaded", init);

dropdown.addEventListener("change", sort2)

//Functions
function images(e) {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(object => {
        let linkArray = object.message;
        for (let link of linkArray) {
            let newImage = document.createElement("img")
            newImage.src = link;
            let imageContainer = document.querySelector("#dog-image-container")
            imageContainer.appendChild(newImage);
        }
    })
}
function breeds(e) {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(object => {
        let breedObj = object.message;
        for (let breed in breedObj) {
            let newBreed = document.createElement("li");
            newBreed.innerText = breed;
            newBreed.className = newBreed.innerText[0];
            breedList.appendChild(newBreed);
            if(breedObj[breed].length >= 1) {
                let subArray = breedObj[breed]
                let newSubList = document.createElement("ul");
                newBreed.appendChild(newSubList);
                for (let subBreed of subArray) {
                    let newSubBreed = document.createElement("li")
                    newSubBreed.innerText = subBreed
                    newSubList.appendChild(newSubBreed)
                }
            }
            newBreed.addEventListener("click", (e) => {
                newBreed.style.color = "blue"
            })
        }
    })
}
function sortedBreeds(e) {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(object => {
        let breedObj = object.message;
        for (let breed in breedObj) {
            let firstLetter = breed[0];
            let targetLetter = e.target.value;
            console.log(breed);
            if(firstLetter === targetLetter) {
                let newBreed = document.createElement("li");
                newBreed.innerText = breed;
                newBreed.className = breed[0];
                breedList.appendChild(newBreed);
                if(breedObj[breed].length >= 1) {
                    let subArray = breedObj[breed]
                    let newSubList = document.createElement("ul");
                    newBreed.appendChild(newSubList);
                    for (let subBreed of subArray) {
                        let newSubBreed = document.createElement("li")
                        newSubBreed.innerText = subBreed
                        newSubList.appendChild(newSubBreed)
                    }
                }
                newBreed.addEventListener("click", (e) => {
                    newBreed.style.color = "blue";
                })
            }
        }
    })
}

function sort2(e) {
    let letter = e.target.value;
    let targetBreeds = document.getElementsByClassName(letter);
    if(letter === "-") {
        breedList.innerHTML = "";
        breeds();
    } else {
        breedList.innerHTML = "";
        sortedBreeds(e);
    }
}