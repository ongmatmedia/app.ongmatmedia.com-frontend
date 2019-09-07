import React, { FormEvent } from 'react'
import { Button, Checkbox, Form, Icon, Input, message, Layout, Alert, notification, Spin } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Component, Props } from "react";
import { FormComponentProps } from "antd/lib/form";
import { Auth } from 'aws-amplify';
import { RouterProps } from 'react-router';

interface LoginPageState {
    err: string | null,
    loading: boolean,
    forgot_pass_loading: boolean
}


class LoginPage extends Component<FormComponentProps & RouterProps, LoginPageState> {

    state: LoginPageState = {
        err: null,
        loading: false,
        forgot_pass_loading: false
    }

    componentDidMount() {
        this.setState({ ...this.state, err: null })
    }

    login = async (email: string, password: string) => {
        this.setState({ ...this.state, loading: true, err: null })
        try {
            const rs = await Auth.signIn(email, password)
            if (rs.challengeName == 'NEW_PASSWORD_REQUIRED') {
                this.props.history.push('/set-new-pass')
                return
            }
            this.props.history.push('/')
        } catch (e) {
            console.error('Error login', e)
            this.setState({ ...this.state, err: e.message })

        }
        this.setState({ ...this.state, loading: false })
    }

    forgot_pass = (e: FormEvent) => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (err) return
            await this.setState({ ...this.state, forgot_pass_loading: true })

            const email = values.email
            try {
                await Auth.forgotPassword(email)
                notification.success({ message: 'Check your email for code vertification' })
                this.props.history.push('/reset-pass')
            } catch (e) {
                this.setState({ ...this.state, err: e.message })
            }
            await this.setState({ ...this.state, forgot_pass_loading: false })
        })
    }

    submit = (e: FormEvent) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => !err && this.login(values.email, values.password))
    }

    render() {

        const { getFieldDecorator } = this.props.form



        return (


            <div className="gx-login-container">
                <div className="gx-login-content">
                    <div className="gx-login-header gx-text-center">
                        <h1 className="gx-login-title">Sign In</h1>
                        {
                            this.state.err ? <Alert message={this.state.err} type="error" showIcon /> : null
                        }
                    </div>
                    <Form className="gx-signin-form gx-form-row0" onSubmit={e => this.submit(e)}>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{
                                    required: true, message: 'The input is not valid username!',
                                }],
                            })(
                                <Input placeholder="Email" />
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
                            <Button type="primary" className="gx-mb-0" htmlType="submit" loading={this.state.loading}>
                                Sign in
                                </Button>

                        </FormItem>
                        <div className="gx-flex-row gx-justify-content-between">
                            <Spin spinning={this.state.forgot_pass_loading}>
                                <Button type="link" className="gx-mb-0" icon="question-circle" onClick={this.forgot_pass}>
                                    Forgot pass
                            </Button>
                            </Spin>
                            <ul className="gx-social-link">
                                <li>
                                    <Icon type="google" />
                                </li>
                                <li>
                                    <Icon type="facebook" />
                                </li>
                                <li>
                                    <Icon type="github" />
                                </li>
                                <li>
                                    <Icon type="twitter" />
                                </li>
                            </ul>
                        </div>

                    </Form>
                </div>
            </div>
        );

    }
}



export const Login = Form.create()(LoginPage);