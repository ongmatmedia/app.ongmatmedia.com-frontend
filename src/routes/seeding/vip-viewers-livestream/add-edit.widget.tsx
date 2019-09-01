import React from 'react'
import { Modal, Form, Input, Select, Alert, Spin, Switch, Card, Tag, notification } from "antd";
import { Component } from "react";
import { FormProps, FormComponentProps } from "antd/lib/form";
import FormItem from "antd/lib/form/FormItem";
import { VipViewrsLivestreamWidgetStore, vip_viewers_livestream_widget_store } from '../../../store/widgets/add-edit-vip-viewers-livestream.widget'
import { observer } from "mobx-react";
import { add_task, update_task } from '../../../relayjs-mutations';
import { VIPBuffViewersLivestreamTask } from '../../../schema/Task/VIPBuffViewersLivestream';
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from '../../../configs/relayjs';
import { User } from '../../../schema/User/User';
import Moment from 'react-moment'
const graphql = require('babel-plugin-relay/macro');


type Props = FormComponentProps & { store: VipViewrsLivestreamWidgetStore }

const days_list = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300]
const amount_list = [30, 50, 100, 150, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1000, 1300,1500,1800,2000,2500,3000]

const selfQuery = graphql`
        query addEditQuery{
            me{
                balance
                username
                pricing{
                    VIPBuffViewersLivestreamTask
                }
            }
        }
`

@observer
class VipViewersLivestreamServiceWidgetView extends Component<Props>{

    submit = async () => {
        this.props.form.validateFields(async (errors, values: any) => {
            if (errors) return
            try {
                vip_viewers_livestream_widget_store.loading()

                if (vip_viewers_livestream_widget_store.mode == 'add') {
                    if (!values.groups) values.groups = []
                    await add_task<VIPBuffViewersLivestreamTask>(
                        'VIPBuffViewersLivestreamTask',
                        values
                    )
                    notification.success({
                        message: 'Add success'
                    })
                }


                if (vip_viewers_livestream_widget_store.mode == 'edit') {

                    // Validate data
                    const task = vip_viewers_livestream_widget_store.task as VIPBuffViewersLivestreamTask
                    values.days == 0 && delete values.days
                    values.amount == task.amount && delete values.amount
                    values.uid = task.uid
                    await update_task<VIPBuffViewersLivestreamTask>(
                        'VIPBuffViewersLivestreamTask',
                        values
                    )
                    notification.success({
                        message: 'Update success'
                    })
                }


                vip_viewers_livestream_widget_store.hide()

            } catch (e) {
                console.log(e)
                vip_viewers_livestream_widget_store.show_error(e.source.errors[0].message)
            }
            vip_viewers_livestream_widget_store.stopLoading()

        })
    }

    render() {

        const { getFieldDecorator } = this.props.form
        const { Option } = Select
        const { task } = vip_viewers_livestream_widget_store
        return (
            <Modal
                visible={this.props.store.isVisible}
                title={task ? "Edit VIP" : "Add vip viewers livestream"}
                okText="OK"
                onOk={() => { this.submit() }}
                onCancel={() => { vip_viewers_livestream_widget_store.hide() }}
                destroyOnClose={true}
            >
                {
                    vip_viewers_livestream_widget_store.error
                    && (<div>
                        <Alert message={vip_viewers_livestream_widget_store.error} type="error" showIcon /><br />
                    </div>)
                }
                <Spin spinning={vip_viewers_livestream_widget_store.isLoading}>
                    <Form layout="vertical">

                        {
                            task != null && <FormItem label="Active this vip ???" key="active">
                                {getFieldDecorator('active', {
                                    initialValue: task.active
                                })(
                                    <Switch defaultChecked={task.active} />
                                )}
                            </FormItem>
                        }
                        {
                            (task == null || this.props.form.getFieldValue('active') === true) && (
                                [
                                    <FormItem label="ID" key="uid">
                                        {getFieldDecorator('uid', {
                                            rules: [{
                                                required: true, message: 'The input is not valid uid!',
                                            }],
                                            initialValue: task ? task.uid : ""
                                        })(
                                            <Input placeholder="Enter UID of page, profile or Facebook URL" disabled={task != null} />
                                        )}
                                    </FormItem>,

                                    <FormItem label="Name" key="name">
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true, message: 'The input is not valid name!',
                                            }],
                                            initialValue: task ? task.name : ""
                                        })(
                                            <Input placeholder="Name of uid" />
                                        )}
                                    </FormItem>,



