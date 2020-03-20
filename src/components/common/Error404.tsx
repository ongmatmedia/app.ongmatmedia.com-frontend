import React from 'react'
import { withRouter } from 'react-router-dom'
import { Result, Button } from 'antd'

export const Error404Page = withRouter((props) => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => props.history.push('/')}>Back Home</Button>}
  />
))