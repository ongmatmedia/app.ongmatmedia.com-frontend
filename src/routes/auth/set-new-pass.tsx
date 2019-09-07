import React, { FormEvent } from 'react'
import { Button, Checkbox, Form, Icon, Input, message, Layout, Alert, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Component, Props } from "react";
import { FormComponentProps } from "antd/lib/form";
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { RouterProps } from 'react-router';

interface SetNewPasswordPageState{
    err: string | null,
    loading: boolean
}


class SetNewPasswordPageView extends Component<FormComponentProps & RouterProps, SetNewPasswordPageState> {

    state : SetNewPasswordPageState = {
        err: null,
        loading: false
    } 

    set_pass = async (username: string, old_password: string, new_password: string) => {
        this.setState({...this.state, loading: true, err: null})
        try {
            const rs = await Auth.signIn(username, old_password)
            if(rs.challengeName == 'NEW_PASSWORD_REQUIRED'){
                await Auth.completeNewPassword(rs, new_password, {})
            }
            this.props.history.push('/')
        } catch (e) {
            console.error('Error login', e)
            this.setState({...this.state, err: e.message})

        }
        this.setState({...this.state, loading: false})
    }

     submit = (e: FormEvent)=>{
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if(err) return
            if(values.new_password1 != values.new_password2){
                await this.setState({...this.state, err: "2 password not match"})
                return 
            }
            this.set_pass(values.username, values.old_password, values.new_password1)
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form



        return (


            <div className="gx-login-container">
                <div className="gx-login-content">
                    <div className="gx-login-header gx-text-center">
                        <h1 className="gx-login-title">Set a new password</h1>
                    {
                        this.state.err ? <Alert message={this.state.err} type="error" showIcon /> : null
                    }
                    </div>
                    <Form className="gx-signin-form gx-form-row0" onSubmit={e => this.submit(e)}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true, message: 'The input is not valid username!',
                                }],
                            })(
                                <Input placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('old_password', {
                                rules: [{
                                    required: true, message: 'The input is not valid code!',
                                }],
                            })(
                                <Input type="password" placeholder="Old password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('new_password1', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input type="password" placeholder="New password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('new_password2', {
                                rules: [{ required: true, message: 'Please input your password 2!' }],
                            })(
                                <Input type="password" placeholder="New password again" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" className="gx-mb-0" htmlType="submit" loading={this.state.loading}>
                                Reset password
                                </Button>
                                <Button type="dashed" icon="left" className="gx-mb-0" htmlType="submit" onClick={() => {
                                this.props.history.push('/login')
                            }}>
                                Back to login
                            </Button>
                        </FormItem>
                        
                    </Form>
                </div>
            </div>
        );

    }
}



export const SetNewPasswordPage = Form.create()(SetNewPasswordPageView);