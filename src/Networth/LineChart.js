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
        w:"100%"
      }


    
    let datas=data.dataset  
  
    const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.dataset, d => d.id))
    .range([data.margin, data.width])

    let heightMax=datas.sort(data=>(data.value))
      console.log(heightMax)
    const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.dataset, d => d.value)+data.margin ])
    .range([data.height, data.margin])
    const line = d3.line()
    .x(d => xScale(d.id))
    .y(d => yScale(d.value))
    .curve(d3.curveMonotoneX)
  
    
    

  return (
    <div id="LineChart">
    {data.dataset.length>1
    ?(  <svg height={data.height} width={data.w}>
           <g  >
    
        <line  className="axis"  x1={data.margin} x2={data.width} y1={data.height} y2={data.height}></line>
         <line className="axis" x1={data.margin} x2={data.margin} y1={data.margin} y2={data.height}/>
          <path className="path"  d={line(data.dataset)} />   
          
          </g>
        </svg>
    )
    : null
    
    }

    </div>
  )
}
}
