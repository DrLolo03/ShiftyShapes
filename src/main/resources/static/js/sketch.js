const red = Math.floor(Math.random() * 255);
const green = Math.floor(Math.random() * 255);
const blue = Math.floor(Math.random() * 255);

let points = { pointsarr: [0] };
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
  background(220, 220, 220);
  pg = createGraphics(640, 480);
  pg.background(220, 220, 220);
  /** 
  fill(51);
  rect(700, 20, 55, 55);
  fill(255, 204, 0);
  ellipse(700,80, 55, 55);
  
  
   stroke(51);
  strokeWeight(4);
  */

  //setPosition(320,200);
  //setPosition("canvas1",640, 480);
  //createCanvas(640, 480);
}

/**
 * Esta función se ejecuta repetidas veces indefinidamente.
 * Funcion que dibuja dada la posicion del mouse ,agrega el punto junto a los colores en la lista y llama a checkpoints
 */
function draw() {
  //&& points.pointsarr[points.pointsarr.length-1].length==1
  if (mouseIsPressed === true && !points.pointsarr[points.pointsarr.length - 1] == 0 ) {
    pg.fill(red, green, blue);
    if (points.pointsarr[points.pointsarr.length - 1] == 1) {
      pg.ellipse(Math.floor(mouseX), Math.floor(mouseY), 30);
    }
    if (points.pointsarr[points.pointsarr.length - 1] == 2) {
      pg.rect(Math.floor(mouseX), Math.floor(mouseY), 30, 30);
    }
    if (points.pointsarr[points.pointsarr.length - 1] == 3) {
      pg.triangle(
        Math.floor(mouseX),
        Math.floor(mouseY),
        Math.floor(mouseX) + 15,
        Math.floor(mouseY) + 30,
        Math.floor(mouseX) + 30,
        Math.floor(mouseY)
      );
    }
    if (
      points.pointsarr[points.pointsarr.length - 1] == 1 ||
      points.pointsarr[points.pointsarr.length - 1] == 2 ||
      points.pointsarr[points.pointsarr.length - 1] == 3
    ) {
      let last = points.pointsarr[points.pointsarr.length - 1][0];
      points.pointsarr.pop();
      points.pointsarr.push([
        Math.floor(mouseX),
        Math.floor(mouseY),
        red,
        green,
        blue,
        last,
      ]);
      points.pointsarr.push([0]);
      console.log(points.pointsarr);
    }
    image(pg, 0, 0, 640, 480);
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
    if (points.pointsarr[i].length > 1) {
      pg.fill(
        points.pointsarr[i][2],
        points.pointsarr[i][3],
        points.pointsarr[i][4]
      );
      if (points.pointsarr[i][5] == 1) {
        pg.ellipse(points.pointsarr[i][0], points.pointsarr[i][1], 30);
      }
      if (points.pointsarr[i][5] == 2) {
        pg.rect(points.pointsarr[i][0], points.pointsarr[i][1], 30, 30);
      }
      if (points.pointsarr[i][5] == 3) {
        pg.triangle(
          points.pointsarr[i][0],
          points.pointsarr[i][1],
          points.pointsarr[i][0] + 15,
          points.pointsarr[i][1] + 30,
          points.pointsarr[i][0] + 30,
          points.pointsarr[i][1]
        );
        //ellipse(points.pointsarr[i][0], points.pointsarr[i][1], 10);
      }
    }
  }
  image(pg, 0, 0, 640, 480);
}
/**
 * llama funcion que limpia el canvas y una vez limpiado restablece el fondo
 */
function clean() {
  fetch("/clear", {
    method: "POST",
  })
    .then(clear())
    .then(background(220, 220, 220))
    .then(pg.clear())
    .then(pg.background(220, 220, 220));
}
function circlepoint() {
  points.pointsarr.push([1]);
}
function squarepoint() {
  points.pointsarr.push([2]);
}
function trianglepoint() {
  points.pointsarr.push([3]);
}
function download() {
  pg.save(pg,"pg","png"); 
}
