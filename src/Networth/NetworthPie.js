import React, {Component} from 'react';
import './Networth.css'
import * as d3 from "d3";
import Key from './Key'

export default class NetworthPie extends Component {



  render(){
    let debts=parseInt(this.props.credit) + parseInt(this.props.loans)+ parseInt(this.props.otherDebt) 
    let assets=parseInt(this.props.investments) + parseInt(this.props.savings) +parseInt(this.props.otherAssets)
    let total=assets+debts
    let debtPercentage=(debts/total)*100
    let assetPercentage=(assets/total)*100
    const data=[{value: debtPercentage, name: "Debts "},{value:  assetPercentage, name: " Assets"}]
    const height=200;
    const width=200;
    let pie=d3.pie()(data.map((data)=>data.value))
    let arc=d3.arc()
    .innerRadius(0)
    .outerRadius(100);
    let colors=d3.interpolateRgb("#152950","#738683");
    return (
    <>
    <p>Asset Allocation</p>
    {total===0
        ?(<div className='report'><br/><i>Add values below to see a breakdown</i></div>)
    :(<div> <svg className='report'>
            <g transform={`translate(${width/2},${height/2})`}>
                {pie.map((slice, index)=>{
                    let sliceColor= colors(index/(pie.length-1));
                    return <path key={slice.index} d={arc(slice)} fill={sliceColor} />
                })}
                <text textAnchor='middle' x="0" y="125" fill='black'>
                    {data.map((data)=>{
                        return `${data.name}: ${Math.round(data.value)}%`})
                    }  
                        
                </text>
            </g>
           
        </svg>
        <Key/>
        
        </div>)
    }
    <br/><br/>
    </>
  );
}
}
