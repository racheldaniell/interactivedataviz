console.log('hello world');

const label = document.getElementById("pet-label")
const input = document.getElementById("pet-input")
const button = document.getElementById("pet-submit")

let petName;

function petNameUpdate() {
    petName = input.value
    console.log(petName)
    label.innerText = "Wow! I love the name: " + petName
    button.innerText = "Name it again!"
    input.value = ""
} 




