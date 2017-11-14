import * as React from 'react';
import { Card, Form, Icon, Input, Button, Alert } from 'antd';
import { SecurityResponseTypes } from '../../server/response/ResponseTypes';

import { RegistrationStyle } from './RegistrationStyle.style';
import axios from 'axios';

const FormItem = Form.Item;
interface RegisterState {
    confirmDirty: boolean,
    statusCode: 'userAlreadyExists' | 'emailIsMissing' | 'password is missing' | '';
    submitButtonDisabled: boolean
}

class Register extends React.Component<any, RegisterState> {
    state: RegisterState = {
        confirmDirty: false,
        statusCode: '',
        submitButtonDisabled: false
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                this.setState({
                    submitButtonDisabled: true
                })
                axios.post('/security/register', values)
                    .then((response) => {
                        const data = response.data as SecurityResponseTypes.responseStatusRegistration;
                        switch (data.status) {
                            case 'email exists':
                                this.setState({
                                    statusCode: 'userAlreadyExists',
                                    submitButtonDisabled: false
                                });
                                break;

                            case 'email is missing':
                                this.setState({
                                    statusCode: 'emailIsMissing',
                                    submitButtonDisabled: false
                                });
                                break;
                            case 'password is missing':
                                this.setState({
                                    statusCode: 'password is missing',
                                    submitButtonDisabled: false
                                });
                                break;
                            case 'registration success':
                                window.location.href = `/security/login?registration='success'&email=${values.email}`;
                                break;
                        }
                    })
                    .catch(function (error) {
                        // throw error
                    });
            }
        });
    }

    handleConfirmBlur = (e: any) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={RegistrationStyle.RegistrationWrapper}>
                <div className={RegistrationStyle.Card}>
                    <div className={RegistrationStyle.AlertMessage(this.state.statusCode === 'userAlreadyExists')}>
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
                                    }, {
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
                                    }, {
                                        validator: this.checkConfirm,
                                    }],
                                })(
                                    <Input type="password" />
                                    )}
                            </FormItem>
                            <FormItem
                                label="Confirm Password"
                                hasFeedback
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: 'Please confirm your password!',
                                    }, {
                                        validator: this.checkPassword,
                                    }],
                                })(
                                    <Input type="password" onBlur={this.handleConfirmBlur} />
                                    )}
                            </FormItem>
                            <FormItem >
                                <Button disabled={this.state.submitButtonDisabled} type="primary" htmlType="submit">Register</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export const RegistrationPage = Form.create()(Register);
