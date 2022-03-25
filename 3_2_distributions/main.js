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
// for margins - let's get into our 4 different specifications habit
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.8,
  margin = {top: 10, bottom: 30, left: 40, right: 10},
  radius = 6;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
// DECLARE variables: go ahead and un-comment them out to real code
// leave variables UNDEFINED: we will set them in separate code areas below
// check out how we have named these LET variables - look familiar...?
// anything feel familiar from our 1_3 work...?
// imagine starting a chart project from scratch - which 3 of these would you most certainly need...? when would you need them?
// in our new recipe, these will be DEFINED in the INIT() INITIALIZING FUNCTION code section
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
// then we have our Application State OBJECT
// it has the properties set up that we will use to manage state for interactivity
// right now it is all set up for us
// later, when we change part of our code for interaction we'll return here
// let's go over what it is storing for us
// note 2 PROPERTIES
// property 1 - data = stores current data for viz
// property 2 - selectedParty = stores user selection
// we have set up selectedParty to default to "All" at page load
let state = {
  data: [],
  selectedParty: "All"
};

/* LOAD DATA */
// data load is set up for us already in this tutorial
// imagine adding your own data and what would need to change
// note what ".then" is doing re: delaying next code run till all data loaded
// note we are autotyping data in this tutorial
// note 2 important changes since old recipe
// 1 - data is being sent to state.data to be its starting value
// 2 - this code triggers launch of the init() INITIALIZING FUNCTION after .then
d3.json("../data/environmentRatings.json", d3.autoType).then(
  raw_data => {
    console.log("data", raw_data);
    state.data = raw_data;
    init();
  }
);

// just to review results you can always:  console.log('state', state)

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
// RUNS to generate the things that will stay the same
// our init() function runs here
// remember going over functions at beginning of course around 1_3...? see slides or JS resources
function init() {

  // + SCALES
  // we DON'T need CONST here with new recipe
  // we already DECLARED let xScale up above
  // so only need to DEFINE it here 
  // remove CONST and just have xScale = 
  // this may feel familiar from our 1_3 tutorial work
  // scale choice set for us plus same as in 2_2
  // set our DATA DOMAIN and VISUAL RANGE
  // let's look at our STATE.DATA to view data too
  // domain - could use d3.extent or could use d3.min, d3.max
  // domain - if use extent, no need for square brackets but otherwise, yes need since an array of min and max
  // NOW - something different with new recipe!
  // for our data domain, use STATE.DATA
  // for VISUAL RANGE use array []
  // array is furthest start point to furthest end point 
  // in which to translate data to visual space in future SVG
  // for X we want far left to far right in DRAWING space inside MARGINS
  // define the yScale for our use via earlier LET variable

  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.ideologyScore2020))
    .range([margin.left, width-margin.right])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.envScore2020))
    .range([height-margin.bottom,margin.top])

  colorScale = d3.scaleOrdinal()
    .domain(["R","D"])
    .range(["red", "blue"])

  
  // + AXES
  // create them here in relation to scales
  // then after SVG created below add them into the visual environment via svg.append("g")
  // we can code the axes last if we want to focus on interactivity first

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
  // here is where we will set up code to generate the HTML <select> values and connect them to our HTML
  // review the HTML file again to see where this JS result will go:  <select id="dropdown" name="dropdown"></select>
  // try adding some options manually in html (refreshing page load) to see non-dynamic way
  // then for dynamic: how do we "grab" element in JS? a Selection similar to grabbing our <div>s
  // then we will have it grab each option from our data
  // start by DECLARNG a const variable and DEFINING with a d3 selection
  // note we can use a const here and put it in INIT FUNCTION because the dropdown even when dynamic will only change on loading page, not in draw process
  // create your const with d3.select on specific element ID
  // then UNDER that/within just that element do a join with data using "three musketeers"/"triad" as we do for graphics
   // selecting all ONLY within this dropdown element so class not as critical
    // .data(new Set(state.data.map(d => d.Party))) // long term we will pull dynamically this way or else allData
    //.data(new Set(allData.map(d => d.Party))) // long term we will pull dynamically this way
    // state.data.map gets all values in d.Party and Set returns unique

    const dropdown = d3.select("#dropdown")

    dropdown.selectAll("option")
      .data(["All","R","D"])
      .join("option")
      .attr("value", d => d)
      .text(d=>d)
    
    // NEXT: we need to give this Selection an onChange event 
    // could do onChane in HTML as we did in Section I exerecies but preferable to add it to HTML VIA D3 instead for more dynamic flexibility
    // this is telling code/browser "on Event" do "This Thing"
    // we want it to update State setting selectedParty based on option from dropdown selected by user (the change made)
    // then with DRAW() we prompt draw function for re-drawing after selection is made/dropdown change
    // there is also a draw function trigger at end of overall INIT but that only draws once at page load
    
    dropdown.on("change", event => {
      console.log(event.target.value)
      state.selectedParty = event.target.value
      console.log("new state", state)
  
      draw();
    })
 

  // + CREATE SVG ELEMENT
  // already have SVG existing as a DECLARED LET VARIABLE
  // now need to DEFINE it via d3.select and append SVG as usual

  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  // now that we have our svg created we can add axes into it
  const xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0},${height - margin.bottom})`)
    .call(xAxis)

  const yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left},${0})`)
    .call(yAxis)

  draw(); // calls the draw function 
}

