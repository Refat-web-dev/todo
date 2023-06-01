let cards = document.querySelector('.cards')

let base_url = "http://localhost:6969"
// get data

const getAllData = async () => {
    try {
        let res = await fetch(base_url + "/todos")
        if (res.status === 200 || res.status === 201) {
            const data = await res.json()
            reload(data)
        }

    } catch (e) {
        alert("connection error")
    }
}
getAllData()
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
        }
        task.isDone = false
        task.time = hours + ':' + minutes

        let fm = new FormData(form)
        fm.forEach((value, key) => {
            task[key] = value
        })
        form.reset()
        createNewTask(task)
    }

}
const createNewTask = async (body) => {
    try {
        const res = await fetch(base_url + "/todos", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200 || res.status === 201) {
            getAllData()
        }
    } catch (e) {
        alert("connection error")
    }
}

function reload(arr,) {
    cards.innerHTML = ''
    for (let card of arr) {
        // create

        let itemParent = document.createElement('div')
        let item = document.createElement('div')
        let h3 = document.createElement('h3')
        let time = document.createElement('div')
        let p = document.createElement('p')
        let close = document.createElement('div')

        // styling

        itemParent.classList.add('itemParent')
        item.classList.add('item')
        time.classList.add('time')
        close.classList.add('close')

        h3.innerHTML = card.note
        p.innerHTML = card.time
        if (card.isDone) {
            h3.classList.add('line')
        } else {
            h3.classList.remove('line')
        }
        // append

        item.append(h3, time, close)
        time.append(p)
        itemParent.append(item)
        cards.prepend(itemParent)

        h3.onclick = async () => {
            const newData = { ...card, isDone: !card.isDone }
            try {
                const res = await fetch(base_url + "/todos/" + card.id, {
                    method: "PATCH",
                    body: JSON.stringify(newData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res.status === 200 || res.status === 201) {
                    card.isDone = !card.isDone

                    if (card.isDone) {
                        h3.classList.add('line')
                    } else {
                        h3.classList.remove('line')
                    }
                    console.log(card.isDone);
                }
            } catch (e) {
                alert("connection error")
            }
        }

        close.onclick = async () => {
            try {
                const res = await fetch(base_url + "/todos/" + card.id, {
                    method: "delete",
                })
                if (res.status === 200 || res.status === 201) {
                    item.style.opacity = "0"
                    item.style.left = "-100%"
                    itemParent.style.width = "0"
                    setTimeout(() => {
                        itemParent.style.display = "none"
                    }, 600);
                    console.log(todos);
                }
            } catch (e) {
                alert("connection error")
            }
        }

    }
}