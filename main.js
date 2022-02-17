const stringToHTML = (s) => {
    const parser = new DOMParser()
    // en vez de agregar los elementos con un template tipico es mejor agregarlos como elementos HTML asi despues podemos agregar eventlisteners facilemtne
    const doc = parser.parseFromString(s, 'text/html')
    return doc.body.firstChild
}

const renderItem = (item) =>{
    const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`)

    element.addEventListener('click',()=>{
        const mealsList = document.getElementById('meals-list')
        Array.from(mealsList.children).forEach(x => x.classList.remove('selected'))
        element.classList.add('selected')
        const mealsIdInput = document.getElementById('meals-id')
        mealsIdInput.value = item._id
    })

    return element
} 

// el codigo se realiza cuando la pagina ya este cargada
window.onload = () => {
    const orderForm = document.getElementById('order')
    orderForm.onsubmit = (e) => {
        e.preventDefault()
        const mealId = document.getElementById('meals-id')
        const mealIdValue = mealId.value
        if(!mealIdValue){
            alert('Debe seleccionar un plato')
            return
        }
        const order = {
            meal_id: mealIdValue,
            user_id: 'user1',
        }
    }


    fetch('https://serverless-matiaspv42.vercel.app/api/meals',
    // {
    //     method: 'GET', // POST, PUT DELETE
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //     headers:{
    //         'Content-type': 'application/json',
    //     },
    //     redirect: 'follow',
    //     body: JSON.stringify({user:'lala', password:'chanchito'})
    // }
    )
    .then(response => response.json())
    .then(data => {
        const mealsList = document.getElementById('meals-list')
        const submit = document.getElementById('submit')
        const listItems = data.map(renderItem)
        mealsList.removeChild(mealsList.firstElementChild)
        listItems.forEach(element => {
            mealsList.appendChild(element)
        });
        submit.removeAttribute('disabled')
    })
}