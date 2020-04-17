import React,{Component} from 'react';
import ApiContext from './ApiContext'
import * as d3 from "d3";


export default class LineChart extends Component{  

    static contextType = ApiContext 


      
  render(){
    const data = {
        dataset: this.context.entries,
        width: 400,
        height: 500,
        margin: 100,
        w:"70%"
      }

    
    const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.dataset, d => d.id))
    .range([data.margin, data.width])
    const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.dataset, d => d.value)])
    .range([data.height/1.1, data.margin])
    const line = d3.line()
    .x(d => xScale(d.id))
    .y(d => yScale(d.value))
    .curve(d3.curveCatmullRom.alpha(0.9))
    
  return (
    <div className="LineChart">
    {data.dataset.length>1
    ?(      <svg height={data.height} width={data.w}>
           
    
        <line  className="axis" x1={data.margin} x2={data.w} y1={data.height/1.1} y2={data.height/1.1}/>
         <line className="axis" x1={data.margin} x2={data.margin} y1={data.margin} y2={data.height}/>
          <path className="path" d={line(data.dataset)} />   
          <text textAnchor={"right"}>{data.dataset.value}</text>
        </svg>)
    : null
    
    }

    </div>
  )
}
}
