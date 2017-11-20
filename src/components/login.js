import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, signup, setUser } from '../actions';

class Login extends Component {
    renderFieldText(field) {
        const { meta : { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type={field.input.name}
                    className="form-control"
                    {...field.input} />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderFieldCheckBox(field) {
        return (
            <div className="form-check">
                <label className="form-check-label">{field.label}: </label>
                <br/>
                <input type="checkbox" className="form-check-input" value=""/>
            </div>
        );
    }

    onLoginSubmit(values) {
        // console.log(values);
        this.props.login(values, (response) => {
            console.log(response);
            if(response.data.status === 'success') {
                this.props.setUser(response.data.user);
                // console.log('after set user: ', this.props.user );
                this.props.history.push('/teams');
            }
        })
    }

    onSignUpSubmit(values) {
        this.props.signup(values, (response) => {
            console.log(response);
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <div className="container" >
                <div className="row">
                    <div className="col-sm-8 col-sm-2-offset">
                        <ul className="nav nav-tabs">
                            <li className="nav-item active"><a data-toggle="tab" href="#login" >Login</a></li>
                            <li className="nav-item" ><a data-toggle="tab" href="#signup" >Sign Up</a></li>
                        </ul>
                        <div className="tab-content">
                            <div id="login" className="tab-pane fade in active">
                                <form onSubmit={ handleSubmit(this.onLoginSubmit.bind(this)) } >
                                    <Field 
                                        label="Username"
                                        name="username"
                                        component={this.renderFieldText} />
                                    <Field 
                                        label="Password"
                                        name="password"
                                        component={this.renderFieldText} />
                                    <Field 
                                        label="Remember Me"
                                        name="checkbox"
                                        component={this.renderFieldCheckBox} />
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </form>
                            </div>
                            <div id="signup" className="tab-pane fade">
                                <form onSubmit={ handleSubmit(this.onSignUpSubmit.bind(this)) } >
                                    <Field 
                                        label="First Name"
                                        name="firstName"
                                        component={this.renderFieldText} />
                                    <Field 
                                        label="Last Name"
                                        name="lastName"
                                        component={this.renderFieldText} />
                                    <Field 
                                        label="Email Address"
                                        name="email"
                                        component={this.renderFieldText} />
                                    <Field 
                                        label="Username"
                                        name="username"
                                        component={this.renderFieldText} />
                                    <Field 
                                        label="Password"
                                        name="password"
                                        component={this.renderFieldText} />
                                    <Field 
                                        label="Remember Me"
                                        name="checkbox"
                                        component={this.renderFieldCheckBox} />
                                    <button className="btn btn-primary" type="submit">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>  
                </div>              
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return{ user }
}

export default reduxForm({
    form:'PostsNewForm'
})(
    connect(mapStateToProps, { login, signup, setUser })(Login)
);