import React,{Component} from 'react';
import './Goals.css'
import ApiContext from '../ApiContext'
import Goals from "./Goals"
import GoalsWheel from './GoalsWheel';

export default class GoalsForm extends Component{    
    constructor(props){
        super(props);
        this.state={
            goals: [],
            goal_titleEntry:'',
            goal_valueEntry:'',
            error: "",
            id: 0, 
        }
    }
    static contextType = ApiContext 


    handleDeleteGoal=(e)=>{
        e.preventDefault();
        let id= e.target.id
        this.setState({
          goals: this.state.goals.filter(goal => goal.id !== parseInt(id) )
        })
      }

    handleGoal=e=>{
        e.preventDefault();
        let name=e.target.name
        this.setState({[`${name}Entry`]:e.target.value})
        
    }
    handleSubmitGoals=(e)=>{
        e.preventDefault();
        let networth= 0
        let number = this.context.entries.length
        let recentValue= this.context.entries[number-1]
        if (recentValue!=null){
          networth =(recentValue.total)
          networth= Number(networth.replace(/[^0-9.-]+/g,""))
  
        }
        if(this.state.goals.length<=2){    
        this.setState({goals: [...this.state.goals,
                {id: this.state.id + 1, goalname: this.state.goal_titleEntry,goalvalue: this.state.goal_valueEntry}],
            id: this.state.id+1})
        }
        else this.setState({error: "Limit to 3 goals"})
        
    }
  render(){
      let goals=this.state.goals


  return (
    <ApiContext.Provider value={{
        goals: this.state.goals, 
        handleDeleteGoal: this.handleDeleteGoal,
        entries: this.context.entries
      }}>
        <div>
        <h2 className="sectionTitle">Your Financial Goals:</h2>
        
        <div className='Goals'>
        

        <div className='GoalsForm'>
         
        <h3>Save New Goals:</h3>
        <form
         
        onSubmit={(e)=>this.handleSubmitGoals(e)}
        >
        <div className='inputs'>
        <label  htmlFor='GoalsForm__goal_title'>
        Goal: {' '}
        </label>
        <input
        required
        name='goal_title'
        maxLength="36"
        size="29"
        onChange={e=>this.handleGoal(e)}
        id='GoalsForm__goal_title'>
        
        </input>
        
        <br/>       <br/>

        <label className='inputs' htmlFor='GoalsForm__goal_title'>
        Goal Value: {' '}$
        </label>
        <input
        required
        name='goal_value'
        type="number"
        onChange={e=>this.handleGoal(e)}
        id='GoalsForm__goal_value'>
        </input>
        </div>
        <br/>

       <br/>
        <button className='submitButton' type='submit'>
        Add Goal
        </button>
        <div>
        {goals.length<=2
        ? null
        :<p>{this.state.error}</p>}
        </div>
        </form>
        </div>
        
        <Goals/>
        <GoalsWheel/>
        </div>
        </div>
        </ApiContext.Provider>
    )
}
}



