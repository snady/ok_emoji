
//populates the select dropdown!
var categoryList = d3.select("#category");
categoryList.selectAll('div').data(Object.keys(data))
  .enter().append('div')
  .append('input')
  .attr({
    type:"radio",
    name:"category",
    value:function(d){return d;},
  }).on('change', function(d){changechart(d);})
  .select(function(){return this.parentNode;})
  .append('label')
  .text(function(d){return d;});
//changes chart!
var subindex = ""; 
var create = false;
var changechart = function(d){
    console.log(d);
    subindex = d;
    createChart(data[subindex], 0); 
};

function createChart(dt,c){ 
    var count=c;
    d3.select("svg").remove();
    //storing percentage data 
    var keys = Object.keys(dt);
    console.log(dt);

    console.log(keys[count]);

    //getting actual percentages
    var dd = []; 
    for(key in dt){ 
	dd.push(dt[key]);
    } 
    console.log(dd);
   
    var dp = []; 
    console.log(dd[count]);
    for(key in dd[count]){
	dp.push(dd[count][key]); 
    };


    var keysx = Object.keys(dd[count]); 
    console.log(keysx);
    keysx.splice(2,1);    
    var n = dp.splice(2, 1)[0];


    var width = 800,
    height = 750,
    radius = Math.min(width, height) / 2;
    
    var color = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"];

    var arc = d3.svg.arc()
	.outerRadius(radius - 10)
	.innerRadius(radius - 70);
    
    var pie = d3.layout.pie()
	.sort(null)
	.value(function(d, i) {
	   // console.log(dp[i]);
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
        .attr("class", "arc")
        .on('click', function(d){ 
	    if(c == dd.length - 1){ createChart(data[subindex], 0) } 
	    else{ createChart(data[subindex], c + 1) }
	});

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i){ 
//	    console.log(color[i]);
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
	    return keysx[i] + ": " + dp[i] + "%";
	});
    svg.append("text")
        .attr("x", (width / 30))             
        .attr("y", (height / 25))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text(keys[count]);

    svg.append("text")
        .attr("x", (width / 30))             
        .attr("y", (height / 25))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text(keys[count]);

    svg.append("text")
        .attr("x", (width / 3))             
        .attr("y", (height / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .text("N = " + n);


}
