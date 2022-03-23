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
  // margin - let's get into our specification habit
  margin = {top: 10, bottom: 30, left: 40, right: 10},
  radius = 5;

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
let state = {
  data: [],
  selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
};

// let allData; // only if need all data/raw for something later outside of load data block

/* LOAD DATA */
// data load is set up for us already in this tutorial
// imagine adding your own data and what would need to change
// note what ".then" is doing re: delaying next code run till all data loaded
// note we are autotyping data in this tutorial
// note 2 important changes since old recipe
// 1 - data is being sent to state.data to be its starting value
// 2 - this code triggers launch of the init() INITIALIZING FUNCTION after .then
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // NEW! save our data to application state
  console.log(state)  // just to look
  state.data = raw_data;
  // allData = raw_data; // not needed now
  console.log(state)  // just to look
  // console.log("all data reference :", allData) // not needed now
  // NEW! launch running the init() function
  init();
  // NEW! we can now end this code block before running rest
});

console.log('state', state) // just to review results

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
// RUNS to generate the things that will stay the same
// our init() function runs here
// remember going over functions at beginning of course around 1_3...? see slides or JS resources
function init() {

  // + SCALES
  // we actually DON'T need CONST here with new recipe
  // we already DECLARED let xScale up above
  // so only need to DEFINE it here 
  // remove CONST and just have xScale = 
  // this may feel familiar from our 1_3 tutorial work
  // scale choice set for us plus same as in 2_2
  // set our DATA DOMAIN and VISUAL RANGE
  // let's look at our STATE.DATA to view data too
xScale = d3.scaleLinear()
  // domain - could use d3.extent or could use d3.min, d3.max
  // domain - if use extent, no need for square brackets but otherwise, yes need since an array of min and max
  // NOW - something different with new recipe!
  // for our data domain, use STATE.DATA
  .domain(d3.extent(state.data, d => d.ideologyScore2020))
  // for VISUAL RANGE use array []
  // array is furthest start point to furthest end point 
  // in which to translate data to visual space in future SVG
  // for X we want far left to far right in DRAWING space inside MARGINS
  .range([margin.left, width-margin.right])

// define the yScale for our use via earlier LET variable
yScale = d3.scaleLinear()
  .domain(d3.extent(state.data, d => d.envScore2020))
  .range([height-margin.bottom, margin.top])

colorScale = d3.scaleOrdinal()
  .domain(d3.extent(state.data, d => d.Party))
  .range(["blue","red"])

  // console.log((d3.extent(state.data, d => d.Party)))

  // + AXES
  // we can set the axes last if we want to focus on interactivity first

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

  const selectElement = d3.select("#dropdown")

    selectElement.selectAll("option")  // selecting all ONLY within this dropdown element so class not as critical
    // .data(new Set(state.data.map(d => d.Party))) // long term we will pull dynamically this way or else allData
    //.data(new Set(allData.map(d => d.Party))) // long term we will pull dynamically this way
    // state.data.map gets all values in d.Party and Set returns unique
    .data([
      {key: "All", label:"All"},
      {key: "R", label:"Republican"},
      {key: "D", label:"Democrat"},
    ])
    //.data(new Set(state.data.map(d => d.Party)))
    .join("option") // once you get to this line save and check in browser that you see options
    .attr("value", d => d.key)
    .text(d => d.label) // we just want it to return itself as text into option

    // NEXT: we need to give this Selection an onChange event 
    // could do in HTML but preferable to add it to HTML VIA D3 instead for more dynamic flexibility
    // this is telling code/browser "on Event" do "This Thing"
    // two things to make happen onChange
    selectElement.on("change", event =>  { 
      //console.log("something changed") 
      // now we need to 1) update State setting selectedParty
      // and 2)
      // this is where we tell it the things to do
      state.selectedParty = event.target.value
      draw();  // this is the time we prompt re-drawing after selection
      // there is also a draw function at end of INIT but that only draws once
    })
    


  // + CREATE SVG ELEMENT
  // already have SVG existing as a DECLARED LET VARIABLE
  // now need to DEFINE it via d3.select and append SVG as usual

  svg = d3.select("#container")
  .append("svg")
  .attr("width",width)
  .attr("height",height)


  // BUILD + CALL AXES

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
 
  svg.append("g")
    .attr("transform", `translate(${0},${height-margin.bottom})`)
    .call(xAxis)
 
  svg.append("g")
    .attr("transform", `translate(${margin.left},${0})`)
    .call(yAxis)

  draw(); // calls the draw function 
}

/* DRAW FUNCTION */
// moving on to our Draw Function
// we call this every time there is an update to the data/state
/* A recipe of what to do on enter on update and on exit
the first thing that we want to do is make sure we're getting the data right
state.data is now all of the data
in our state object we also have selectedParty
we need to filter data on selectedParty
based on the onChange dropdown Event of Selection
filter on state and return the data that we need to pass to our D3 function */

function draw() {

  // + FILTER DATA BASED ON STATE
  // you have "hint" code in your boilerplate
  // filter based on state.selectedParty 
  // returning only the matching data back to our state.data
  const filteredData = state.data
    .filter(d => state.selectedParty === d.Party || state.selectedParty === "All")

    console.log(filteredData)
    // filter if the item matches the selected party
    // .filter(d => state.selectedParty === "All" || state.selectedParty === d.Party)

  // next start drawing! using selectAll-Data-Join 
  // base it on the FILTERED data rather than full data

  const dot = svg
    .selectAll("circle.dot")
    .data(filteredData, d => d.BioID)  // on the filtered data
    // let's make the join disaggregate into Enter-Update-Exit
    // to have more control over Transitions let's change options in select to manual
    // try selecting - anything odd...?
    // that's why we need the Bio.ID, a unique identifier, for single dot = single record type charts
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
        //.attr("r", radius)
        .attr("cx", d => xScale(d.ideologyScore2020))
        .attr("cy", d => yScale(d.envScore2020))
        .attr("fill", d => colorScale(d.Party))
      )
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

    // add a class as best practice
    // check results in the browser console (note data qtys) then...
    // add at least the 3 attributes we need to see the circles
    // note again they draw only after selection is made to generate filteredData
/* 
    .join(
      enter => enter.append("circle"),
      update => update ,
      exit => exit.remove()
    ) */




/*   const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.BioID)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter,

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit
    ); */

