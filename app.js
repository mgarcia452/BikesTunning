// ---------- ACCESORIES ---------- //

const accesories = [];
class SparePart {
    constructor(type, part, hp, consumption, price) {
        this.type = type;
        this.part = part;
        this.hp = hp;
        this.consumption = consumption;
        this.price = price;
    }
}

const agregarTodos = () => {
    accesories.push(new SparePart("intake", "filter", 1.02, 0.98, 600));
    accesories.push(new SparePart("intake", "cai", 1.05, 0.95, 800));

    accesories.push(new SparePart("exhaust", "muffler", 1.02, 0.98, 1000));
    accesories.push(new SparePart("exhaust", "full-system", 1.10, 0.95, 1750));

    accesories.push(new SparePart("flash", "lean", 0.97, 0.90, 300));
    accesories.push(new SparePart("flash", "rich", 1.12, 1.10, 450));

    accesories.push(new SparePart("camshaft", "race", 1.08, 1.10, 300));
    accesories.push(new SparePart("camshaft", "street", 1.12, 1.18, 500));

    const accesoriesHTML = document.querySelector(".agregados");
    let newHTMLCode = `<h2 style="color:green;">PARTS HAVE BEEN UPLOADED</h2>`;
    accesoriesHTML.innerHTML += newHTMLCode;
}

let boton = document.getElementById("btn-agregar");
boton.addEventListener("submit", () => {
    agregarTodos();
});

document.getElementById("btn-part").addEventListener("click", (e) => {
    e.preventDefault();
});

// ---------- SEARCH PART ---------- //

function searchPart() {
    let accesory = (document.getElementById("tipoAcc").value).toLowerCase();

    // SPREAD OPERATOR, SACADO DE SAN GOOGLE PARA COPIAR EL ARRAY SIN MODIFICAR EL ORIGINAL
    let accArray = [...accesories];
    // el = elemento
    const result = accArray.filter((el) => el.type === accesory);
    // ACOTE LA BUSQUEDA A "POR TIPO" POR AHORA
    const accesoryHTML = document.querySelector(".accesory");
    for (let i = 0; i < result.length; i++) {
        let newHTMLCode = `
	   <tr>
            <th>${result[i].part}</th>
            <td class="hp">${result[i].hp}</td>
            <td class="consumption">${result[i].consumption}</td>
            <td class="price">${result[i].price}</td> 
        </tr>`;
        accesoryHTML.innerHTML += newHTMLCode;
    }   
}
