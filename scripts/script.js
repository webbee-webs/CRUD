const url = 'https://6364fb3ef711cb49d1f1b04c.mockapi.io/users/'
const container = document.getElementById('results')


/* --------------------------------- render --------------------------------- */

const render = async (arr) => {
    arr = arr.length > 1 ? arr : new Array(arr);
    container.innerHTML = ''
    console.log(arr)
    for (data of arr) {
        container.innerHTML += `
        <div>
            <p>
            Id: ${data.id} </br>
            Name: ${data.name} </br>
            Lastname: ${data.lastname} 
            </p>
            </hr>
        </div>
        `
    }
}

/* -------------------------------- buscador -------------------------------- */

const buscar = async (id = '') => {
    let result = await fetch(url + id).then(res => res.ok ? res.json() : error()).then(res => res)
    return result
}

document.getElementById('btnGet1').addEventListener('click', async () => {
    let id = document.getElementById('inputGet1Id')
    let results = await buscar(id.value)
    render(results)

})


/* ----------------------------------- put ---------------------------------- */

document.getElementById('btnPut').addEventListener('click', (e) => {
    putUser(document.getElementById('inputPutId').value)
})

const putUser = async (id) => {
    let user = await buscar(id)
    let inputName = document.getElementById('inputPutNombre')
    let inputApellido = document.getElementById('inputPutApellido')
    inputName.value = user.name
    inputApellido.value = user.lastname
    document.getElementById('btnSendChanges').addEventListener('click', async () => {
        if (inputName.value == '' ||
            inputApellido.value == '') {
            return
        }
        await fetch(url + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                name: inputName.value,
                lastname: inputApellido.value
            })
        }).then(res => res.ok ? console.log('todo ok') : error())
        render(await buscar())
    })
}

/* ----------------------------- nuevo registro ----------------------------- */
async function registrar(obj) {
    await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
    let data = await buscar()
    render(data)
}

document.getElementById('btnPost').addEventListener('click', (e) => {
    let nuevo_User =
    {
        name: document.getElementById('inputPostNombre').value,
        lastname: document.getElementById('inputPostApellido').value
    }
    if (nuevo_User.name.trim() == "" || nuevo_User.lastname.trim() == "") {
        error()
        return
    }
    registrar(nuevo_User)
})

/* ----------------------------- Disable button ----------------------------- */
document.getElementById('inputPostNombre').addEventListener('input', (e) => {
    let btnAgregar = document.getElementById('btnPost');
    e.target.value !== '' ? btnAgregar.removeAttribute('disabled') : btnAgregar.setAttribute('disabled', '')
})
document.getElementById('inputPutId').addEventListener('input', (e) => {
    let btnAgregar = document.getElementById('btnPost');
    e.target.value !== '' ? btnAgregar.removeAttribute('disabled') : btnAgregar.setAttribute('disabled', '')
})
document.getElementById('inputPostApellido').addEventListener('input', (e) => {
    let btnAgregar = document.getElementById('btnPost');
    e.target.value !== '' ? btnAgregar.removeAttribute('disabled') : btnAgregar.setAttribute('disabled', '')

})



/* -------------------------------- eliminador -------------------------------- */

document.getElementById('inputDelete').addEventListener('input', (e) => {
    let btn = document.getElementById('btnDelete')
    e.target.value !== '' ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
})
document.getElementById('inputPutId').addEventListener('input', (e) => {
    let btn = document.getElementById('btnPut')
    e.target.value !== '' ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
})

document.getElementById('btnDelete').addEventListener('click', () => {
    let id = document.getElementById('inputDelete').value;
    borrar(id);
})


async function borrar(id) {
    await fetch(url + id, {
        method: 'DELETE'
    })
        .then(res => res.ok ? res.json() : error())
        .then(data => console.log(data));
    let data = await buscar()
    render(data)
}


/* -------------------------------- error -------------------------------- */

function error() {

    document.getElementById('error').classList.add('show');
    setTimeout(() => {
        document.getElementById('error').classList.remove('show');
    }, 3000);

};



