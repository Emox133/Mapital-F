export const createAlert = (parentElement, message, timer = 3000, type="alert--primary") => {
    const markup = 
    `<div class="alert p-md ${type}">
        <p class="alert__message">${message}</p>
        <button class="alert__button">Okay</button>
    </div>`
    
    parentElement.insertAdjacentHTML("afterbegin", markup)

    setTimeout(() => {
        parentElement.innerHTML = ''
    }, timer)
} 