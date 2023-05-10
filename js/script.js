let cards = document.querySelector('.cards')
let todos = []

// form

let form = document.forms.toDo
let input = form.querySelector('input')
let btn = form.querySelector('button')


form.onsubmit = (event) => {
    event.preventDefault()
    let inputFIlled = true
    input.style.border = '2px solid #007FFF'
    btn.style.backgroundColor = '#0071E3'
    btn.style.opacity = '1'
    if (input.value.length === 0) {
        btn.style.opacity = '.5'
        btn.style.backgroundColor = 'red'
        input.style.border = '2px solid red'
        inputFIlled = false
    }
    if (inputFIlled) {
        let hours = new Date().getHours()
        let minutes = new Date().getMinutes()
        if (hours.toString().length === 1) {
            hours = '0' + hours
        }
        if (minutes.toString().length === 1) {

            minutes = '0' + minutes
        }
        let task = {
            id: Math.random(),
            isDone: false,
            time: hours + ':' + minutes
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
        place.prepend(itemParent)

        h3.onclick = () => {
            card.isDone = !card.isDone
            h3.classList.toggle('line')
        }

        exit.onclick = () => {
            todos = todos.filter(el => el !== card)
            item.style.opacity = "0"
            item.style.left = "-100%"
            setTimeout(() => {
                itemParent.style.display = "none"
            }, 600);
        }
    }
}
console.log(todos);