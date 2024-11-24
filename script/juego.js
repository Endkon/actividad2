const num = ['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h']
let aleatorio = num.sort(() => Math.random()-0.5);

let item1 = null;
let item2 = null;
let parejas = 0;
let parejasEncontradas = [];
Inicio = false;
Reinicio = false;
let timerInterval;
let timeElapsed = 0;
let timerStarted = false;

const cajas = document.querySelectorAll('.caja');
const imagenes = document.querySelectorAll('.img');
const contador = document.getElementById("contador");

cajas.forEach((caja, index) => {
    if(index < aleatorio.length) {
        caja.setAttribute('id', aleatorio[index]);
    }
});

imagenes.forEach((img, index) => {
    if(index < aleatorio.length) {
        img.setAttribute('id', aleatorio[index]);
    }
});

imagenes.forEach((img, index) => {
    img.style.display = 'block';
    cajas[index].addEventListener('click', () => {        
        if (!Inicio) {
            return;
        }
        if (item1 == null) {
            img.style.display = 'none';
            item1 = img.getAttribute('id');
        } else if (item2 == null) {
            img.style.display = 'none';
            item2 = img.getAttribute('id');
            if (item1 == item2) {
                parejas++;
                document.getElementById("contador").innerHTML = 'Parejas = ' + parejas;
                parejasEncontradas.push(item1);
                eliminarPareja(item1);
                resetearSeleccion(); 
                if(parejas >= 8){
                    setTimeout(() => {
                        stopTimer();
                        document.getElementById("estado").innerHTML = 'Presiona reiniciar para volver a jugar';
                    }, 1000);                    
                }
            } else {
                setTimeout(() => {
                    cajas.forEach(caja => {
                        const imgInCaja = caja.querySelector('.img');
                        imgInCaja.style.display = 'block';
                    });
                    resetearSeleccion();
                }, 1000);
            }
        }
    });
});

function eliminarPareja(imagen) {
    cajas.forEach((caja, index) => {        
        const imgInCaja = caja.querySelector('.img');
        if (imgInCaja.getAttribute('id') == imagen) {
            caja.style.visibility = 'hidden';
        }
    }); 
}

function resetearSeleccion() {
    item1 = null;
    item2 = null;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        tiempo.innerHTML = `Tiempo: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

const Iniciar = document.getElementById("Iniciar");
Iniciar.addEventListener('click', () => {
    if (Inicio) {
        return;
    }
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    
    Inicio = true;
    document.getElementById("Iniciar").style.display = 'none';
    document.getElementById("Reiniciar").style.display = 'block';
    document.getElementById("contador").innerHTML = 'Juego iniciado';
});

const Reiniciar = document.getElementById("Reiniciar");
Reiniciar.addEventListener('click', () => {
    if (timerStarted = true){
        stopTimer();
        timerStarted = false;
    }
    parejas = 0;
    parejasEncontradas = [];
    Inicio = false;    
    timeElapsed = 0;

    tiempo.innerHTML = 'Tiempo: 0:00';

    cajas.forEach(caja => {
        caja.style.visibility = 'visible';
    });

    aleatorio = num.sort(() => Math.random() - 0.5);

    cajas.forEach((caja, index) => {
        if (index < aleatorio.length) {
            caja.setAttribute('id', aleatorio[index]);
        }
    });

    imagenes.forEach((img, index) => {
        if (index < aleatorio.length) {
            img.setAttribute('id', aleatorio[index]);
            img.style.display = 'block';
        }
    });

    document.getElementById("Reiniciar").style.display = 'none';
    document.getElementById("Iniciar").style.display = 'block';
    document.getElementById("contador").innerHTML = 'Juego reiniciado';
});
