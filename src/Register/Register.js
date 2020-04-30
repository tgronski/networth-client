import React, {Component} from 'react';
import AuthApiService from '../services/auth-api-service'
import './Register.css'
         
         
export default class Register extends Component{   
  static defaultProps = {
    onRegistrationSuccess: () => {},
    history: {
      push: () => {},
    },
  }
  state={error: null}      

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { full_name, nick_name, user_name, password } = ev.target
     this.setState({ error: null })
     AuthApiService.postUser({
       user_name: user_name.value,
       password: password.value,
       full_name: full_name.value,
       nickname: nick_name.value,
     })
       .then(user => {
        full_name.value = ''
        nick_name.value = ''
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
        this.handleRegistrationSuccess()

       })
       .catch(res => {
         this.setState({ error: res.error })
       })
  }
    render(){
      let error=this.state.error

    return(
        <div id="registrationComponent">
            <br/>
            <br/>
            <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
         <form className='RegistrationForm'
           onSubmit={this.handleSubmit}>
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
            autoComplete='newpassword'
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