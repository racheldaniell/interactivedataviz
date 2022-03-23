// THE SAME AS EARLIER CODE SECTION - define some variables
/* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ,
//   radius = ;

// SOME ADDITIONS - adding let variables here
// since we use our scales in multiple functions, they need global scope
// let xScale, yScale;


// NEW CODE SECTION - helps us manage interactivity
/* APPLICATION STATE */
let state = {
  // data: [],
};

// THE SAME AS EARLIER CODE SECTION - load in data
/* LOAD DATA */
d3.csv('[PATH_TO_YOUR_DATA]', d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

// NEW CODE SECTION - contains earlier code sections grouped together - scales and svgs
/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */



  draw(); // calls the draw function
}

// NEW CODE SECTION - contains earlier code sections of data join and draw plus some additions
/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  
  /* HTML ELEMENTS */
 


}