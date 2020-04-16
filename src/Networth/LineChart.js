import React,{Component} from 'react';
import ApiContext from './ApiContext'
import * as d3 from "d3";

const width = 400;
const height = 350;
const margin = { top: 20, right: 8, bottom: 20, left: 35 };


export default class LineChart extends Component{  
    constructor(props){
        super(props);
        this.state = {
         
          }; 
    }
    static contextType = ApiContext 


      
  render(){
    const data = {
        dataset: this.context.entries,
        width: 400,
        height: 500,
        margin: 100,
        w:"90%"
      }

    
      
    const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.dataset, d => d.id))
    .range([data.margin, data.width])
    console.log(xScale)
    const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.dataset, d => d.value)])
    .range([data.height, data.margin])
    console.log(yScale)
    const line = d3.line()
    .x(d => xScale(d.id))
    .y(d => yScale(d.value))
    .curve(d3.curveCatmullRom.alpha(0.9))
    console.log(line)
  return (
    <div className="LineChart">
      <svg height={data.height} width={data.w}>
          
      <line  className="axis" x1={data.margin} x2={data.w} y1={data.height} y2={data.height}/>
       <line className="axis" x1={data.margin} x2={data.margin} y1={data.margin} y2={data.height}/>
        <path className="path" d={line(data.dataset)}/>   
      </svg>
    </div>
  )
}
}
