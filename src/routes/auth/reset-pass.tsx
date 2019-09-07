import React, { FormEvent } from 'react'
import { Button, Checkbox, Form, Icon, Input, message, Layout, Alert, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Component, Props } from "react";
import { FormComponentProps } from "antd/lib/form";
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { RouterProps } from 'react-router';

interface ResetPasswordPageState {
    err: string | null,
    loading: boolean
}


class ResetPasswordPage extends Component<FormComponentProps & RouterProps, ResetPasswordPageState> {

    state: ResetPasswordPageState = {
        err: null,
        loading: false
    }

    set_pass = async (username: string, code: string, password: string) => {
        this.setState({ ...this.state, loading: true, err: null })
        try {

            await Auth.forgotPasswordSubmit(username, code, password)
            notification.success({ message: 'Password changed' })
            this.props.history.push('/login')
        } catch (e) {
            console.error('Error change password', e)
            this.setState({ ...this.state, err: e.message })
        }
        this.setState({ ...this.state, loading: false })
    }

    submit = (e: FormEvent) => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (err) return
            if (values.password != values.password2) {
                await this.setState({ ...this.state, err: "2 password not match" })
                return
            }
            this.set_pass(values.username, values.code, values.password)
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form



        return (


            <div className="gx-login-container">
                <div className="gx-login-content">
                    <div className="gx-login-header gx-text-center">
                        <h1 className="gx-login-title">Reset password</h1>
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
                            {getFieldDecorator('code', {
                                rules: [{
                                    required: true, message: 'The input is not valid code!',
                                }],
                            })(
                                <Input placeholder="Code" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password2', {
                                rules: [{ required: true, message: 'Please input your password 2!' }],
                            })(
                                <Input type="password2" placeholder="Password again" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" className="gx-mb-0" htmlType="submit" loading={this.state.loading}>
                                Reset password
                                </Button>

                            <Button type="dashed" className="gx-mb-0" htmlType="submit" onClick={() => {
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



export const ResetPassword = Form.create()(ResetPasswordPage);