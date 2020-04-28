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
      if(entries[i].total.includes('-')){
        entries[i].color="red"
      }
      else entries[i].color="green"
    }
    let options = { style: 'currency', currency: 'USD' };
    let numberFormat = new Intl.NumberFormat('en-US', options);
  return (
    <div className="Overtime">
    {entries.length>0
      ?(<h2>Your Networth Over Time:</h2>)
      : null
    }
   
    {entries.length>0
    ? (<div className="Overtime-list">
       {(entries.map(entry=>{
        return <p style={{color: `${entry.color}`}} key={entry.id}>{entry.time}: {' '}{entry.total}
     
     <button id={entry.id} onClick={this.handleClickDelete}>Delete</button></p>
     }))}
     </div>)
     : null
      }
     {entries.length>1
     ?(<p>Over your two most recent entries, your net worth has changed by {numberFormat.format(entries[entries.length-1].value-entries[entries.length-2].value)}</p>)
     :null}
    
    </div>
  )
}
}