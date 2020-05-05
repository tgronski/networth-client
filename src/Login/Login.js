import React, {Component} from 'react';
import AuthApiService from '../services/auth-api-service'
import './Login.css'
         
export default class Login extends Component{   
  static defaultProps = {
    onLoginSuccess: () => {},
    location: {},
    history: {
      push: () => {},
    }
  }
  constructor(props){
    super(props);
    this.state={
      error: null
    }
  }      

  handleRedirect=()=>{
    this.setState({error: "You have been logged out due to inactivity"})
  }

  handleLoginSuccess = () => {
    const { history } = this.props
    const destination = '/networth' 
    history.push(destination)
  }



  handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
    const { user_name, password } = ev.target
    // let user_name = (ev.target.user_name.value).toLowerCase()

    AuthApiService.postLogin({
      user_name: (user_name.value).toLowerCase(),
      password: password.value,

    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        this.props.onLoginSuccess()
        this.handleLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error})
      })
  }

    render(){
    let error=this.state.error
    return(      
        <div className='Login'>
            <h1>Welcome back!</h1>
         <form
        className='LoginForm' 
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {<p className='red'>{error}</p>}
        </div>
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