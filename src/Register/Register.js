import React, {Component} from 'react';
import './Register.css'
         
         
         
export default class Register extends Component{         
 
    render(){

    return(
        <div id="registrationComponent">
            <br/>
            <br/>
         <form className='RegistrationForm'>
        {/* // onSubmit={this.handleSubmit}> */}
        <div className='full_name'>
          <label htmlFor='RegistrationForm__full_name'>
            Full name:  {' '}
          </label>
          <input
            name='full_name'
            type='text'
            required
            id='RegistrationForm__full_name'>
          </input>
        </div>
        <div className='user_name'>
          <label htmlFor='RegistrationForm__user_name'>
            User name:{' '} 
          </label>
          <input
            name='user_name'
            autoComplete='username'
            type='text'
            required
            id='RegistrationForm__user_name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__password'>
            Password: {' '} 
          </label>
          <input
            autoComplete='new-password'
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </input>
        </div>
        <div className='nick_name'>
          <label htmlFor='RegistrationForm__nick_name'>
            Nickname:{' '}
          </label>
          <input
            name='nick_name'
            type='text'
            required
            id='RegistrationForm__nick_name'>
          </input>
        </div>
        {/* <Button type='submit' onClick=register()> */}
        <button className='submitButton' type='submit'>  Register
        </button>
      </form>
    </div>)
    }
}