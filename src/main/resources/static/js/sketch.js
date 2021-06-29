const red = Math.floor(Math.random() * 255);
const green = Math.floor(Math.random() * 255);
const blue = Math.floor(Math.random() * 255);

let points = { pointsarr: [] };
let timerGet = setInterval(() => getPoints(), 2000);

function checkPoints() {
  //let msg = points;
  //points = { pointsarr: [] };
  //points = { pointsarr: [], color: [red, green, blue] };
  //fetch("/points?payload=" + JSON.stringify(points)).then((res) => res.json());
  fetch("/points", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(points), // body data type must match "Content-Type" header
  });
}

function getPoints() {
  fetch("/points", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; chatset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      //revisar color
      points = { pointsarr: result.pointsarr };
    })
    .then(drawMore());
}
/**
 * Crea el canvas donde se va dibujar
 * Este código asume que las librerías de P5.js ya están cargadas.
 * Esta función se ejecuta una sola vez al inicio del script.
 */
function setup() {
  createCanvas(640, 480);
  background(220,220,220);
  //setPosition(320,200);
  //setPosition("canvas1",640, 480);
  //createCanvas(640, 480);
}
/**
 * Reajusta el tamaño del canvas y una vez ajustado el canvas pone el fondo
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(220,220,220);
}

/**
 * Esta función se ejecuta repetidas veces indefinidamente.
 * Funcion que dibuja dada la posicion del mouse ,agrega el punto junto a los colores en la lista y llama a checkpoints
 */
function draw() {
  if (mouseIsPressed === true) {
    fill(red, green, blue);
    ellipse(Math.floor(mouseX), Math.floor(mouseY), 10, 10);
    points.pointsarr.push([
      Math.floor(mouseX),
      Math.floor(mouseY),
      red,
      green,
      blue
    ]);
    checkPoints();
  }
  /*
  if (mouseIsPressed === false) {
    fill(red, green, blue);
  }
  */
}
/**
 * Revisa los punots existentes en la lista y los dibuja 
 */
function drawMore() {
  let pointLength = points.pointsarr.length;
  for (var i = 0; i < pointLength; i++) {
    fill(points.pointsarr[i][2], points.pointsarr[i][3],points.pointsarr[i][4]);
    ellipse(points.pointsarr[i][0], points.pointsarr[i][1], 10, 10);
  }
}
/**
 * llama funcion que limpia el canvas y una vez limpiado restablece el fondo
 */
function clean() {
  fetch("/clear", {
    method: "POST",
  }).then(clear()).then(background(220,220,220));
}
