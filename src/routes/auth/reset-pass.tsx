import React, { useState, useEffect } from 'react'
import { Button, Form, Icon, Input, Alert, notification, Modal } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { FormComponentProps } from "antd/lib/form";
import { Auth } from 'aws-amplify';
import { RouterProps, withRouter } from 'react-router';


const ResetPasswordPage = withRouter<any, any>((props: FormComponentProps & RouterProps) => {

    // Get username
    const username_match = window.location.href.match(/username=([a-zA-Z0-9]+)/)
    const [username, set_username] = useState<string | null>(username_match ? username_match[1] : null)
    const [error, set_error] = useState<string | null>(null)
    const [loading, set_loading] = useState<boolean>(false)

    const send_vetification_code = async (for_username: string) => {
        set_error(null)
        set_loading(true)
        try {
            await Auth.forgotPassword(for_username)
            Modal.warning({
                title: 'Reset code sent',
                content: `Hey ${for_username}, check your email inbox for vertification code`
            })
            set_username(for_username)
        } catch (e) {
            set_error(e.message)
        }
        set_loading(false)
    }

    const set_pass = async (username: string, code: string, password: string) => {
        set_error(null)
        set_loading(true)
        try {
            await Auth.forgotPasswordSubmit(username, code, password)
            notification.success({ message: 'Password changed' })
            props.history.push('/')
        } catch (e) {
            set_error(e.message)
            set_loading(false)
        }
        
    }

    useEffect(() => { username && send_vetification_code(username) }, [])

    const { getFieldDecorator } = props.form


    const ResetPasswordForm = (
        <Form id="auth-form" onSubmit={e => {
            e.preventDefault()
            props.form.validateFields(async (err, values) => {
                if (err) return

                if (username) {
                    if (values.password != values.password2) {
                        set_error("2 password not match")
                        return
                    }
                    await set_pass(values.username, values.code, values.password)
                } else {
                    await send_vetification_code(values.username)
                }
            })
        }} style={{ marginTop: 20 }}>
            <FormItem>
                {getFieldDecorator('username', {
                    rules: [{
                        required: true, message: 'The input is not valid username!',
                    }],
                    initialValue: username
                })(
                    <Input placeholder="Username" disabled={username != null} addonAfter={<Icon type="edit" onClick={() => set_username(null)} />} />
                )}
            </FormItem>
            {
                username && (
                    <span>
                        <FormItem>
                            {getFieldDecorator('code', {
                                rules: [{
                                    required: true, message: 'The input is not valid code!',
                                }],
                            })(
                                <Input placeholder="Code" autoComplete="off" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input type="password" placeholder="Password" autoComplete="off" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password2', {
                                rules: [{ required: true, message: 'Please input your password 2!' }],
                            })(
                                <Input type="password" placeholder="Password again" autoComplete="off" />
                            )}
                        </FormItem>
                    </span>
                )
            }
            <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit" loading={loading}>
                    {
                        loading ? "Processing" : (username ? 'Reset now' : 'Send OTP code')
                    }
                </Button>

                <Button type="dashed" style={{ marginLeft: 10 }} className="gx-mb-0" htmlType="submit" onClick={() => {
                    props.history.push('/auth/login')
                }}>
                    Back to login
                    </Button>
            </FormItem>

        </Form>

    )



    return (
        <div className="gx-login-container">
            <div className="gx-login-content">
                <div className="gx-login-header gx-text-center">
                    <h1 className="gx-login-title">Reset password</h1>
                    {
                        error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />
                    }
                    {
                        !username && <Alert message="Enter your username" type="info" showIcon style={{ marginBottom: 10 }} />
                    }
                </div>
                {
                    ResetPasswordForm
                }
            </div>
        </div>
    )
})



export const ResetPassword = Form.create()(ResetPasswordPage);