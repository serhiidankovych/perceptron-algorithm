const weightFactor = 0.05;
const thresholdArrayT = [1, 1, 1, 1, 0, 0, 0, 1];
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
let weightX = [0.1, 0.5, 0.7];

function teachPerceptron(weight, combinations) {
  const updatedWeights = [...weight];
  const results = {
    combinations,
    weights: [],
    sums: [],
    outputs: [],
    targets: thresholdArrayT,
  };

  combinations.forEach((comb, index) => {
    const sum = comb.reduce((acc, x, i) => acc + x * updatedWeights[i], 0);
    const output = sum > 0.8 ? 1 : 0;
    results.sums.push(sum.toFixed(2));
    results.outputs.push(output);

    if (thresholdArrayT[index] !== output) {
      const correction = weightFactor * (thresholdArrayT[index] - output);
      comb.forEach((x, i) => {
        updatedWeights[i] += x * correction;
      });
    }
    results.weights.push([...updatedWeights]);
  });

  return results;
}

function displayResults(results, era) {
  const container = document.getElementById("results-container");
  const section = document.createElement("section");
  section.innerHTML = `
    <h4>Era ${era}</h4>
    ${generateTable(results.combinations, "Combinations", ["X1", "X2", "X3"])}
    ${generateTable(results.weights, "Weights", ["W1", "W2", "W3"])}
    ${generateTable([results.sums], "Sums", ["A"])}
    ${generateTable([results.outputs], "Outputs", ["Y"])}
    ${generateTable([results.targets], "Targets", ["T"])}
  `;
  container.appendChild(section);
}

function generateTable(data, title, headers) {
  const table = `
    <table>
      <caption>${title}</caption>
      <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
      ${data.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
    </table>
  `;
  return table;
}

function runPerceptronTraining(initialWeights, combinations) {
  let weights = [...initialWeights];
  let era = 0;

  while (true) {
    const results = teachPerceptron(weights, combinations);
    displayResults(results, era);

    if (JSON.stringify(weights) === JSON.stringify(results.weights[results.weights.length - 1])) {
      break;
    }

    weights = [...results.weights[results.weights.length - 1]];
    era++;
  }
}

runPerceptronTraining(weightX, combinationsX);
