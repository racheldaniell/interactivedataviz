// 1 VARIABLES
// we define variables/globals we will use throughout

const width = window.innerWidth *.08;
const height = window.innerHeight /3;


// 2 DATA
// we have d3 load in our CSV file using "d3.csv"
// we have d3 guess our data types using "d3.autotype"
// we output that data to the console using console.log

d3.csv('../data/squirrelActivities.csv', d3.autoType).then(data => {
  console.log("data", data)


// 3 SCALES
// domain relates to data
// range relates to visuals
// we are using "d=> d.____" to tell it to get the value for each row in the column specified
// the data domain for numbers needs to use a max number using "d3.max"

const xScale = d3.scaleBand()
.domain(data.map(d=> d.activity))
.range([0, width])


const yScale = d3.scaleLinear()
.domain([0, d3.max(data, d=> d.count)]) 
.range([height, 0])  



// 4 ELEMENTS APPEND


// 5 SELECT - JOIN - DRAW


// 6 ATTRIBUTES



// everything with our data needs to happen within the brackets!
// these end brackets represent the end of data output area

})