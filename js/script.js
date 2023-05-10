let cards = document.querySelector('.cards')
let todos = []

// form

let form = document.forms.toDo
let input = document.querySelector('input')

form.onsubmit = (event) => {
    event.preventDefault()
    let inputFIlled = true
    input.style.border = '2px solid #007FFF'
    if (input.value.length === 0) {
        input.style.border = '2px solid red'
        inputFIlled = false
    }
    if (inputFIlled) {
        let task = {
            id: Math.random(),
            isDone: false,
            time: new Date().getHours() + ':' + new Date().getMinutes()
        }

        let fm = new FormData(form)
        fm.forEach((value, key) => {
            task[key] = value
        })
        form.reset()
        todos.push(task)
        reload(todos, cards)
    }

}

function reload(arr, place) {
    place.innerHTML = ''
    for (let card of arr) {
        // create

        let itemParent = document.createElement('div')
        let item = document.createElement('div')
        let h3 = document.createElement('h3')
        let time = document.createElement('div')
        let p = document.createElement('p')
        let exit = document.createElement('div')

        // styling

        itemParent.classList.add('itemParent')
        item.classList.add('item')
        time.classList.add('time')
        exit.classList.add('exit')

        h3.innerHTML = card.note
        p.innerHTML = card.time

        // append

        item.append(h3, time, exit)
        time.append(p)
        itemParent.append(item)
        place.append(itemParent)

        exit.onclick = () => {
            todos = todos.filter(el => el !== card)
            item.style.opacity = "0"
            item.style.left = "-100%"
            setTimeout(() => {
                itemParent.style.display = "none"
            }, 600);
        }
        h3.onclick = () => {
            card.isDone = !card.isDone
            h3.classList.toggle('line')
        }
    }
}
console.log(todos);