
const dogFactory = (fname, lname, race, tel, country, photoUrl, about) => 
{
    const getFullName = () => { return `${fname} ${lname}`}

    return {fname, lname, race, tel, country, photoUrl, about, getFullName}
}


//modules 


const formController = (() => {
    const form = document.querySelector("form")
    form.addEventListener("submit", e => 
    {
        if (e.target.dataset.mode === "add") 
        {
            e.preventDefault()
            const dog = dogFactory(e.target[0].value, e.target[1].value,e.target[2].value,
                e.target[3].value,e.target[4].value,e.target[5].value,e.target[6].value)
            dogStorage.addDog(dog)

            modalController.closeModal()

            displayController.render()
        } else {
            e.preventDefault()
            const newDog = dogFactory(e.target[0].value, e.target[1].value,e.target[2].value,
                e.target[3].value,e.target[4].value,e.target[5].value,e.target[6].value)
            dogStorage.editDog(Number(e.target.dataset.pos), newDog)
            modalController.closeModal()

            displayController.render()
        }
        
    })
})()

const dogStorage = (() => 
{
    let dogArray = []

    let getDogArray = () => dogArray
    let addDog = (dog) => dogArray.push(dog)
    let deleteDog = (pos) => dogArray.splice(pos,1)
    let editDog = (pos,newDog) => dogArray[pos] = newDog

    return {getDogArray, addDog, deleteDog,editDog}
})();

const displayController = (() =>
{
    const container = document.querySelector(".dog-main")
    container.addEventListener("click", e => 
    {
        console.log(e)
        if (e.target.matches(".dog-card__close")) {
            const dogPos = Number(e.target.parentElement.dataset.pos)
            console.log(e.target.parentElement.dataset.pos)
            dogStorage.deleteDog(dogPos)
            displayController.render()
        }
        
    })

    const deleteChild = () => 
    {
        while (container.firstChild) container.removeChild(container.lastChild)
    }
    const addDogCard = (dog,pos) => {
        let card = document.createElement("div")
        card.classList.add("dog-card")
        let edit = document.createElement("span")
        edit.classList.add("dog-card__edit")
        let close = document.createElement("span")
        close.classList.add("dog-card__close")
        let img = document.createElement("img")
        img.classList.add("dog-card__img")
        let name = document.createElement("h2")
        name.classList.add("dog-card__name")
        let contact = document.createElement("h3")
        contact.classList.add("contact")
        let country = document.createElement("h4")
        country.classList.add("dog-card__country")
        let about = document.createElement("p")
        about.classList.add("dog-card__about")

        edit.textContent = "\u2710"
        close.textContent = "\u2715"
        img.scr = dog.photoUrl
        name.textContent = dog.getFullName()
        contact.textContent = `${dog.tel} | ${dog.race}`
        country.textContent = dog.country
        about.textContent = dog.about

        card.appendChild(img)
        card.appendChild(edit)
        card.appendChild(close)
        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(contact)
        card.appendChild(country)
        card.appendChild(about)
        card.dataset.pos = pos

        container.appendChild(card)
    }

    const render = () => 
    {
        deleteChild()
        const currentDog = dogStorage.getDogArray()

        currentDog.forEach((dog,index) => 
            {
                addDogCard(dog,index)
            })

    }

    return {render}
})()


/* modal script */

const modalController = (() =>
{   
    const container = document.querySelector(".dog-main")
    const form = document.querySelector("form")
    const addDog = document.getElementById("add_dog")
    const modal = document.getElementById("modal")
    const close = document.getElementById("cancel")

    const openModal = () => modal.style.display = "flex"
    const closeModal = () => modal.style.display = "none"

    addDog.addEventListener("click", () => 
    {
        form.reset()
        openModal()
        form.dataset.mode = "add"
    })
    close.addEventListener("click", closeModal)

    container.addEventListener("click",e =>
    {
        if (e.target.matches(".dog-card__edit"))
        {
            const pos = e.target.parentElement.dataset.pos
            const currentDog = dogStorage.getDogArray()[pos] 
            openModal()
            form.dataset.mode = "edit"
            form.dataset.pos = pos
            form[0].value = currentDog.fname
            form[1].value = currentDog.lname
            form[2].value = currentDog.race
            form[3].value = currentDog.tel
            form[4].value = currentDog.country
            form[5].value = currentDog.photoUrl
            form[6].value = currentDog.about
        }
        
    }) 

    return {closeModal}
})()

