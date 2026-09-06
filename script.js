let startLine = 30;
let finishLine = 400;

let spacing = 20;
let segmentSize = 30;
let eyeSize = 15;

let numCaterpillars = 4;
let caterpillarEnds = [];

let isRacing = false;
let startButton;

let colors = [
  [255, 215, 0],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
];

function setup() {
  createCanvas(500, 500);
  frameRate(3);

  for (let i = 0; i < numCaterpillars; i++) {
    caterpillarEnds.push(startLine);
  }

  startButton = createButton("START");
  startButton.center();
  startButton.position(200, 600);
  
  startButton.mousePressed(startRace);
}

function draw() {
  background(121, 96, 76);
  noStroke();
  fill(0);
  rect(startLine, 0, 5, height);
  fill(0, 255, 0);
  rect(finishLine, 0, 20, height);

  if (isRacing === true) {
    moveCaterpillars();
  } else { 
    writeStart();
  }

  drawCaterpillars();
  checkWinner();
}

function startRace() {
  isRacing = true;
  startButton.hide();
}

function writeStart() {
  textSize(24);
  textAlign(CENTER);
  fill(255);
  noStroke();

  text("Premi il bottone START per iniziare!", width / 2, height / 2 - 20);
}

function drawCaterpillar(color, x, y, segments) {
  for (let i = 0; i < segments; i += 1) {
    fill(color[0], color[1], color[2]);
    stroke(0);
    strokeWeight(1);
    circle(x, y, 50);
    x += spacing;
  }

  fill(0);
  stroke(255);
  strokeWeight(3);
  circle(x, y - eyeSize, eyeSize);
  circle(x - eyeSize, y - eyeSize, eyeSize);
}

function drawCaterpillars() {
  let padding = height / numCaterpillars;
  for (let i = 0; i < numCaterpillars; i += 1) {
    let y = (i + 0.5) * padding;
    let crawl = random(3, 6);

    drawCaterpillar(colors[i], caterpillarEnds[i], y, crawl);
  }
}

function moveCaterpillars() {
  for (let i = 0; i < numCaterpillars; i += 1) {
    let move = round(random(5, 30));
    caterpillarEnds[i] += move;
  }
}

function checkWinner() {
  for (let i = 0; i < caterpillarEnds.length; i += 1) {
    if (caterpillarEnds[i] >= finishLine) {
      textSize(24);
      textAlign(CENTER);
      fill(255);
      noStroke();

      text(`Caterpillar ${i + 1} wins!`, width / 2, height / 2);
      noLoop();
    }
  }
}