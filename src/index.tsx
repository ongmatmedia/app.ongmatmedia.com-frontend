import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import "antd/dist/antd.css";
import "./style.css"
import { Auth } from 'aws-amplify';


async function check_login() {
    if (!window.location.hash.match(/#\/auth\/([a-z]+)/) && ! await Auth.currentUserInfo()) window.location.href = '/#/auth/login'
}

check_login()

ReactDOM.render(
    <App />,
    document.getElementById('root')
);



async function test() {
    try {
        const data = await fetch('https://mbasic.facebook.com/neuconfessions.vn', {
            credentials: 'include'
        }).then(r => r.text())

        console.log({data})
    } catch (e) {
        console.error(e)
    }
}

test()