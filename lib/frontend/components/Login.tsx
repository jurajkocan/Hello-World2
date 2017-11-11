import * as React from 'react';

import { Card, Form, Icon, Input, Button, Alert } from 'antd';
import { ResponseStatusLogin } from '../../server/Security';

import { LoginStyle } from './LoginStyle.style';
import axios from 'axios';

const FormItem = Form.Item;

// TODO: fill input email value
export interface LoginProps {
    statusCode: 'userNotFound' | 'registrationComplete' | '';
    email: string
}

class Login extends React.Component<LoginProps & any, any> {
    constructor(props: LoginProps) {
        super(props);
    }

    handleSubmit = () => {
        axios.post('/security/login')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={LoginStyle.LoginWrapper}>
                <div className={LoginStyle.Card}>
                    <div className={LoginStyle.AlertMessage(this.props.statusCode === 'userAlreadyExists')}>
                        <Alert message="User already exists" type="error" showIcon={true} />
                    </div>
                    <Card title="Card title">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem
                                label="E-mail"
                                hasFeedback
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true, message: 'Please input your E-mail!',
                                    }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                label="Password"
                                hasFeedback
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }],
                                })(
                                    <Input type="password" />
                                    )}
                            </FormItem>
                            <FormItem >
                                <Button type="primary" htmlType="submit">Login</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}


export const LoginPage = Form.create()(Login);