/* DRAW FUNCTION */
// moving on to our Draw Function
// we call this every time there is an update to the data/state
// A recipe of what to do on enter on update and on exit
// the first thing that we want to do is make sure we're getting the data right
// state.data is now all of the data
// in our state object we also have selectedParty
// we need to filter data from state.data on state.selectedParty
// based on the onChange dropdown Event of selection
// filter on state and return the data that we need to pass to our D3 function 

function draw() {

  // + FILTER DATA BASED ON STATE
  // you have "hint" code in your boilerplate
  // filter based on state.selectedParty 
  // returning only the matching data to draw with
  // filters based on whether records contain "R" or "D" or returns both if "All" is selected

  const filteredData = state.data
    .filter(d => state.selectedParty === d.Party || state.selectedParty === "All")

    console.log(filteredData)
  // console.log just to check our filter is working

  // next start drawing! using selectAll-.Data-.Join 
  // base it on the FILTERED data rather than full data
  // add a class as best practice (in case layer other graphics later)
  // make the join disaggregate into Enter-Update-Exit
  // you need to have exit to get filtered data to be drawn and removed properly
  // you also have control over Transitions
  // for scatterplots or other charts showing one-to-one relation to records, want to have unique identifier, the Bio.ID here so the specific record can be seen to be drawn (entered) and removed (exited)

  const dot = svg
    .selectAll("circle.dot")
    .data(filteredData, d => d.BioID)  // on the filtered data, with unique ID 
    .join(
      enter => enter.append("circle")
      .attr("class", "dot") 
      .attr("r", radius)
      .attr("cx", 0)
      .attr("cy", d => yScale(d.envScore2020))
      .attr("fill", "black")
      .call(enter => enter
        .transition()
        .duration(1000)
        .attr("cx", d => xScale(d.ideologyScore2020))
        .attr("fill", d => colorScale(d.Party)))
        ,
      update => update,
      exit => exit
      .transition()
      .duration(1000)
      .attr("fill", "gray")
      .attr("r", (radius * 0.25))
      .delay(250)
      .attr("cx", 0)
      .remove()
    )
  }

// code below is minimum needed to get circles to enter-update-exit if no transitions desired
/* 
    .join(
      enter => enter
      .append("circle")
      .attr("class", "dot")
      .attr("r", radius)
      .attr("cx", d => xScale(d.ideologyScore2020))
      .attr("cy", d => yScale(d.envScore2020))
      ,
      update => update ,
      exit => exit.remove()
    )
*/

