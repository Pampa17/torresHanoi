import { sleep } from './util.js';
import { getHanoiSolutions } from './hanoi.js';

//* Seleccionar todas las elementos de torre

const towers = document.querySelectorAll('.tower');

//* Inicializar el towerContent como un array de arrays representando discos en cada torre

let towerContent = [[], [], []];

//* Inicializar el tamaño de los discos
let size = 3;

let discs;

//* SleepTime y Speed

const sleepTime = 300;
let speed = 100;

//* Color de los discos
const DISC_COLORS = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#3a86ff'];

//* Inicialización del ancho del disco
const startWidth = 90;

//* Elementos html
const newGameBtn = document.getElementById('newGameBtn');
const verifyGameBtn = document.getElementById('btnVerify'); /*CAMBIO*/ 
const discSelect = document.getElementById('discSelect');
const speedRange = document.getElementById('speedRange');
const btnSolve = document.getElementById('btnSolve');
const timerElement = document.getElementById('timer');

//* Variables para guardar la torre actual y la torre original durante el movimiento

let currentTower;
let originTower;

//* Variables para el cronómetro
let timerInterval;
let startTime;
let timerStarted = false;

//* Función para construir las torres con stems y plates
const buildTowers = (towers) => {
    towers.forEach((tower) => {
        const stem = document.createElement('div');
        stem.className = 'stem';
        const plate = document.createElement('div');
        plate.className = 'plate';
        tower.innerHTML = '';
        tower.appendChild(stem);
        tower.appendChild(plate);
    });
};

//* Inicializar el juego
start();

function start() {
    //* Reseteo de contenido del array
    towerContent = [[], [], []];

    //* Constuir la torre
    buildTowers(towers);

    //* Crear discos y ponerlos en la primer torre
    for (let i = 0; i < size; i++) {
        let tower = document.createElement('div');
        tower.classList.add('disc');
        tower.draggable = true;
        tower.style.backgroundColor = DISC_COLORS[i];
        tower.style.width = startWidth - 15 * i + 'px';
        towerContent[0].push(tower);
    }

    //* Agregar los discos a la primer torre en el DOM
    towerContent[0].forEach((t) => {
        towers[0].innerHTML = t.outerHTML + towers[0].innerHTML;
    });

    //* Agregar event listeners para dragenter y dragover para cada torre
    for (let i = 0; i < towers.length; i++) {
        towers[i].classList.add('t' + i);
        towers[i].addEventListener('dragenter', dragenter);
        towers[i].addEventListener('dragover', dragover);
    }

    //* Obtener referencias de todos los discos
    discs = document.querySelectorAll('.disc');
    discs.forEach((disc) => {
        disc.addEventListener('dragstart', dragstart);
        disc.addEventListener('dragend', dragend);
    });
}

//* Evento para dragenter
function dragenter() {
    if (!originTower) {
        originTower = this;
    }
}

//* Evento para dragover
function dragover() {
    currentTower = this;
}

//* Evento para dragstart
function dragstart() {
    this.classList.add('is-dragging');
    this.classList.add('is-moving');
}

//* Evento para dragend
function dragend() {
    let originTowerIndex = originTower.classList[1][1];
    let currentTowerIndex = currentTower.classList[1][1];
    this.classList.remove('is-dragging');
    this.classList.remove('is-moving');

    moveTower(originTowerIndex, currentTowerIndex, this);

    originTower = undefined;
    originTowerIndex = undefined;
}

//* Mover el disco desde la torre de origen a la torre actual
function moveTower(originTowerIndex, currentTowerIndex, disc) {
    if (isDroppable(originTowerIndex, currentTowerIndex, disc)) {
        towerContent[currentTowerIndex].push(towerContent[originTowerIndex].pop());
        originTower.removeChild(disc);
        currentTower.prepend(disc);
    }
}

