import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import 'antd/dist/antd.css';
import './style.css';
import { Auth } from 'aws-amplify';

async function check_login() {
  if (!window.location.hash.match(/#\/auth\/([a-z]+)/) && !(await Auth.currentUserInfo()))
    window.location.href = '/#/auth/login';
}

function update_title() {
  const title = window.location.hostname.split('.')[0];
  window.document.title = title.charAt(0).toUpperCase() + title.slice(1);
}

check_login();
update_title();

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
