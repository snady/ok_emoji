
//animated pie chart from d3 library

var count = 0;
var dt = data[count];
console.log(dt);

var categories = ["Republican", "Democrat", "Independent", "Don't Know", "Leaning Republican", "Leaning Democratic"];

//storing percentage data
var dl = [];
for(var key in dt){
  dl.push(dt[key]);
}

console.log(dl);

//UGH LOL just gonna make a new array whatever

var dp = dl.slice(1,7);
console.log(dp);

var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"];

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d, i) {
	    console.log(dp[i]);
	    return dp[i];
    });



var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(dp))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i){
	    console.log(color[i]);
	    return color[i];
	}
    );

    g.append("text")
        .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
    })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
    .text(function (d, i){
	return categories[i] + ": " + dp[i] + "%";
    });
