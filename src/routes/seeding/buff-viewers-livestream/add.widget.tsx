import React from 'react'
import { Modal, Form, Input, Select, Alert, Spin, Switch, Card, Tag, notification } from "antd";
import { Component } from "react";
import { FormProps, FormComponentProps } from "antd/lib/form";
import FormItem from "antd/lib/form/FormItem";
import { observer } from "mobx-react";
import { add_task, update_task } from '../../../relayjs-mutations';
import { BuffViewersLivestreamTask } from '../../../schema/Task/BuffViewersLivestream';
import {
    BuffViewrsLivestreamWidgetStore,
    buff_viewers_livestream_widget_store
} from '../../../store/widgets/add-viewers-livestream.widget'
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from '../../../configs/relayjs';
import { User } from '../../../schema/User/User';
import Moment from 'react-moment'
const graphql = require('babel-plugin-relay/macro');


type Props = FormComponentProps & { widget: BuffViewrsLivestreamWidgetStore }


const amount_list = [30, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1000]

const selfQuery = graphql`
        query addEdit2Query{
            me{
                balance
                username
                pricing{
                    BuffViewersLivestreamTask
                }
            }
        }
`

@observer
class ViewersLivestreamServiceWidgetView extends Component<Props>{

    submit = async () => {
        this.props.form.validateFields(async (errors, values: any) => {
            try {
                this.props.widget.loading()
                await add_task("BuffViewersLivestreamTask", values)
                notification.success({message: "Added"})
                this.props.widget.hide()
            } catch (e) {
                notification.error({message: "Some things error"})
                this.props.widget.show_errors(JSON.stringify(e))
            }

            this.props.widget.stop_loading()
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form
        const { Option } = Select
        const { widget } = this.props

        return (
            <Modal
                visible={widget.visible}
                title="Add buff viewers livestream"
                okText="OK"
                onOk={() => { this.submit() }}
                onCancel={() => { buff_viewers_livestream_widget_store.hide() }}
                destroyOnClose={true}
            >
                {
                    widget.errors && (<div>
                        <Alert message={widget.errors} type="error" showIcon /><br />
                    </div>)
                }

                <Spin spinning={widget.isLoading}>
                    <Form layout="vertical">
                        <FormItem label="ID" key="uid">
                            {getFieldDecorator('uid', {
                                rules: [{
                                    required: true, message: 'The input is not valid uid!',
                                }],
                                initialValue: ""
                            })(
                                <Input placeholder="Enter UID of page, profile or Facebook URL" />
                            )}
                        </FormItem>
 
                        <FormItem label="Amount" key="amount">
                            {getFieldDecorator('amount', {
                                rules: [{ required: true, message: 'Please select amount' }],
                                initialValue: 50
                            })(
                                <Select style={{ width: 120 }}>
                                    {
                                        amount_list.map(v => <Option value={v} key={v}>{v}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>


                        <FormItem label="Note" key="note">
                            {getFieldDecorator('note', {
                                rules: [{ required: true, message: 'Some note is require !!!' }],
                                initialValue: ""
                            })(
                                <Input placeholder="Note" />
                            )}
                        </FormItem>



                        <QueryRenderer
                            query={selfQuery}
                            variables={{}}
                            environment={RelayEnvironment}
                            render={rs => {
                                if (!rs.props) return null

                                const user = (rs.props as any).me as User
                                const amount = this.props.form.getFieldValue('amount')
                                const price = user.pricing.BuffViewersLivestreamTask


                                let total = 0

                                let list_notifications: any[] = []

                                // Create new task
                                total = amount * price
                                list_notifications.push(
                                    <div style={{ margin: 'auto' }}>
                                        <Tag color="rgb(86, 135, 156)">{amount} viewers</Tag> x &nbsp;
                                        <Tag color="rgb(86, 135, 156)">{price} vnd</Tag> = &nbsp;
                                        <Tag color="rgb(86, 135, 156)">{total.toLocaleString(undefined, { maximumFractionDigits: 2 })} vnd</Tag>
                                    </div>
                                )

                                if (total > user.balance) {
                                    list_notifications.push(
                                        <Alert
                                            type="error"
                                            description={`Your order is ${
                                                total.toLocaleString(undefined, {
                                                    maximumFractionDigits: 2
                                                })} > your balance ${
                                                user.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                                }`}
                                            message="Out of balance"
                                        />
                                    )
                                } else {
                                    if (total > 0) {
                                        list_notifications.push(
                                            <Alert
                                                type="info"
                                                message={<span>
                                                    Your order is total <Tag color="#108ee9">{total.toLocaleString(undefined, { maximumFractionDigits: 2 })} vnd</Tag>
                                                </span>
                                                }
                                            />
                                        )
                                    } else {
                                        list_notifications.push(
                                            <Alert
                                                type="success"
                                                message={`No payment require`}
                                            />
                                        )
                                    }
                                }




                                return (
                                    <span>
                                        {
                                            list_notifications.map(v => (<span>{v}<br /></span>))
                                        }
                                    </span>
                                )

                            }}
                        />



                    </Form>


                </Spin>

            </Modal>

        )
    }
}

const ViewersLivestreamServiceWidgetViewWithForm = Form.create<Props>({ name: "somed" })(ViewersLivestreamServiceWidgetView)

export const ViewersLivestreamServiceWidget = () => (
    <ViewersLivestreamServiceWidgetViewWithForm
        widget={buff_viewers_livestream_widget_store}
    />
)