                                    <FormItem label="Amount" key="amount">
                                        {getFieldDecorator('amount', {
                                            rules: [{ required: true, message: 'Please select amount' }],
                                            initialValue: task == null ? 50 : task.amount
                                        })(
                                            <Select style={{ width: 120 }}>
                                                {
                                                    amount_list.map(v => <Option value={v} key={v}>{
                                                        task != null && task.amount == v ? `${v} **` : v
                                                    }</Option>)
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    ,


                                    <FormItem label={task ? 'Extends days' : 'Days'} key="days">
                                        {getFieldDecorator('days', {
                                            rules: [{ required: true, message: 'Please select days!' }],
                                            initialValue: task ? 0 : 30
                                        })(
                                            <Select style={{ width: 120 }}>
                                                {
                                                    [
                                                         ... (task ? [0] : []), ...days_list
                                                    ].map(v => <Option value={v} key={v}>{v}</Option>)
                                                }
                                            </Select>
                                        )}
                                    </FormItem>, 
                                    <FormItem label="Buff in groups" key="active_groups">
                                        {getFieldDecorator('active_groups', {
                                            rules: [{ required: true, message: 'Active buff live viewers in groups' }],
                                            initialValue: task ? task.active_groups : false
                                        })(
                                            <Switch defaultChecked={task ? task.active_groups : false} />
                                        )}
                                    </FormItem>,


                                    this.props.form.getFieldValue('active_groups') && (
                                        <FormItem label="List groups" key="groups">
                                            {getFieldDecorator('groups', {
                                                rules: [{ required: true, message: 'Active buff live viewers in groups' }],
                                                initialValue: task ? ((task.groups as any).toJS() ) || [] : []
                                            })(
                                                <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode">
                                                    {
                                                        (this.props.form.getFieldValue('groups') as number[] || []).map(v => (
                                                            <Select.Option key={v}>{v}</Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>
                                    ),



                                    <FormItem label="Note" key="note">
                                        {getFieldDecorator('note', {
                                            rules: [{ required: true, message: 'Some note is require !!!' }],
                                            initialValue: task ? task.note : ""
                                        })(
                                            <Input placeholder="Note" />
                                        )}
                                    </FormItem>,
                                    <QueryRenderer
                                        query={selfQuery}
                                        variables={{}}
                                        environment={RelayEnvironment}
                                        render={rs => {
                                            if (!rs.props) return null

                                            const user = (rs.props as any).me as User
                                            const amount = this.props.form.getFieldValue('amount')
                                            const days = this.props.form.getFieldValue('days')
                                            const price = user.pricing.VIPBuffViewersLivestreamTask


                                            let total = 0

                                            let list_notifications: any[] = []

                                            if (task != null) {

                                                // Update task

                                                // If change amount
                                                if (amount > task.amount && Date.now() < task.end_time) {
                                                    const delta_days = Math.ceil(
                                                        (task.end_time - Date.now()) / 1000 / 60 / 60 / 24
                                                    )
                                                    const delta_amount = amount - task.amount
                                                    const delta_total = delta_days * delta_amount * price
                                                    list_notifications.push(
                                                        <Alert
                                                            type="info"
                                                            message={(
                                                                <div>
                                                                    Your current VIP end time is <Moment format="DD/MM/YYYY">{task.end_time}</Moment> = {delta_days} days from now<br />
                                                                    You change viewers amount from {task.amount} to {amount} = {delta_amount} viewers<br />
                                                                    <Tag color="#108ee9">{delta_amount} viewers</Tag>
                                                                    x <Tag color="#108ee9">{delta_days} days</Tag>
                                                                    x <Tag color="#108ee9">{price} vnd </Tag>
                                                                    = <Tag color="#108ee9">{delta_total.toLocaleString(undefined, { maximumFractionDigits: 2 })} vnd </Tag>
                                                                </div>
                                                            )}
                                                        />


                                                    )

                                                    total += delta_total
                                                }

                                                // If extends time
                                                if (days > 0) {
                                                    const extends_total = amount * days * price
                                                    list_notifications.push(

                                                        <Alert
                                                            type="info"
                                                            message={(
                                                                <div>
                                                                    You increase &nbsp;
                                                                    <Tag color="#108ee9">{amount} viewers</Tag>
                                                                    x <Tag color="#108ee9">{days} days</Tag>
                                                                    x <Tag color="#108ee9">{price} vnd</Tag>
                                                                    = <Tag color="#108ee9">{extends_total.toLocaleString(undefined, { maximumFractionDigits: 2 })} vnd</Tag>
                                                                </div>
                                                            )}
                                                        />
                                                    )

                                                    total += extends_total
                                                }
                                            } else {

                                                // Create new task
                                                total = days * amount * price
                                                list_notifications.push(
                                                    <div style={{ margin: 'auto' }}>
                                                        <Tag color="rgb(86, 135, 156)"  >{days} days</Tag> x &nbsp;
                                                        <Tag color="rgb(86, 135, 156)">{amount} viewers</Tag> x &nbsp;
                                                        <Tag color="rgb(86, 135, 156)">{price} vnd</Tag> = &nbsp;
                                                        <Tag color="rgb(86, 135, 156)">{total.toLocaleString(undefined, { maximumFractionDigits: 2 })} vnd</Tag>
                                                    </div>
                                                )

                                            }

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
                                                if(total > 0){
                                                    list_notifications.push(
                                                        <Alert
                                                            type="info"
                                                            message={<span>
                                                               Your order is total <Tag color="#108ee9">{total.toLocaleString(undefined, { maximumFractionDigits: 2 })} vnd</Tag>
                                                            </span> 
                                                            } 
                                                        />
                                                    )
                                                }else{
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
                                                        list_notifications.map(v => (<span>{v}<br/></span>))
                                                    }
                                                </span>
                                            )

                                        }}
                                    />
                                ]
                            )


                        }

                    </Form>


                </Spin>

            </Modal>

        )
    }
}

const VipViewersLivestreamServiceWidgetViewWithForm = Form.create<Props>({ name: "somed" })(VipViewersLivestreamServiceWidgetView)

export const VipViewersLivestreamServiceWidget = () => (
    <VipViewersLivestreamServiceWidgetViewWithForm
        store={vip_viewers_livestream_widget_store}
    />
)