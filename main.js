let weightX = [0.1, 0.5, 0.7];

// const combinationsX = [
//   [1, 1, 1],
//   [0, 1, 1],
//   [1, 0, 1],
//   [0, 0, 1],
//   [1, 1, 0],
//   [0, 1, 0],
//   [1, 0, 0],
//   [0, 0, 0],
// ];
const combinationsX = [
  [0, 0, 0],
  [0, 0, 1],
  [0, 1, 0],
  [0, 1, 1],
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 1],
];

let eraСounter = 0;

function teachPerceptron(weight, combinations, eraСounter) {
  console.log("counter-" + eraСounter);
  let mulArray = [];
  let sumArray = [];
  let thresholdArrayY = [];
  let weightArray = [];

  // const thresholdArrayT = [1, 1, 1, 0, 1, 1, 1, 1];
  const thresholdArrayT = [1, 1, 1, 1, 0, 0, 0, 1];
  const weightFactor = 0.05;

  for (let i = 0; i < combinations.length; i++) {
    let mulA = [];
    let sumA = [];
    let thresholdValueY = [];

    for (let j = 0; j < combinations[i].length; j++) {
      mulA[j] = combinations[i][j] * weight[j];

      sumA = mulA.reduce(function (x, y) {
        return x + y;
      }, 0);

      thresholdValueY = sumA > 0.8 ? 1 : 0;
      if (sumA == 0) {
        thresholdValueY = 1;
      }
    }
    thresholdArrayY.push(thresholdValueY);
    mulArray.push(mulA);
    sumArray.push(Number(sumA.toFixed(2)));

    if (thresholdArrayT[i] !== thresholdValueY) {
      let speedFactor = weightFactor * (thresholdArrayT[i] - thresholdValueY);

      let updatedWeight = combinations[i].map((x) => x * speedFactor);
      weight = weight.map((a, i) => a + updatedWeight[i]);
    }
    weightArray.push(weight);
  }
  printMultiMatrix(
    combinationsX,
    combinationsX.length,
    combinationsX[0].length,
    "combinationsX",
    eraСounter,
    ["x1", "x2", "x3"]
  );
  printMultiMatrix(
    weightArray,
    weightArray.length,
    weightArray[0].length,
    "weight",
    eraСounter,
    ["w1", "w2", "w3"]
  );
  printMatrix(sumArray, sumArray.length, "sumArray", eraСounter, "A");

  printMatrix(
    thresholdArrayY,
    thresholdArrayY.length,
    "thresholdArrayY",
    eraСounter,
    "Y"
  );
  printMatrix(
    thresholdArrayT,
    thresholdArrayT.length,
    "thresholdArrayT",
    eraСounter,
    "T"
  );

  console.log(weight);
  console.log(sumArray);
  return weight;
}
let oldWeightX = [];

while (true) {
  weightX = teachPerceptron(weightX, combinationsX, eraСounter);

  if (oldWeightX !== weightX) {
    oldWeightX = weightX;
    eraСounter++;
  } else {
    break;
  }
}

function printMultiMatrix(
  array,
  matrixSizeA,
  matrixSizeB,
  matrixClass,
  eraСounter,
  title
) {
  let matrixArrayOfElements = [];
  matrixArrayOfElements.push(`<table>`);
  matrixArrayOfElements.push(
    `<tr><td>${title[0]}</td><td>${title[1]}</td><td>${title[2]}</td></tr>`
  );
  for (i = 0; i < matrixSizeA; i++) {
    matrixArrayOfElements.push(`<tr>`);
    for (j = 0; j < matrixSizeB; j++) {
      matrixArrayOfElements.push(
        `<td> ${Number(array[i][j].toFixed(2))} </td>`
      );
    }
    matrixArrayOfElements.push(`</tr>`);
  }
  matrixArrayOfElements.push(`</table>`);

  document.getElementById(matrixClass + "-" + eraСounter).innerHTML =
    matrixArrayOfElements.join(",").replaceAll(",", "");
}

function printMatrix(array, matrixSizeA, matrixClass, eraСounter, title) {
  let matrixArrayOfElements = [];
  matrixArrayOfElements.push(`<table>`);
  matrixArrayOfElements.push(`<tr><td>${title}</td></tr>`);
  for (i = 0; i < matrixSizeA; i++) {
    matrixArrayOfElements.push(`<tr>`);
    matrixArrayOfElements.push(`<td> ${array[i]} </td>`);
    matrixArrayOfElements.push(`</tr>`);
  }
  matrixArrayOfElements.push(`</table>`);

  document.getElementById(matrixClass + "-" + eraСounter).innerHTML =
    matrixArrayOfElements.join(",").replaceAll(",", "");
}
