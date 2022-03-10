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

 /* SELECTALL-DATA-JOIN-DRAW */
 /* +ATTRIBUTES */

    /* 5 - JOIN - SELECT-DATA-JOIN & DRAW */
     /* 6 - ATTRIBUTES TO FINISH DRAWING GRAPHICS */

    svg.selectAll("circle")
      .data(data)
      .join(
        enter => enter
          .append("circle")
          .attr("r", 1)
          .attr("cx", d => xScale(d.envScore2020))
          .attr("cy", d => yScale(d.ideologyScore2020))
          .attr("fill", "black")
            .transition()
            .duration(4000) // in ms
            .delay(200)
              .attr("r", 10)
              .attr("fill", d=> colorScale(d.Party))


      )
        


    
  });
