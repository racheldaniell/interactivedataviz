/* 1 - VARIABLES - CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = 50;


/* 2 - DATA - LOAD DATA */

d3.json("../data/environmentRatings.json", d3.autoType)
  .then(data => {
    console.log(data)

    /* 3 - SCALES */
    const xScale = d3.scaleLinear()
      .domain([0,d3.max(data, d => d.envScore2020)])
      .range([margin,width-margin])

    const yScale = d3.scaleLinear()
      .domain([0,d3.max(data, d => d.ideologyScore2020)])
      .range([height-margin,margin])

    const colorScale = d3.scaleOrdinal()
      .domain(["R","D","I"])
      .range(["red","blue","purple"])    
    /* 4 - ELEMENTS TO APPEND - HTML ELEMENTS */

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("transform", `translate(0,${height-margin})`)
      .call(xAxis)

    svg.append("g")
      .attr("transform",`translate(0,${margin}`)
      .call(yAxis)

    /* 5 - JOIN - SELECT-DATA-JOIN & DRAW */
     /* 6 - ATTRIBUTES TO FINISH DRAWING GRAPHICS */

    svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScale(d.envScore2020))
      .attr("cy", d => yScale(d.ideologyScore2020))
      .attr("r", 3)
      //.attr("fill", "purple")
      .attr("fill", d=> colorScale(d.Party))
 

    
  });
