const vertexNum = 8;

let centerX;
let centerY;
const lineNum = 100;

const radiusSet = [];
const noiseOffsetSet = [];

const xOffsetSet = [];
const yOffsetSet = [];

const updateNoiseOffset = () => {
  for (let i = 0; i < vertexNum; i++) {
    xOffsetSet[i] += 0.035;
    yOffsetSet[i] += 0.035;
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  centerX = width / 2;
  centerY = height / 2;

  strokeWeight(1.2);
  colorMode(HSB);

  for (let i = 0; i < vertexNum; i++) {
    xOffsetSet[i] = random(-100, 100);
    yOffsetSet[i] = random(-100, 100);
  }

  for (let i = 0; i < lineNum; i++) {
    radiusSet[i] = 200 + random(-24, 24);
    noiseOffsetSet[i] = random(-0.6, 0.6);
  }
}

function draw() {
  blendMode(BLEND);
  background(2);
  blendMode(SCREEN);

  const angle = radians(360 / vertexNum);
  for (let radiusIndex = 0; radiusIndex < lineNum; radiusIndex++) {
    const radius = radiusSet[radiusIndex];
    const noiseOffset = noiseOffsetSet[radiusIndex];
    const xPositionSet = new Array(vertexNum);
    const yPositionSet = new Array(vertexNum);

    for (let i = 0; i < vertexNum; i++) {
      xPositionSet[i] =
        cos(0.01 * radiusIndex + angle * i) * radius +
        (noise(xOffsetSet[i] + noiseOffset) - 0.5) * 200;
      yPositionSet[i] =
        sin(0.01 * radiusIndex + angle * i) * radius +
        (noise(yOffsetSet[i] + noiseOffset) - 0.5) * 200;
    }

    stroke(220 + radiusIndex * 2, 60, 80, 0.8);

    beginShape();
    curveVertex(
      xPositionSet[vertexNum - 1] + centerX,
      yPositionSet[vertexNum - 1] + centerY
    );

    for (let i = 0; i < vertexNum; i++) {
      curveVertex(xPositionSet[i] + centerX, yPositionSet[i] + centerY);
    }

    curveVertex(xPositionSet[0] + centerX, yPositionSet[0] + centerY);
    curveVertex(xPositionSet[1] + centerX, yPositionSet[1] + centerY);
    endShape();
  }

  updateNoiseOffset();
}
