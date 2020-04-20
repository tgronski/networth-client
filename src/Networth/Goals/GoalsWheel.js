import React,{Component} from 'react';
import ApiContext from '../ApiContext'
import * as d3 from "d3";


export default class GoalsWheel extends Component{    

    static contextType = ApiContext 


  render(){
    let goals= this.context.goals
    let number = this.context.entries.length
    let recentValue= this.context.entries[number-1]
    let networth= 0
    if (recentValue!=null){
      networth =(recentValue.total)
      networth= Number(networth.replace(/[^0-9.-]+/g,""))

      }
  let sumGoals = 0 
  for(let i=0; i<goals.length; i++){
          sumGoals = parseFloat(goals[i].goalvalue)+sumGoals
  }
  let data= [0]
  if(sumGoals>0 && networth<sumGoals){
      data = [networth/parseFloat(sumGoals)*100,100-(networth/parseFloat(sumGoals)*100)]
  }

  else if (sumGoals>0 && networth>sumGoals){
      data= [100,0]
  }
  else data= [0,100]
      const height=200;
      const width=200;
      let pie=d3.pie()(data)
      let arc=d3.arc()
      .innerRadius(70)
      .outerRadius(100)
      
      let colors=d3.interpolateRgb("#738683","#D3D3D3");
  
  return (

    <div className='wheel'>
    <h3>Percent to All Goals:</h3>
    <svg className='report'>
    
                <g  transform={`translate(${width/2},${height/2})`}>
                    {pie.map((slice, index)=>{
                        let sliceColor= colors(index/(pie.length-1));
                        return < g  key={slice.data}>
                        <path  key={slice.index} d={arc(slice)} fill={sliceColor} />
                        <text textAnchor='middle' x="0" y="0" fill='black'>
                           {data[0].toFixed(2)}% 
                        </text>
                        </g>
                    })}
    
                </g>
        </svg>
        </div>)
   

}
   
}


