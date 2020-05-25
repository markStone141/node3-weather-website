

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p = document.querySelector('#text')
const locTxt = document.querySelector("#location-text")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((res) => {
    res.json().then((data) => {
            p.classList.remove('error');
        if(data.err) {
            locTxt.textContent = location
            p.setAttribute('class', 'error');
            p.innerText = data.err;
        } else {
            locTxt.textContent = location
            p.textContent = data.forecast
        }
    })
})


})