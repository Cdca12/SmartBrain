import React, { Component } from 'react';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: ""
        }
    }

    handleNameChange = (evt) => {
        this.setState({ name: evt.target.value });
    }

    handleUsernameChange = (evt) => {
        this.setState({ username: evt.target.value });
    }

    handlePasswordChange = (evt) => {
        this.setState({ password: evt.target.value });
    }

    onSubmitRegister = () => {
        let user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }

        let request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://localhost:3000/register", request)
            .then(res => res.json())
            .then(user => {

                if (user) {
                    let msg = `Registered Succesfully!
                    \nName: ${user.name}
                    \nUsername: ${user.username}
                    \nPassword: ${user.password}`
                    
                    alert(msg);

                    this.props.loadUser(user);
                    this.props.onRouteChange("home");
                } else {
                    alert("Error!");
                }
            })
    }



    render() {

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    onChange={this.handleNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                                <input
                                    onChange={this.handleUsernameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="username"
                                    id="username"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.handlePasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;