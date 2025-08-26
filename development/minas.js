const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");
const btnNuevo = document.getElementById("nuevoJuego");

//arreglo (celdas) el cual me almacenara cada div
let celdas = [];
//arreglo (minas) el cual me almacena las minas
let minas = [];
//variable la cual por cada celda en verde me guardara y sumara el puntaje
let puntos = 0;
//tamaño de cada celda
const size = 5;
//numero de minas
const numMinas = 5;
//variable booleana para blonquear el tablero al perder
let juegoActivo = true

// esta funcion me genera el tablero, itera y genera cada celda, agrega las minas y me almacena el puntaje
function generarTablero() {
    tablero.innerHTML = "";
    celdas = [];
    minas = generarMinas();
    puntos = 0;
    juegoActivo = true;
    mensaje.textContent = "¡Encuentra las casillas seguras!";

    for (let i = 0; i < size * size; i++) {
        const celda = document.createElement("div");
        celda.classList.add("celda");
        celda.dataset.index = i;
        celda.addEventListener("click", clickCelda);
        tablero.appendChild(celda);
        celdas.push(celda);
    }
}


//esta funcion me crea las minas, se utiliza un while para generar un numero de minas contadas.
function generarMinas() {
    let posiciones = [];
    while (posiciones.length < numMinas) {
        let r = Math.floor(Math.random() * size * size);
        if (!posiciones.includes(r)) {
            posiciones.push(r);
        }
    }
    return posiciones;
}


// logica del juego, se detecta si le di click a una celda limpia o encima de una mina, si es mina = perder, sino continua el juego y suma puntos
function clickCelda(e) {
    if(!juegoActivo) return;
    const index = e.target.dataset.index;
    if (minas.includes(Number(index))) {
        e.target.classList.add("mina");
        mensaje.textContent = `💥 ¡Perdiste! Puntos: ${puntos}`;
        revelarMinas();
        juegoActivo = false;

        setTimeout(() => {
            generarTablero();
        }, 1500);

    } else {
        if (!e.target.classList.contains("revelada")) {
            e.target.classList.add("revelada");
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


//recorre las posiciones donde habian minas y les cambia el estilo
function revelarMinas() {
    minas.forEach(i => {
        celdas[i].classList.add("mina");
        celdas[i].textContent = "💣";
    });
}

btnNuevo.addEventListener("click", generarTablero);

generarTablero();
