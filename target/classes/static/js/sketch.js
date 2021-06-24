let points = { pointsarr: [] };
let timerID = setInterval(() => checkPoints(), 5000);

function checkPoints() {
  let msg = points;
  points = {pointsarr: []};
  //fetch("/points?payload=" + JSON.stringify(points)).then((res) => res.json());
  fetch("/points", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(msg), // body data type must match "Content-Type" header
  }).then((res) => res.json()).then(result => console.log(result));
}
//Este código asume que las librerías de P5.js ya están cargadas.
//Esta función se ejecuta una sola vez al inicio del script.
function setup() {
  createCanvas(640, 480);
}
// Esta función se ejecuta repetidas veces indefinidamente.
function draw() {
  if (mouseIsPressed === true) {
    fill(0, 0, 0);
    ellipse(mouseX, mouseY, 20, 20);
    points.pointsarr.push([mouseX, mouseY]);
  }
  if (mouseIsPressed === false) {
    fill(255, 255, 255);
  }
}
