

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let p = document.querySelector('#text')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((res) => {
    res.json().then((data) => {
            p.classList.remove('error');
        if(data.err) {
            p.setAttribute('class', 'error');
            p.innerText = data.err;
        } else {
            p.innerText = data.forecast
        }
    })
})


})