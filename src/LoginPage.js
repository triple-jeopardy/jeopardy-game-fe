import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {

    state = {
        email: '',
        password: ''
    }
    
    handleSubmit = async(e) => {
        e.preventDefault();
        let tokenData = await request.post(`https://enigmatic-springs-29291.herokuapp.com/auth/signin`, this.state)
        this.props.handleTokenChange(tokenData.body.token, tokenData.body.display_name)
        this.props.history.push('./gamepage') // is the . necessary here?
    }
    
    render() {
        return (
            <div className='login-container'>
                <div className='rules-container'>
                    Jeopardy Lite is based off of the long-running game show, Jeopardy! You will be asked ten questions. The answers do not have to be in question form, and are not case sensitive (spelling does matter though, so be careful).
                </div>
                <form className='login-form' onSubmit={this.handleSubmit} >
                    <label>
                        Email:
                        {/* nice inline event handlers! */}
                        <input onChange={ (e)=> this.setState({email: e.target.value}) } ></input>
                    </label>
                    <label>
                        Password:
                        <input type='password' onChange={ (e)=> this.setState({password: e.target.value}) } ></input>
                    </label>
                    <button className = 'login-button'>Login</button>
                    <div className='sign-up-text'>
                        New User? <Link to ='/signup'>Sign Up Here!</Link>
                    </div>
                </form>

            </div>
        )
    }
}
