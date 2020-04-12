import React, {Component} from 'react';
import './Login.css'
         
         
         
export default class Login extends Component{         
 
    render(){

    return(      
        <div className='Login'>
            <h1>Welcome back!</h1>
         <form
        className='LoginForm' 
        // onSubmit={this.handleSubmitJwtAuth}
      >

        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name: {' '}
          </label>
          <input
            required
            autoComplete='username'
            name='user_name'
            id='LoginForm__user_name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password: {' '}
          </label>
          <input
            required
            autoComplete='current-password'
            name='password'
            type='password'
            id='LoginForm__password'>
          </input>
        </div>
        <button className='submitButton' type='submit'>
          Login
        </button>

      </form>
      </div>
    )
    }
}