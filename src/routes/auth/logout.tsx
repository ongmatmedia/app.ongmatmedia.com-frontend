import React, { Component } from "react";
import { RouterProps } from "react-router";
import { Auth } from 'aws-amplify';
import { Button } from "antd";

export class LogoutPage extends Component {
    
    async componentDidMount(){
        console.log('Signed out')
        await Auth.signOut()
    }

    render(){
        return (<span>
            You are loged out
            <Button onClick={() => (this.props as RouterProps).history.push('login')}>Login</Button>
        </span>)
    }
}