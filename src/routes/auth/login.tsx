import React, { useState, FunctionComponent } from 'react'
import { Button, Checkbox, Form, Icon, Input, Alert, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Auth } from 'aws-amplify'
import { RouterProps, withRouter, RouteComponentProps } from 'react-router';


// interface LoginPageState {
//     err: string | null,
//     loading: boolean,
//     forgot_pass_loading: boolean
// }


// class LoginPage extends Component<FormComponentProps & RouterProps, LoginPageState> {

//     state: LoginPageState = {
//         err: null,
//         loading: false,
//         forgot_pass_loading: false
//     }

//     componentDidMount() {
//         this.setState({ ...this.state, err: null })
//     }

//     login = async (email: string, password: string) => {
//         this.setState({ ...this.state, loading: true, err: null })
//         try {
//             const rs = await Auth.signIn(email, password)
//             if (rs.challengeName == 'NEW_PASSWORD_REQUIRED') {
//                 this.props.history.push('/set-new-pass')
//                 return
//             }
//             this.props.history.push('/')
//         } catch (e) {
//             console.error('Error login', e)
//             this.setState({ ...this.state, err: e.message })

//         }
//         this.setState({ ...this.state, loading: false })
//     }

//     forgot_pass = (e: FormEvent) => {
//         e.preventDefault()
//         this.props.form.validateFields(async (err, values) => {
//             if (err) return
//             await this.setState({ ...this.state, forgot_pass_loading: true })

//             const email = values.email
//             try {
//                 await Auth.forgotPassword(email)
//                 notification.success({ message: 'Check your email for code vertification' })
//                 this.props.history.push('/reset-pass')
//             } catch (e) {
//                 this.setState({ ...this.state, err: e.message })
//             }
//             await this.setState({ ...this.state, forgot_pass_loading: false })
//         })
//     }

//     submit = (e: FormEvent) => {
//         e.preventDefault()
//         this.props.form.validateFields((err, values) => !err && this.login(values.email, values.password))
//     }

//     render() {


//         const { getFieldDecorator } = this.props.form
//     }
// }

export const LoginView = withRouter<any, any>((props: FormComponentProps & RouteComponentProps) => {

    const [error, set_error] = useState<string | null>(null)
    const [loading, set_loading] = useState<boolean>(false)

    const { form } = props

    const set_new_pass_prompt = (username: string, password: string) => Modal.confirm({
        title: 'New password require',
        content: 'You must set a new password for your account, do you want to do it now ?',
        onOk: () => {
            localStorage.setItem('tmp-user-credential', JSON.stringify({ username, password }))
            props.history.push(`/auth/set-new-password`)
        }
    })

    const reset_password_prompt = (username: string) => {
        Modal.confirm({
            title: 'Password reset require',
            content: 'You must set a new password for your account, do you want to do it now ?',
            onOk: () => props.history.push(`/auth/reset-password?username=${username}`)
        })
    }

    const login = async () => {
        form.validateFields(async (err, values) => {
            if (err) return

            set_loading(true)
            set_error(null)

            const { password, username } = values
            try {
                const user = await Auth.signIn({ password, username })

                if (user.challengeName) {
                    if (user.challengeName == 'NEW_PASSWORD_REQUIRED') set_new_pass_prompt(username, password)
                }
                props.history.push('/')
            } catch (e) {
                set_error(e.message)
                set_loading(false)
                e.code == 'PasswordResetRequiredException' && reset_password_prompt(username)
            }

            
        })
    }



    return (
        <Form id="auth-form">
            <h1 style={{ textAlign: 'center' }}>Login</h1>

            {
                error && <Alert message={error} type="error" showIcon />
            }

            <Form.Item style={{ marginTop: 20 }}>
                {form.getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        size="large"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {form.getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        size="large"
                    />
                )}
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Button type="primary" block size="large" onClick={() => login()} loading={loading}> Login</Button>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 40 }}>
                    <Button type="dashed" onClick={() => props.history.push('/auth/reset-password')}>Forgot password</Button>
                    <Button type="dashed" onClick={() => Modal.warn({
                        title: 'Developing feature'
                    })}>Register</Button>
                </div>
            </div>

        </Form>

    )

});


export const Login = Form.create()(LoginView);