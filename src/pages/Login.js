import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../components/genericComponents/Navbar';
import Jumbotron from '../components/genericComponents/Jumbotron';
import Footer from '../components/genericComponents/Footer';
import { getToken } from '../services/userServices';
import Auth from '../helpers/Auth';

function Example() {
    // Declara una nueva variable de estado, la cual llamaremos “count”
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
const LoginWithHooks = (props) => {
    // in hooks means [value of the state, call for update the state]; 
    const [ValEmail, email] = useState('');
    /* 
        ValEmail = this.state.email;
        email ? this.setState({email: value});
    */
    const [ValPassword, password] = useState('');
    const [ValError, error] = useState(false);
    const [ValMessage, errorMessage] = useState('');
    // const [state, setstate] = useState(initialState);
    function onChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === 'password') {
            password(value);
        } else {
            email(value);
        }
    }
    const authUser = (event) => {
        event.preventDefault();
         // CALL API SERVICES
         getToken({email: ValEmail, password: ValPassword})
         .then(responseData => {
             if(responseData.success === false) {
                 error(true);
                 errorMessage(responseData.message);
             } else {
                 error(false);
                 errorMessage('');
                 // Setup Auth info
                 Auth.login(responseData, () => {
                    props.history.push('/task');
                 });
             }
         })
    };
    const ErrorHandler = () => {
        if (ValError) {
            return <h2>{ValMessage}</h2> ;
        }
        return '';
    };
        return (
            <div>
            <Navbar />
            <Jumbotron title="Login" subtitle="Sign In" />
            <div className="container">
                <h2>
                Please Login User
                </h2>
                <input type="text" name="email" value={ValEmail}
                 placeholder="email" onChange={onChange}
                />
                <input type="password" name="password" value={ValPassword} 
                placeholder="password" onChange={onChange}
                />
                <button onClick={authUser}>Login (please)</button>
                
                <div>
                    <ErrorHandler/>
                </div>
            </div>
            <Footer /> 
        </div>
        );
};

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage:''
        };
        this.onChange = this.onChange.bind(this);
    }
    authUser = (event) => {
        event.preventDefault();
         const { email, password } = this.state;
         // CALL API SERVICES
         getToken({email: email, password: password})
         .then(responseData => {
             if(responseData.success === false) {
                this.setState({
                    error: true,
                    errorMessage: responseData.message
                });
             } else {
                 this.setState({
                     error: false,
                     errorMessage: ''
                 });
                 // Setup Auth info
                 Auth.login(responseData, () => {
                    this.props.history.push('/task');
                 });
             }
         })
    };
    onChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        console.log()
        this.setState({[name] : value});
    }
        render(){
            return(
                <div>
                    <Navbar />
                    <Jumbotron title="Login" subtitle="Sign In" />
                    <div className="container">
                        <h2>
                        Please Login User
                        </h2>
                        <input type="text" name="email" value={this.state.email}
                         placeholder="email" onChange={this.onChange}
                        />
                        <input type="password" name="password" value={this.state.password} 
                        placeholder="password" onChange={this.onChange}
                        />
                        <button onClick={this.authUser}>Login (please)</button>

                        <h2>{this.state.errorMessage}</h2>
                    </div>
                    <Footer /> 
                </div>
            ); 
        }

}

export default withRouter(LoginWithHooks);
