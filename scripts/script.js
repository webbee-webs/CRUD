const url = 'https://6364fb3ef711cb49d1f1b04c.mockapi.io/users/'
const container = document.getElementById('results')


/* --------------------------------- render --------------------------------- */

const render = (arr) => {
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
    let result = await fetch(url + id).then(res => res.ok ? res.json() : console.log(res.status)).then(res => res)
    return result
}

document.getElementById('btnGet1').addEventListener('click', async () => {
    let id = document.getElementById('inputGet1Id')
    let results = await buscar(id.value)
    console.log('results')
    console.log(results)
    render(results)
})

/* ----------------------------------- put ---------------------------------- */

const putUser = (obj) => {
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
}

/* ----------------------------- nuevo registro ----------------------------- */
function registrar(obj) {
    fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
}

document.getElementById('btnPost').addEventListener('click', (e) => {
    let nuevo_User =
    {
        name: document.getElementById('inputPostNombre').value,
        lastname: document.getElementById('inputPostApellido').value
    }
    registrar(nuevo_User);
    render(traerUsuarios(url));
})
document.getElementById('inputPostNombre').addEventListener('input', (e) => {
    let btnAgregar = document.getElementById('btnPost');
    e.target.value !== '' ? btnAgregar.removeAttribute('disabled') : btnAgregar.setAttribute('disabled','')
 })
 document.getElementById('inputPostNombre').addEventListener('input', (e) => {
    
 })



/* -------------------------------- eliminador -------------------------------- */

document.getElementById('inputDelete').addEventListener('input', (e) => {
    let btn = document.getElementById('btnDelete')
    e.target.value !== '' ? btn.removeAttribute('disabled') : btn.setAttribute('disabled','');
})

document.getElementById('btnDelete').addEventListener('click', () => {
    let id = document.getElementById('inputDelete').value;
    borrar(id);
})


async function borrar(id){
    await fetch(url + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => console.log(data));
    let data = await buscar()
    render(data)
}


