/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8,
height = window.innerHeight * 0.8,
margin = {top: 20, bottom: 35, left: 30, right: 10};


/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType)
.then(data => {
 console.log(data)

 /* SCALES */

 const xScale = d3.scaleLinear()
   .domain([0,d3.max(data, d => d.envScore2020)])
   .range([margin.left, width-margin.right])

 const yScale = d3.scaleLinear()
   .domain([0,d3.max(data, d => d.ideologyScore2020)])
   .range([height-margin.bottom,margin.top])

 const colorScale = d3.scaleOrdinal()
   .domain(["R","D","I"])
   .range(["red","blue","purple"])

 /* ELEMENTS */

 const svg = d3.select("#container")
   .append("svg")
   .attr("width", width)
   .attr("height", height)

 const xAxis = d3.axisBottom(xScale)
 const yAxis = d3.axisLeft(yScale)

 svg.append("g")
   .attr("transform", `translate(0,${height-margin.bottom})`)
   .call(xAxis)

 svg.append("g")
   .attr("transform", `translate(${margin.left},0)`)
   .call(yAxis)

/*   // EXTRAS - Legend examples
  // make array
const partyNames = ["Republican", "Democrat", "Other"]

// Add labels from array
myLegend1.selectAll("myLabel")
  .data(partyNames)
  .enter()
  .append("text")
  .attr("x", 100 + sizeA*.8)
  .attr("y", function(d,i){ return i * (sizeA + 1) + (sizeA/2)})
  .style("fill", "black")
  .text(function(d){ return d})
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")
 
// LEGEND OPTIONS

// OPTION 1 - based on code you sent
// might be good to put legend in its own <div> 
// this new const variable svgLegend can hold the legend
// requires adding this in html above "container" div:  <div id=legendbox></div> 

const svgLegend = d3.select("#legendbox")
  .append("svg")
  .attr("width", width)
  .attr("height", 100)
 */
/* 
const legend = ["Republican", "Democrat", "Other"];
    console.log(legend) // this is just to check, not necessary
    legend.forEach(lgd => console.log(lgd));
const legendcolor = ["red", "blue", "black"];
    console.log(legendcolor)
    legendcolor.forEach(lgdcl => console.log(lgdcl));

    
   legend.forEach((element, index) => //  grabbing the i index too for positioning
      svgLegend.append("text")
          .attr("x", 40) // a number for specific position
          .attr("y", index*20 + 20)
          .style("text-anchor", "start")
          .style("alignment-baseline", "middle") // to align with circles center
          .style("font-size", 20) 
          .style("fill", "black")
          .text(element)     
    )

    // legendcolor.forEach(element => 
    legendcolor.forEach((element, index) => //  grabbing the i index too for positioning
      svgLegend.append("circle")
          .attr("cx", 20) //a number for specific position
          .attr("cy", index*20 + 20) // 20 is where the first dot appears, each next will spread based on this and size variable
          .style("fill", element) 
          .attr("r", 8)  
    )

// OPTION 2 - a quick manual legend also in a new <div>
// requires adding this in html above "container" div:  <div id=legendbox0></div> 

const svgLegend0 = d3.select("#legendbox0")
.append("svg")
.attr("width", width)
.attr("height", 80) // height just sized to preference/visibility minimum 

//legend
svgLegend0.append("circle")
  .attr("cx",20)
  .attr("cy",10)
  .attr("r", 6)
  .style("fill", "red")
svgLegend0.append("circle")
  .attr("cx",40)
  .attr("cy",30)
  .attr("r", 6)
  .style("fill", "blue")
svgLegend0.append("circle")
  .attr("cx",60)
  .attr("cy",50)
  .attr("r", 6)
  .style("fill", "black")
svgLegend0.append("text")
  .attr("x", 30)
  .attr("y", 10)
  .text("Republican")
  .style("font-size", "15px")
  .attr("alignment-baseline","middle")
svgLegend0.append("text")
  .attr("x", 50)
  .attr("y", 30)
  .text("Democrat")
  .style("font-size", "15px")
  .attr("alignment-baseline","middle")
svgLegend0.append("text")
  .attr("x", 70)
  .attr("y", 50)
  .text("Other Party")
  .style("font-size", "15px")
  .attr("alignment-baseline","middle")
 */

 // OPTION 2 - a quick manual legend also in a new <div>

 const svgLegend0 = d3.select("#legendbox0")
  .append("svg")
  .attr("width", width)
  .attr("height", 80) // height just sized to spec 

//legend
svgLegend0.append("circle").attr("cx",20).attr("cy",10).attr("r", 6).style("fill", "red")
svgLegend0.append("circle").attr("cx",20).attr("cy",30).attr("r", 6).style("fill", "blue")
svgLegend0.append("circle").attr("cx",20).attr("cy",50).attr("r", 6).style("fill", "black")
svgLegend0.append("text").attr("x", 30).attr("y", 10).text("Republican Party Congressmember").style("font-size", "15px").attr("alignment-baseline","middle")
svgLegend0.append("text").attr("x", 30).attr("y", 30).text("Democratic Party Congressmember").style("font-size", "15px").attr("alignment-baseline","middle")
svgLegend0.append("text").attr("x", 30).attr("y", 50).text("Other Party Congressmember").style("font-size", "15px").attr("alignment-baseline","middle")
  

/* // OPTION 3 - pull from array

// Add the legend to a separate <div>
const myLegend1 = d3.select("#legendbox1")
  .append("svg")
  .attr("width", width)
  .attr("height", 70)

const sizeA = 20

const partyNames = ["Republican", "Democrat", "Other"]
  console.log(partyNames)

// Add circle for each item in partyNames and assign a color
myLegend1.selectAll("myShape")
  .data(partyNames)
  .enter()
  .append("circle")
    .attr("cx", 100)
    .attr("cy", function(d,i){ return 10 + i*(sizeA+1)}) // 100 is where the first dot appears, each next will spread based on this and size variable
    .attr("r", 7)
    .style("fill", d => {
      if (d === "Republican") return "red";
      else if (d === "Democrat") return "blue";
      else return "black"}) 
      .style("fill", "purple")
      .attr("r", d => {
        if (d === "Republican") return "2";
        else if (d === "Democrat") return "6";
        else return "9"})
 
// make array
const partyNames = ["Republican", "Democrat", "Other"]
// Add labels from array
myLegend1.selectAll("myLabel")
  .data(partyNames)
  .enter()
  .append("text")
  .attr("x", 100 + sizeA*.8)
  .attr("y", function(d,i){ return i * (sizeA + 1) + (sizeA/2)})
  .style("fill", "black")
  .text(function(d){ return d})
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")


// ALT OPTION - Method - more automated from data set values
// based on dataset and color scale from 2_2 Tutorial in-class scatterplot code/data
// but typically legends are small/distinct enough to merit manual setup
// here we use that there is a color scale already defined above in Scales area
// also dropped into a new, separate <div> put into HTML above "container"
// add to HTML:    <div id="legendbox1"></div>
/* 
const myLegend2 = d3.select("#legendbox1")
.append("svg")
.attr("width", width)
.attr("height", 70)

// get the values from original data set using .map and also .filter to get only unique
const partyValues = data.map(d => d.Party)
  .filter((value, index, self) => self.indexOf(value) === index)
console.log(partyValues) // just a visual check


// Add circle for each item mapped/filtered in partyValues and assign a color based on previously defined variable: colorScale
myLegend2.selectAll("circle")
  .data(partyValues)
  .enter()
  .append("circle")
  .attr("class", "legend-shape")
  .attr("cx", margin.left + 10)
  .attr("cy", function(d,i){ return 10 + (i*20)})  
  .attr("r", 7)
  .style("fill", colorScale)
 
// Add labels from data mapping in partyValues beside legend dots
myLegend2.selectAll("label")
  .data(partyValues)
  .enter()
  .append("text")
  .attr("class", "legend-text")
  .attr("x", margin.left + 25)
  .attr("y", function(d,i){ return 10 + (i * 20)})
  .style("fill", "black")
  .text(function(d){ return d})
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")
    */
 
 /* SELECTALL-DATA-JOIN-DRAW */
 /* +ATTRIBUTES */

 svg.selectAll("circle.dot")
   .data(data)
   .join(enter => enter
     .append("circle")
     .attr("class", "dot")
       .attr("r", 2)
       .attr("cx", d => xScale(d.envScore2020))
       .attr("cy", d => yScale(d.ideologyScore2020))
       .style("fill", "gray")
        .transition()
        .duration(2000)
        .delay(200)
       // .call(enter => enter.transition()
       //   .delay((d, i) => xScale(d.envScore2020) * 50)
       //   .duration(500)
          .attr("r", 20)
          .style("fill", d => colorScale(d.Party))
          .transition()
          .duration(700)
          .delay(200)
          .attr("r", 8)
       //  .style("fill", "yellow")
       )


   // .join("circle")
   // .attr("cx", d => xScale(d.envScore2020))
   // .attr("cy", d => yScale(d.ideologyScore2020))
   // .attr("r", 3)
   // .attr("fill", d => colorScale(d.Party))

 // RETURN TO ELEMENTS SECTION AND APPEND AXES 


});
