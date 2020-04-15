import React,{Component} from 'react';
import * as d3 from "d3";
import ApiContext from './ApiContext'



export default class LineChart extends Component{  
    static contextType = ApiContext 

  render(){
    
    const width = 500, height = 350, margin = 20
    let w= width-(margin*2)
    let h = height-(margin*2)
    let data=this.context.entries
    let x = d3.scaleTime().rangeRound([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);
    let line = d3.line()   
    .x(function(d) { return x(d.time)})   
    .y(function(d) { return y(d.value)})   
    x.domain(d3.extent(data, function(d) { return d.time }));   
    y.domain(d3.extent(data, function(d) { return d.value }));

    // g.append("g")   .attr("transform", "translate(0," + height + ")")   .call(d3.axisBottom(x))   .select(".domain")   .remove();
    // g.append("g")   .call(d3.axisLeft(y))   .append("text")   .attr("fill", "#000")   .attr("transform", "rotate(-90)")   .attr("y", 6)   .attr("dy", "0.71em")   .attr("text-anchor", "end")   .text("Price ($)");
    // g.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attr("d", line);


    
  return (
    <div className="LineChart">
       <svg width={width} height={height}>

      
      </svg>
    </div>
  )
}
}
