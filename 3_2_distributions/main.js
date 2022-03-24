// RECIPE - reminder of what to look for below:
/* CONSTANTS AND GLOBALS */
/* APPLICATION STATE */
/* LOAD DATA */
/* INITIALIZING FUNCTION */
/* DRAW FUNCTION */

    // CONSTANTS AND GLOBALS - Variables  - set variables - const (unchanging) and let (changeable)
    // APPLICATION STATE - State -  create an object that holds our state can rewrite properties based on interactivity
    // LOAD DATA - Data -  this time store it in State
    // INITIALIZING FUNCTION - init() -  do all the things that run once (scales, main svg)
    // DRAW FUNCTION - draw() -  do all the things that can rewrite viz based on interactivity (append) or data change 

// --------

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8,
  height = window.innerHeight * .8,
  margin = {top: 10, bottom: 30, left: 40, right: 10},
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
};



/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  console.log(state.data)
  init();

});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {

  // + SCALES

  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.ideologyScore2020))
    .range([margin.left,width-margin.right])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.envScore2020))
    .range([height-margin.bottom, margin.top])


  // + AXES


  // + UI ELEMENT SETUP
 const selectElement = d3.select("#dropdown")

 selectElement.selectAll("option")
  .data([{key: "All", label:"All"}, 
        {key: "R", label:"Republican"},
        {key:"D", label:"Democrat"}])
  .join("option")
  .attr("value", d => d.key)
  .text(d => d.label)

  selectElement.on("change", event =>
  { 
    // console.log("something changed")
    state.selectedParty = event.target.value
    console.log(event.target.value)
    draw();
  } )

  ;
console.log(state.selectedParty)



  // + CREATE SVG ELEMENT
svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  // + CALL AXES

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedParty === d.Party || state.selectedParty === "All")
    console.log(filteredData)

  const dot = svg
    .selectAll("circle", d => d.BioID)
    .data(filteredData)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter
      .append("circle")
      .attr("r", radius*.5)
      .attr("cx",0))
      .attr("cy", d => yScale(d.envScore2020))
      .attr("fill", "black")
      .call(enter => enter
        .transition()
        .duration(1000)
        .attr("r", radius)
        .attr("cx", d => xScale(d.ideologyScore2020))
        .attr("cy", d => yScale(d.envScore2020))
        .attr("fill", "magenta")
      ,

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit.remove()
    );
}