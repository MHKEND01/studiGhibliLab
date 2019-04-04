data = d3.json("https://ghibliapi.herokuapp.com/species");

data.then(function(data)
{
      d3.select("table")
      .select("tr")
      .selectAll("td")
      .data(data)
      .enter()
      .append("td")
      .html(function(d){return d.name})

      d3.select("table")
      .select("tr:last-child")
      .selectAll("td")
      .data(data)
      .enter()
      .append("td")
      .html(function(d){return d.classification})

      var svg3 = body.append("svg")
            .attr("width",width)
            .attr("height",height)
            .classed("svg3",true);



var title = svg3.append("text")
      .text("Cumulative Grade Distribution For Day")
      .attr("x",((width/2)-30))
      .attr("y", margins.top-5);
var yLabel = svg3.append("text")
.text("Proportion of Students")
.attr("x",margins.left-45)
.attr("y", (height+50)/2)
.attr("transform","translate(15,0) rotate(-90,"+(margins.left-45)+","+((height+50)/2)+")");

var xLabel = svg3.append("text")
.text("Grade")
.attr("x",(width/2)+50)
.attr("y", (height-10));

var margins ={
  top:20,
  bottom:50,
  left:50,
  right:10
}
var width = 800;
var height = 400;
plotWidth = width - margins.left -margins.right;
plotHeight = height-margins.top-margins.bottom;
var eyeColors = [];
data.forEach(function(d,i)
{
  if (eyeColors.includes(d.name) ===false)
  {
    eyeColors.push(d.name);
  }
}
)

var eyeColorsTotal = [];
data.forEach(function(d,i)
{
    eyeColorsTotal.push(d.name);
}
)
var xScaleHist = d3.scaleOrdinal()
               .domain(eyeColors)//d3.min(gradesDay15), d3.max(gradesDay15)])
               .range([0, plotWidth]);

var binMaker = d3.histogram()
                .domain(xScaleHist.domain())
                .thresholds(eyeColors.length);

var barWidth=plotWidth/eyeColors.length;
var bins = binMaker(eyeColorsTotal);

var yScaleHist = d3.scaleLinear()
             .domain([0,
               d3.max(bins, function(d) 
               {return d.length;}
             )])
             .range([plotHeight, margins.top]);

 var plot = svg3.append('g')
 .classed('plot', true);

 var frequency_rects = plot.selectAll('rect')
                   .data(bins)
                   .enter()
                   .append('rect')
                   .attr('x', function(d,i){ return xScaleHist((i)/eyeColors.length) ; })
                   .attr('y', function(d){ return yScaleHist(d.length)}) // Percentage returns the amount of values in each bin divided by the total amount of the array.
                   .attr('width', function(d){
                         return (barWidth-0.1)
                       })
                   .attr('height', function(d){
                    // console.log(percentage(d));
                     return (plotHeight - yScaleHist(d.length)); })
                   .attr('fill', 'blue');

})
