let weightX = [0.1, 0.5, 0.7]; // Initial weights
const combinationsX = [
  [0, 0, 0], // X1, X2, X3 combinations
  [0, 0, 1],
  [0, 1, 0],
  [0, 1, 1],
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 1],
];

const thresholdArrayT = [1, 1, 1, 1, 0, 0, 0, 1];
const weightFactor = 0.05;
let eraCounter = 0;

function teachPerceptron(weight, combinations, eraCounter) {
  console.log("Epoch " + eraCounter);

  let weightArray = [];
  let results = [];
  let thresholdArrayY = [];

  // Process each combination (X1, X2, X3)
  for (let i = 0; i < combinations.length; i++) {
    let mulA = combinations[i].map((x, j) => x * weight[j]); // Multiply X1, X2, X3 by their weights
    let sumA = mulA.reduce((acc, val) => acc + val, 0); // Sum the results
    let thresholdValueY = sumA > 0.8 ? 1 : 0; // Activation function

    if (sumA === 0) {
      thresholdValueY = 1;
    }

    thresholdArrayY.push(thresholdValueY);

    if (thresholdArrayT[i] !== thresholdValueY) {
      let speedFactor = weightFactor * (thresholdArrayT[i] - thresholdValueY);
      let updatedWeight = combinations[i].map((x) => x * speedFactor);
      weight = weight.map((w, i) => w + updatedWeight[i]); // Update weights
    }

    weightArray.push(weight);
    results.push([
      ...combinations[i],
      ...weight,
      sumA.toFixed(2),
      thresholdValueY,
      thresholdArrayT[i],
    ]);
  }

  printResults(results, eraCounter);
  return weight;
}

function printResults(results, eraCounter) {
  let tableHTML = `
    <h4>Epoch ${eraCounter}</h4>
    <table>
      <thead>
        <tr>
          <th>X1</th>
          <th>X2</th>
          <th>X3</th>
          <th>W1</th>
          <th>W2</th>
          <th>W3</th>
          <th>A</th>
          <th>Y</th>
          <th>T</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Fill in the table rows
  results.forEach((row) => {
    tableHTML += `
      <tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3].toFixed(2)}</td>
        <td>${row[4].toFixed(2)}</td>
        <td>${row[5].toFixed(2)}</td>
        <td>${row[6]}</td>
        <td>${row[7]}</td>
        <td>${row[8]}</td>
      </tr>
    `;
  });

  tableHTML += `</tbody></table>`;

  const container = document.getElementById("results-container");
  const section = document.createElement("section");
  section.innerHTML = tableHTML;
  container.appendChild(section);
}

let oldWeightX = [];

while (true) {
  weightX = teachPerceptron(weightX, combinationsX, eraCounter);

  // Check if weights have changed, if not, stop training
  if (JSON.stringify(oldWeightX) !== JSON.stringify(weightX)) {
    oldWeightX = [...weightX];
    eraCounter++;
  } else {
    break;
  }
}
