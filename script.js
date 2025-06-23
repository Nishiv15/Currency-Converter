const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
let drop = document.querySelectorAll(".dropdown select")  //all select selected
let btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")

for(let select of drop){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag = (element) =>{
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let aval = amount.value;
    if(aval === "" || aval < 1){
        aval = 1;
        amount.value = "1";
    }
    // Null check
    if (!fromCurr || !toCurr) {
        alert("Currency selectors not found in the DOM!");
        return;
    }
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let toCode = toCurr.value.toLowerCase();
    let fromCode = fromCurr.value.toLowerCase();
    let rate = data[fromCode][toCode]
    alert(`The coverted amount is ${(aval*rate).toFixed(2)}`)
});