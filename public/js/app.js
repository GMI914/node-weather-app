const inputForm = document.querySelector('form')
const inputField = document.querySelector('input')
const weather = document.querySelector('.weather')
const error = document.querySelector('.error')

inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputField.value
    
    error.textContent = ''
    weather.textContent = ''

    fetch('/weather?location=' + location)
        .then(response => {
            response.json()
                .then(data => {
                    if (data.error) {
                        error.textContent = data.error
                    } else {
                        let retData = ''
                        data.forEach(el => {
                            retData += ` <p>
                            ${el.t_location} 
                            ${el.t_time} - 
                            ${el.t_temperature}c
                            <img src="${el.t_image}"/>
                            </p>
                        `
                        })
                        weather.innerHTML = retData 
                    }
                })
        })
})