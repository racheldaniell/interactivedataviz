/**
 * CONSTANTS AND GLOBALS
 * */
 const width = window.innerWidth * 0.9,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let tooltip;

/**
* APPLICATION STATE
* */
let state = {
  data: null,
  hover: null
};

/**
* LOAD DATA
* */
d3.json("../data/flare.json", d3.autotype).then(data => {
  state.data = data;
  console.log(state.data)
  init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {

const container = d3.select("#container")
  .style("position","relative");

svg = container 
  .append("svg")
  .attr("width", width)
  .attr("height", height);

tooltip = container.append("div")
  .attr("class", "tooltip")
  .style("top",0)
  .style("left",0)
  .style("color", "white")
  .style("position", "absolute");

const root = d3.hierarchy(state.data)
  .sum(d => d.value)
  .sort((a,b) => b.value - a.value);
  console.log(root)

const treeLayout = d3.treemap()
  .size([
  width - margin.left - margin.right,
  height - margin.top - margin.bottom])
  .paddingInner(2);

  const tree = treeLayout(root)
  const leaves = tree.leaves()

  console.log(tree)
  console.log(leaves)

  const leafGroups = svg
    .selectAll("g")
    .data(leaves)
    .join("g")
    .attr("transform", d => `translate(${d.x0}, ${d.y0})`)

  leafGroups.append("rect")
    .attr("fill", "purple")
    .attr("stroke", "gray")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)

  leafGroups
    .on("mouseenter", (event, d) => {
      state.hover = {
        position: [d.x0, d.y0],
        name: d.data.name
      }
      draw()
      console.log(state.hover)
    })
    .on("mouseleave", () => {
      state.hover = null
      draw();
      console.log(state.hover)
    })

  draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
  if (state.hover) {
    tooltip
    .html(`<div>${state.hover.name}</div>`)
    .transition()
    .duration(400)
    .style("opacity", 0.9)
    .style("transform",`translate(${state.hover.position[0]}px,${state.hover.position[1]}px)`)

  }

}