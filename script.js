var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);

const slider = document.getElementById("number-of-intervals");
const slider_text = document.getElementById("slider-text");
var n = slider.value;

const dropdown = document.getElementById("drop-down");
var type = dropdown.value;
// calculator.updateSettings({administerSecretFolders: true});

// Sync Desmos and Vars
var initialState = {
  version: 1,
  graph: {
    showGrid: true,
    showXAxis: true,
    showYAxis: true,
    xAxisStep: 0,
    yAxisStep: 0,
    xAxisMinorSubdivisions: 0,
    yAxisMinorSubdivisions: 0,
    xAxisArrowMode: "NONE",
    yAxisArrowMode: "NONE",
    xAxisLabel: "",
    yAxisLabel: "",
    xAxisNumbers: true,
    yAxisNumbers: true,
    polarMode: false,
    polarNumbers: true,
    degreeMode: false,
    projectorMode: false,
    squareAxes: true,
    viewport: { xmin: -20, ymin: -13.54387107276575, xmax: 20, ymax: 20 },
  },
  expressions: {
    list: [
      {
        id: "hidden",
        type: "folder",
        title: "Hidden",
        memberIds: {
          intervals: true,
          "left-endpoint": true,
          "right-endpoint": true,
          orientation: true,
          approximation: true,
          graph: true,
          "left-bound": true,
          "right-bound": true,
          "top-bound": true,
          "inequality-fill": true,
          width: true,
          a: true,
          b: true,
          c: true,
        },
        hidden: false,
        collapsed: false,
        secret: true,
      },
      // General
      { id: "intervals", type: "expression", latex: `n=${n}` },
      { id: "left-endpoint", type: "expression", latex: "a=-20" },
      { id: "right-endpoint", type: "expression", latex: "b=20" },
      { id: "orientation", type: "expression", latex: "c=0" },
      // Integral Approximation
      {
        id: "approximation",
        type: "expression",
        latex:
          "I=\\sum_{i=0}^{n\\ -\\ 1}f\\left(s\\left(i\\right)\\right)\\cdot w",
      },
      // Curves and Coloring
      { id: "graph", type: "expression", latex: "y=f\\left(x\\right)" },
      { id: "left-bound", type: "expression", latex: "x=a" },
      { id: "right-bound", type: "expression", latex: "x=b" },
      {
        id: "top-bound",
        type: "expression",
        latex:
          "f\\left(s_{x}\\left(x\\right)\\right)\\le y\\le0\\left\\{a\\le x\\le b\\right\\}",
      },
      {
        id: "inequality-fill",
        type: "expression",
        latex:
          "0\\le y\\le f\\left(s_{x}\\left(x\\right)\\right)\\left\\{a\\le x\\le b\\right\\}",
        color: "#4F81BD",
      },
      // Formulas
      { id: "width", type: "expression", latex: "w=\\frac{b-a}{n}" },
      {
        id: "a",
        type: "expression",
        latex: "s\\left(m\\right)=a+w\\left(m+c\\right)",
        hidden: true,
      },
      {
        id: "b",
        type: "expression",
        latex:
          "n_{x}\\left(x\\right)=\\operatorname{floor}\\left(\\frac{x-a}{w}\\right)",
        hidden: true,
      },
      {
        id: "c",
        type: "expression",
        latex:
          "s_{x}\\left(x\\right)=\\left\\{a\\le x\\le b:\\ s\\left(n_{x}\\left(x\\right)\\right)\\right\\}",
        hidden: true,
      },
      // Text
      {
        id: "instructions",
        type: "text",
        text: "Enter your equation (do not delete f(x)):",
      },
    ],
  },
};
calculator.setState(initialState);
calculator.updateSettings({ lockViewport: true });
calculator.setExpression({
  id: "input",
  latex: "f\\left(x\\right)=10\\sin\\left(\\frac{1}{2}x\\right)",
});

slider_text.innerHTML = `n = ${n}`;

slider.addEventListener("input", (e) => {
  n = slider.value;
  slider_text.innerHTML = `n = ${n}`;
  calculator.setExpression({ id: "intervals", latex: `n=${n}` });
});

dropdown.addEventListener("change", (e) => {
  type = dropdown.value;
  console.log(type);
  calculator.setExpression({ id: "orientation", latex: `c=${type}` });
});

console.log(n);
