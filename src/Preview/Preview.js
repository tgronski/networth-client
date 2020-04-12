import React, {Component} from 'react';
import './Preview.css';
import * as d3 from "d3";
import { Link } from "react-router-dom";


export default class Preview extends Component{

    render(){
    const data=[{value: 30, name: "Debts "},{value: 70, name: " Assets"}]
    const height=400;
    const width=400;
    let pie=d3.pie()(data.map((data)=>data.value))
    let arc=d3.arc()
    .innerRadius(0)
    .outerRadius(100);
    let interpolate=d3.interpolateRgb("#152950","#bc3358");
  
  return (
    <div className="Preview">
        <section className='Preview-total'>
        <section className="Preview-text">
        <h1><Link className='mainLink' to='register'>Create</Link> an account or <Link className='mainLink' to='/login'>log in</Link> to track your net worth & see your full report!</h1>
        <br/>
        <h2>Add goals and learn more about how you can save.</h2>
        </section>
        <svg className="Pie">
            <g transform={`translate(${width/2},${height/2})`}>
                {pie.map((slice, index)=>{
                    let sliceColor= interpolate(index/(pie.length-1));
                    return <path key={slice.index} d={arc(slice)} fill={sliceColor}/>
                })}
                <text textAnchor='middle'  fill='white'>
                    {data.map((data)=>{
                        return `${data.name}`})
                    }  
                        
                </text>
            </g>
        </svg>
        </section>
    </div>
  );
}
}
