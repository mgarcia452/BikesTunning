const productosContainer = document.querySelector('#item-container');
const cartContainer = document.querySelector('#cart-container');
const contadorCarrito = document.querySelector('#contador-carrito');
const precioTotal = document.querySelector('#estimated-total');
const potenciaTotal = document.querySelector('#power-up');
const botonVaciar = document.getElementById('emptyCart');
const clearInitialPower = document.querySelector('#clear-power');
const btnLoad = document.getElementById('load-parts');

//-------------------------------------------------------//

// CONSTRUCTOR DEL ARRAY DE STOCK
class Part {
    constructor(id, type, part, hp, price, img) {
        this.id = id;
        this.type = type;
        this.part = part;
        this.hp = hp;
        this.price = price;
        this.img = img;
    }
}
let stockAccesories = [];

const potenciaUsuario = document.querySelector("#potencia-usuario");
const closeModal = document.querySelector('#close-modal');
//Modal Welcome
const modalContWelcome = document.querySelector('#modal-container-welcome');
closeModal.addEventListener('click', () => {
    const hp = document.getElementById('initialHp').value;
    (hp !== 'Set your hp') ? modalContWelcome.classList.remove('modal-container-welcome--visible')
        : swal('you must set your standard power', 'you can not leave the fields in blank', 'warning');
    localStorage.setItem("power", hp);
    const userPowerLS = localStorage.getItem("power");
    potenciaUsuario.innerText = `your standard power is ${userPowerLS} hp, choose stuff from our web, and you will increase your power output`;
})

// FUNCION PARA BORRAR EL LOCAL STORAGE Y REEMPLAZAR EL VALOR DE POTENCIA
const clearPower = () => {
    localStorage.removeItem("power");
    let newhps;
    swal("Enter new Horse Power:", {
        content: "input",
    })
        .then((hps) => {
            swal(`New horse power are loaded: ${hps}`);
            newhps = hps
            localStorage.setItem("power", newhps);
            const newPower = localStorage.getItem("power")
            potenciaUsuario.innerText = ''
            potenciaUsuario.innerText = `your standard power is ${newPower} hp, select stuff from our web, and you will increase your power output`;
        });
    // LLAMO A EMPTY CART PARA VACIAR CARRITO Y QUE NO FALLE LA LOGICA DEL CALCULO HP
    emptyCart();
}
clearInitialPower.addEventListener('click', clearPower)

// INICIO UN ARRAY VACIO PARA CARRITO
const carrito = [];
//---------------------------------------------------//
// FUNCION PARA TRAER LOS PRODUCTOS DEL ARRAY
function createStock() {
    let i = 0
    let t = ""
    let pa = ""
    let hp = 0
    let pr = 0
    let img = ""
    fetch('parts.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(pt => {
                i = pt.id
                t = pt.type
                pa = pt.part
                hp = pt.hp
                pr = pt.price
                img = pt.img
                let accesory = new Part(i, t, pa, hp, pr, img);
                stockAccesories.push(accesory)
            });
        }
        );
    if (stockAccesories === []) {
        reject(new Error("No existe un array"));
    }
}
//---------------------------------------------//

createStock()


btnLoad.addEventListener('click', () => {
    if (stockAccesories != []) {
        // RECORRO EL ARRAY DE PRODUCTOS
        stockAccesories.forEach((item) => {
            const div = document.createElement('div');
            div.classList.add('accesory');
            div.innerHTML = `
                    <img src=${item.img} alt="" class="accesory-img">
                    <h3>${item.type}</h3>
                    <p class="accesory-item">${item.part}</p>
                    <p class="accesory-item"> + ${item.hp}% hp </p>
                    <p class="accesory-item">Price-tag: $${item.price}</p>
                    <button onclick="addPart(${item.id})" class="add">Add<i class="fas fa-shoppung-cart"></i></button>
                    `
            productosContainer.append(div);
        })
        btnLoad.disabled = true;
    }
})

// DEFINO PARA AGREGAR ELEMENTOS AL CARRITO
const addPart = (id) => {
    const item = stockAccesories.find((item) => item.id === id)
    carrito.push(item);
    renderCarrito();
    renderCantidad();
    hpTotal();
    renderTotal();
    Toastify({
        text: "Producto agregado",
        duration: 1300,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #052B76, #717171)",
        },
        onClick: function () { }
    }).showToast();
}


// ELIMINAR UN ITEM DEL CARRITO
const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    renderCarrito();
    renderCantidad();
    renderTotal();
    hpTotal();
}

// VACIAR EL CARRITO ENTERO
const emptyCart = () => {
    carrito.length = 0;
    renderCarrito();
    renderCantidad();
    renderTotal();
    hpTotal();
}

botonVaciar.addEventListener('click', emptyCart)

// AGREGO VISUALMENTE LOS ITEMS AL CARRITO
const renderCarrito = () => {
    cartContainer.innerHTML = '';

    carrito.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('itemCart')
        div.innerHTML = `
                    <p>${item.part}</p>
                    <p>Precio: $${item.price}</p>
                    <p>Potencia: ${item.hp}%</p>
                    <button onclick="removerDelCarrito(${item.id})" class="delete-button"><i class="fas fa-trash-alt"></i></button>
                `
        cartContainer.append(div);
    })
}

const renderCantidad = () => {
    contadorCarrito.innerText = carrito.length
}

const renderTotal = () => {
    let total = 0;
    carrito.forEach((item) => {
        total += item.price;
    })
    precioTotal.innerText = total;
}

const hpTotal = () => {
    const power = localStorage.getItem("power")
    let potencia = 0;
    carrito.forEach((item) => {
        potencia += item.hp;
    })
    potencia = (potencia + 100) / 100;
    potenciaFinal = power * potencia;
    potenciaFinal == power ? potenciaTotal.innerText = 0 : potenciaTotal.innerText = Math.round(potenciaFinal);
}