//* Revisar si el disco puede ser eliminado en la torre actual
function isDroppable(originTowerIndex, currentTowerIndex, disc) {
    let top = isOnTop(originTowerIndex, disc);
    let topDiscIsLess = isDiscLessThan(currentTowerIndex, disc);

    return top && topDiscIsLess;
}

//* Revisar si el disco está en la cima de la torre original
function isOnTop(originTowerIndex, disc) {
    let size = towerContent[originTowerIndex].length;
    return disc.style.width === towerContent[originTowerIndex][size - 1].style.width;
}

//* Revisar si el disco es más pequeño que el de la cima de la torre actual
function isDiscLessThan(currentTowerIndex, disc) {
    let size = towerContent[currentTowerIndex].length;

    if (!towerContent[currentTowerIndex][size - 1]) {
        return true;
    } else {
        let sizeTop = disc.style.width.substring(0, disc.style.width.indexOf('p'));
        let sizeBottom = towerContent[currentTowerIndex][size - 1].style.width.substring(0, towerContent[currentTowerIndex][size - 1].style.width.indexOf('p'));

        return Number(sizeTop) < Number(sizeBottom);
    }
}

//* Mover el disco desde la torre original a la torre destino
function moveTopDisc(originTowerIndex, destinyTowerIndex) {
    originTower = towers[originTowerIndex];
    currentTower = towers[destinyTowerIndex];
    let disc = getTopDisc(originTowerIndex);
    moveTower(originTowerIndex, destinyTowerIndex, disc);
}

//* Obtener el disco de encima de una torre en específico
function getTopDisc(towerIndex) {
    let size = towerContent[towerIndex].length;

    let sizeDisc = towerContent[towerIndex][size - 1].style.width;
    let indexDisc = -1;
    discs.forEach((el, index) => {
        if (el.style.width === sizeDisc) {
            indexDisc = index;
        }
    });
    return discs[indexDisc];
}

//* Animar los movimientos de la solución
async function moves(movements) {
    for (let i = 0; i < movements.length; i++) {
        const element = movements[i];
        moveTopDisc(element.origin, element.destiny);
        await sleep(5 * sleepTime - 14 * speed);
    }
    alert('Se ha resuelto el problema de las torres de hanoi automaticamente');
    stopTimer(); /*CAMBIO*/
}

//* Cronómetro
function startTimer() {
    if (!timerStarted) {
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    timerStarted = true;
    }
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function stopTimer() {
    clearInterval(timerInterval);
    timerStarted = false;
    if (startTime) {
        return Date.now() - startTime;
    } else {
        return 0; // O cualquier otro valor predeterminado
    }
}

// Función para reiniciar el cronómetro
function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = '00:00:00';
    timerStarted = false;
}

//* Formatear el tiempo en formato HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

document.getElementById('startTimerBtn').addEventListener('click', startTimer);

//* Clase Game
class Game {
    /*CAMBIO*/
    isGameCompleted = () => {
        return towerContent[1].length == size;
    };

    //* Método para iniciar un nuevo juego
    newGame = () => {
        //* Event listener del input de speed
        speedRange.addEventListener('input', (event) => {
            speed = event.target.value;
        });

        //* Event listener para el click tel nuevo juego
        newGameBtn.addEventListener('click', () => {
            size = discSelect.value;
            start();
            resetTimer();
        });

        //* Event listener para el click tel nuevo juego
        verifyGameBtn.addEventListener('click', () => {
            /*CAMBIO */
            if (this.isGameCompleted()) {
                const elapsedTime = stopTimer();
                const formattedTime = formatTime(elapsedTime);
                alert(`Felicitaciones!!, has terminado el juego manualmente, tu tiempo fue: ${formattedTime}`);
                stopTimer();
            } else {
                alert('Aún no has terminado :(');
            }
        });

        //* Evento para la solución del juego
        btnSolve.onclick = () => {
            moves(getHanoiSolutions(size, 0, 2, 1));
        };

    };
}

export default Game;
