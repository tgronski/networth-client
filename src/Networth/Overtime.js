import React,{Component} from 'react';
import ApiContext from './ApiContext'


export default class Overtime extends Component{  
  static contextType = ApiContext;

  handleClickDelete=(e)=>{
    e.preventDefault();
    const id = e.target.id
    this.context.handleDeleteEntry(id)
  }

  render(){
    let entries= this.context.entries
    for(let i=0; i<entries.length; i++){
      if(entries[i].total<1){
        entries[i].color="red"
      }
      else entries[i].color="green"
    }
    
  return (
    <div className="Overtime">
    {entries.length>0
      ?(<h2>Your Networth Over Time:</h2>)
      : null
    }
    {entries.length>0
    ?(entries.map(entry=>{
     return <p style={{color: `${entry.color}`}} key={entry.id}>{entry.time}: {' '}{entry.total>=0
        ?(`$${entry.total}`)
        : `-$${-1*entry.total}`}<button id={entry.id} onClick={this.handleClickDelete}>Delete</button></p>
    }))
    : null
    }
    </div>
  )
}
}