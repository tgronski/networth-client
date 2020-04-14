import React,{Component} from 'react';


export default class Overtime extends Component{  

  render(){
    let entries= this.props.entries
    for(let i=0; i<entries.length; i++){
        if (i=0){
            entries[0].color= "green"
        }
        else if(entries[i]>entries[i-1]){
            entries[i].color="green"
        }
        else entries[i].color="red"
    }
    console.log(entries)
  return (
    <div className="Overtime">

    {entries.length>0
    ?(entries.map(entry=>{
     return <p style={{color: `${entry.color}`}} key={entry.time}>{entry.time}: {' '}{entry.total>0
        ?(`$${entry.total}`)
        : `-$${-1*entry.total}`}</p>
    }))
    : null
    }
    </div>
  )
}
}