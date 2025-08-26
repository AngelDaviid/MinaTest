const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");
const btnNuevo = document.getElementById("nuevoJuego");

let celdas = [];
let minas = [];
let puntos = 0;
const size = 5;
const numMinas = 5;
let juegoActivo = true;

function generarTablero() {
    tablero.innerHTML = "";
    celdas = [];
    minas = generarMinas();
    puntos = 0;
    juegoActivo = true;
    mensaje.textContent = "¡Cuidado con las minas invertidas!";
    mensaje.textContent = "En la consola puedes ver las posiciones de las minas"

    for (let i = 0; i < size * size; i++) {
        const celda = document.createElement("div");
        celda.classList.add("celda");
        celda.dataset.index = i;
        celda.addEventListener("click", clickCelda);
        tablero.appendChild(celda);
        celdas.push(celda);
    }
}

function generarMinas() {
    let posiciones = [];
    while (posiciones.length < numMinas) {
        let r = Math.floor(Math.random() * size * size);
        if (!posiciones.includes(r)) {
            posiciones.push(r);
        }
    }
    console.log(posiciones);
    return posiciones;
}

function clickCelda(e) {
    if (!juegoActivo) return;
    const index = Number(e.target.dataset.index);

    if (minas.includes(index)) {
        e.target.classList.add("revelada");
        e.target.textContent = "✅";
        mensaje.textContent = `¡Perdiste! Puntos: ${puntos}`;
        juegoActivo = false;
        revelarMinas();
    } else {
        if (!e.target.classList.contains("revelada")) {
            e.target.classList.add("mina");
            e.target.textContent = "💣";
            puntos++;
            mensaje.textContent = `Puntos: ${puntos}`;

            if(puntos === size * size - minas.length){
                mensaje.textContent = `!Ganaste¡ Puntos: ${puntos}`
                juegoActivo = false;

                setTimeout(() => {
                    generarTablero();
                }, 2000)
            }
        }
    }
}

function revelarMinas() {
    minas.forEach(i => {
        celdas[i].classList.add("revelada");
        celdas[i].textContent = "";
    });
}

btnNuevo.addEventListener("click", generarTablero);

generarTablero();
