import React, { useEffect, Fragment, useState } from 'react'
import { Modal, Form as AntdForm, Input, Icon, Select, Row, Col, Avatar, Tag, Alert, Button, Switch, Card, Spin } from 'antd'
import { withForm, Form } from '../../../containers/Form'
import { VIPViewersLivestream } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestream'
import { VipViewersLivestreamGroup } from '../../../schema/Services/VIPViewersLivestream/VipViewersLivestreamGroup'
import { FacebookObjectInput, LivestreamFacebookTargetType } from '../../../components/FacebookObjectInput'
import { create_vip_viewers_livestream } from '../../../relayjs-mutations/create_vip_viewers_livestream'
import { update_vip_viewers_livestream } from '../../../relayjs-mutations/update_vip_viewers_livestream'
import Moment from 'react-moment';
import { graphql } from 'babel-plugin-relay/macro'
import { GraphQLWrapper } from '../../../containers/GraphQLWrapper'
import { ServicePricing } from '../../../schema/User/ServicePricing'
import { User } from '../../../schema/User/User'

const query = graphql`
    query CUModalQuery{
        me{
            id, balance, price_percent
        }
        pricing{
            vip_viewers_livestream
        }
    }
`


export type CUModalProps = {
    mode: 'create' | 'update',
    vip?: VIPViewersLivestream,
    onClose: Function
}

export type CUModalGraphqlData = { me: User, pricing: ServicePricing }


export const CUModal = GraphQLWrapper<CUModalGraphqlData, CUModalProps>(query, {}, withForm(props => {

    const [editing_uid, set_editing_uid] = useState<boolean>(props.mode == 'create')
    const [error, set_error] = useState<string | null>(null)
    const [loading, set_loading] = useState<boolean>(false)


    const submit = () => props.form.submit(async data => {
        set_error(null)
        try {
            set_loading(true)
            if (props.mode == 'create') {
                await create_vip_viewers_livestream({ ...data, active: true })
            } else {
                await update_vip_viewers_livestream(data)
            }
            set_error(null)
            set_loading(false)
            set_editing_uid(true)
            props.onClose()
        } catch (e) {
            set_error(e.message)
            set_loading(false)
        }
    })

    let OrderInfoCard: any = null
    let CancelVipSubscription: any = null

    const { amount, days } = props.form.data
    if (!props.loading && props.data && props.data.me && props.data.pricing) {

        if (amount && days && props.mode == 'create') {
            const total = amount * days * props.data.pricing.vip_viewers_livestream
            OrderInfoCard = (
                <Card title="Order infomation" size="small" style={{ lineHeight: '2em' }}>
                    <Row>
                        <Tag color="#108ee9">{amount} viewers</Tag> x <Tag color="#108ee9">{days} days</Tag>x <Tag color="#108ee9">{props.data.pricing.vip_viewers_livestream}đ /viewer/day </Tag> = <Tag color="#108ee9">{
                            total.toLocaleString(undefined, { maximumFractionDigits: 0 })
                        }đ</Tag>
                    </Row>
                    <Row>Your discount: <Tag color="blue">{100 - props.data.me.price_percent}% </Tag></Row>
                    <Row>Total: <Tag color="#108ee9">{
                        Math.ceil(total * props.data.me.price_percent * 0.01).toLocaleString(undefined, { maximumFractionDigits: 0 })
                    }đ </Tag></Row>
                </Card>
            )
        }


        if (props.vip && props.mode == 'update') {

            const remain_days = props.vip.end_time > Date.now() ? (props.vip.end_time - Date.now()) / 86400000 : 0
            const remain_money = Math.floor(props.vip.amount * remain_days * props.data.pricing.vip_viewers_livestream)

            const new_total = Math.ceil((amount || props.vip.amount) * ((days || 0) + remain_days) * props.data.pricing.vip_viewers_livestream)
            const delta_total = new_total - remain_money

            const CurrentSubscription = (
                <div style={{ lineHeight: '2em' }}>
                    <Tag color="#108ee9">
                        {props.vip.amount} viewers</Tag>
                    x < Tag color="#108ee9" > {remain_days.toFixed(1)} days</Tag >
                    x < Tag color="#108ee9" > {props.data.pricing.vip_viewers_livestream}đ / viewer / day </Tag >
                    = <Tag color="#108ee9">{remain_money.toLocaleString(undefined, { maximumFractionDigits: 0 })}đ</Tag>
                </div>
            )

            if ((amount && amount != props.vip.amount) || days) {

                OrderInfoCard = (
                    <Card title="Order infomation" size="small" style={{ lineHeight: '2em' }}>
                        <Row>
                            <Col><h4>Remain subscription</h4></Col>
                            <Col>{CurrentSubscription} </Col>
                        </Row>
                        <Row>
                            <Col><h4>New subscription</h4></Col>
                            <Col>
                                <Tag color="#108ee9">{amount || props.vip.amount} viewers</Tag>
                                x <Tag color="#108ee9">{((days || 0) + remain_days).toFixed(1)} days</Tag>
                                x <Tag color="#108ee9">{props.data.pricing.vip_viewers_livestream}đ /viewer/day </Tag>
                                = <Tag color="#108ee9">{new_total.toLocaleString(undefined, { maximumFractionDigits: 0 })}đ</Tag>
                            </Col>
                        </Row>
                        <Row>
                            <Col><h4>Delta</h4></Col>
                            <Col>
                                <Tag color="#108ee9">{new_total.toLocaleString(undefined, { maximumFractionDigits: 0 })}đ</Tag>
                                - <Tag color="#108ee9">{remain_money.toLocaleString(undefined, { maximumFractionDigits: 0 })}đ</Tag>
                                = <Tag color="#108ee9">{delta_total.toLocaleString(undefined, { maximumFractionDigits: 0 })}đ</Tag>
                            </Col>
                        </Row>
                        <Row>
                            <Col><h4>Your discount</h4></Col>
                            <Col><Tag color="blue">{100 - props.data.me.price_percent}% </Tag></Col>
                        </Row>
                        <Row>
                            <Col><h4>Total</h4></Col>
                            <Col>
                                <Tag color="#108ee9">{
                                    Math.ceil(
                                        delta_total
                                        * props.data.me.price_percent
                                        * 0.01
                                    ).toLocaleString(undefined, { maximumFractionDigits: 0 })
                                }đ </Tag>
                            </Col>
                        </Row>
                        {
                            delta_total < 0 && (
                                <Row>
                                    <Col><h4>Refund 80%</h4></Col>
                                    <Col>
                                        <Tag color="#c01922">{
                                            Math.ceil(
                                                delta_total
                                                * props.data.me.price_percent
                                                * 0.008
                                            ).toLocaleString(undefined, { maximumFractionDigits: 0 })
                                        }đ </Tag>
                                    </Col>
                                </Row>
                            )
                        }
                    </Card>
                )
            }

            const CancelVipSubscriptionConfirm = (
                <Fragment>
                    <Row type="flex" justify="start" align="middle" >
                        <Col>
                            <Avatar
                                src={`http://graph.facebook.com/${props.vip.id}/picture?type=large`}
                                size={65}
                            />
                        </Col>
                        <Col style={{ paddingLeft: 10, overflowWrap: 'break-word', lineHeight: '2em' }}>
                            {props.vip.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {CurrentSubscription}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Refund back &nbsp;
                            <Tag color="blue">{100 - props.data.me.price_percent}% </Tag>
                            x &nbsp;<Tag color="red">80% </Tag>
                            = &nbsp;<Tag color="#108ee9">{
                                Math.ceil(
                                    remain_money
                                    * props.data.me.price_percent
                                    * 0.008
                                ).toLocaleString(undefined, { maximumFractionDigits: 0 })
                            }đ </Tag>
                        </Col>
                    </Row>
                </Fragment>
            )

            CancelVipSubscription = (
                <Row type="flex" justify="end">
                    <Col></Col>
                    <Col style={{ padding: 5 }}>
                        <Button
                            size="small"
                            type="danger"
                            icon="delete"
                            onClick={() => Modal.confirm({
                                title: "Do you want to cancel this VIP subscription?",
                                content: CancelVipSubscriptionConfirm
                            })}
                        >Cancel VIP and refund</Button>
                    </Col>
                </Row>
            )
        }

    }


    return (
        <Modal
            visible={true}
            onOk={() => submit()}
            onCancel={() => props.onClose()}
            destroyOnClose
            closable={false}
            okButtonProps={{ loading }}
            title={props.mode == 'create' ? 'Create new VIP subscription' : 'Edit VIP subscription'}
        >
            <Spin spinning={props.loading}>

                <AntdForm>
                    {
                        error && <Alert type="error" message={error} />
                    }
                    {
                        props.mode == 'update' && props.form.field<boolean>({
                            name: 'active',
                            render: ({ setValue }) => (
                                <AntdForm.Item >
                                    <Row type="flex" justify="space-between" align="middle">
                                        <Col> <h3><Icon type="clock-circle" /> Active status</h3> </Col>
                                        <Col>
                                            {
                                                props.vip && props.vip.active ? <Tag color={'rgb(21, 100, 42)'}>Running <Icon type="sync" spin /></Tag> : <Tag color={'#c01922'}> Stopped </Tag>
                                            }
                                        </Col>
                                    </Row>
                                    <Switch defaultChecked={props.vip && props.vip.active} onChange={checked => setValue(checked)} />
                                </AntdForm.Item>
                            )
                        })
                    }
                    {
                        props.form.field({
                            name: 'id',
                            require: 'Enter Facebook fanpage or Profile',
                            initalValue: props.mode == 'create' ? undefined : props.vip && props.vip.id,
                            render: ({ error, loading, setValues, value, set_touched, touched }) => (
                                <AntdForm.Item >
                                    <Row type="flex" justify="space-between" align="middle">
                                        <Col>
                                            <h3>
                                                <Icon type="user" /> Fanpage or profile {
                                                    props.mode == 'create' && <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag>
                                                }
                                            </h3>
                                        </Col>
                                    </Row>
                                    {
                                        error && <Alert type="error" message={error} />
                                    }
                                    {
                                        value && value != '' && (
                                            <Row
                                                type="flex"
                                                justify="space-between"
                                                align="middle"
                                                className="livestream-target-item"
                                                style={{ padding: 5, borderRadius: 5 }}
                                            >
                                                <Col span={4}>
                                                    <Avatar src={`http://graph.facebook.com/${props.form.data.id}/picture?type=large`} size={60} />
                                                </Col >
                                                <Col span={18}>
                                                    <div style={{ padding: 10, flexWrap: 'wrap' }}>
                                                        {props.mode == 'create' ? props.form.data.name : props.vip && props.vip.name}
                                                    </div>
                                                </Col>
                                                <Col span={2}>
                                                    {
                                                        props.mode == 'create' && (
                                                            <Icon
                                                                type="edit"
                                                                style={{ color: 'rgb(81, 74, 157)', fontSize: 20, cursor: 'pointer' }}
                                                                onClick={() => set_editing_uid(true)}
                                                            />
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        )
                                    }

                                    {
                                        editing_uid && (
                                            <FacebookObjectInput
                                                placeholder="Enter link of fanpage or profile here then click search"
                                                onSelect={({ name, image, type, uid }) => {
                                                    // if (type == LivestreamFacebookTargetType.group) return
                                                    setValues({ id: uid, name })
                                                    set_editing_uid(false)
                                                }}
                                            />
                                        )
                                    }

                                </AntdForm.Item>
                            )
                        })
                    }
                    {
                        props.form.field<number>({
                            name: 'amount',
                            require: props.mode == 'create' ? 'Select amount' : undefined,
                            render: ({ error, loading, setValue, value, set_touched, touched }) => (
                                <AntdForm.Item>
                                    <Row type="flex" justify="space-between" align="middle">

                                        {
                                            props.mode == 'create' ? (
                                                <Col>
                                                    <h3><Icon type="eye" /> Viewers amount <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag></h3>
                                                </Col>
                                            ) : (
                                                    <Fragment>
                                                        <Col><h3><Icon type="eye" /> Change amount</h3></Col>
                                                        <Col> <Tag color="#108ee9">Current {props.vip && props.vip.amount} viewers</Tag></Col>
                                                    </Fragment>

                                                )
                                        }

                                    </Row>
                                    {
                                        error && <Alert type="error" message={error} />
                                    }
                                    <Select onChange={setValue} placeholder="Click to select viewers amount when livestream">
                                        {
                                            [30, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000].map(amount => (
                                                <Select.Option value={amount}>{amount}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </AntdForm.Item>
                            )
                        })
                    }
                    {
                        props.form.field<number>({
                            name: 'days',
                            require: props.mode == 'create' ? 'Select day' : undefined,
                            render: ({ error, loading, setValue, value, set_touched, touched }) => (
                                <AntdForm.Item>
                                    <Row type="flex" justify="space-between" align="middle" >

                                        {
                                            props.mode == 'create' ? (
                                                <Col><h3>
                                                    <Icon type="calendar" /> Subscription days <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag>
                                                </h3></Col>
                                            ) : (
                                                    <Fragment>
                                                        <Col><h3><Icon type="eye" /> Extend day</h3></Col>
                                                        <Col><Tag color="#108ee9">
                                                            Current <Moment format="DD/MM/YYYY H:mm">{props.vip && props.vip.end_time}</Moment> ~ <Moment fromNow>{props.vip && props.vip.end_time}</Moment>
                                                        </Tag></Col>
                                                    </Fragment>
                                                )
                                        }



                                    </Row>
                                    {
                                        error && <Alert type="error" message={error} />
                                    }
                                    <Select placeholder="Click to select days" onChange={setValue}>
                                        {
                                            [15, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map(days => (
                                                <Select.Option value={days}>
                                                    {props.mode == 'update' && '+ '}
                                                    {days} days {days >= 30 ? `~ (${Math.floor(days / 30)} months)` : ''}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>

                                </AntdForm.Item>
                            )
                        })
                    }

                    {
                        props.form.field<VipViewersLivestreamGroup[]>({
                            name: 'groups',
                            initalValue: [],
                            render: ({ error, loading, setValue, value: groups, set_touched, touched }) => (
                                <AntdForm.Item>
                                    <Row type="flex" justify="space-between" align="bottom"  >
                                        <Col><h3><Icon type="usergroup-add" /> Groups </h3></Col>
                                        <Col>
                                            <Tag color="#108ee9">{groups.length} groups</Tag>
                                        </Col>
                                    </Row>
                                    {
                                        groups.map(group => (
                                            <Row
                                                type="flex"
                                                justify="space-between"
                                                align="middle"
                                                className="livestream-target-item"
                                                style={{ padding: 5, borderRadius: 5 }}
                                            >
                                                <Col span={4}>   <Avatar src={group.image} size={60} />  </Col >
                                                <Col span={18}>
                                                    <div style={{ padding: 10, flexWrap: 'wrap' }}>{group.name}</div>
                                                </Col>
                                                <Col span={2}>
                                                    <Icon
                                                        type="close-circle"
                                                        style={{ color: 'rgb(81, 74, 157)', fontSize: 20, cursor: 'pointer' }}
                                                        onClick={() => setValue(groups.filter(g => g.uid != group.uid))}
                                                    />
                                                </Col>
                                            </Row>

                                        ))
                                    }
                                    <Row>
                                        <Col>
                                            <FacebookObjectInput
                                                onSelect={({ name, image, type, uid }) => {
                                                    if (type != LivestreamFacebookTargetType.group) return
                                                    if (groups.filter(g => g.uid == uid).length > 0) {
                                                        setValue(groups.map(g => g.uid == uid ? { name, image, uid } : g))
                                                    } else {
                                                        setValue([
                                                            { image, uid, name },
                                                            ...groups
                                                        ])
                                                    }
                                                }}
                                                placeholder="Enter your group URL here then click search"
                                            />
                                        </Col>
                                    </Row>
                                </AntdForm.Item>
                            )
                        })
                    }

                    {
                        props.form.field<string>({
                            name: 'note',
                            require: 'Enter note',
                            initalValue: props.mode == 'update' ? props.vip && props.vip.note : undefined,
                            render: ({ error, loading, setValue, value, set_touched, touched }) => {
                                return (
                                    <AntdForm.Item>
                                        <Row type="flex" justify="space-between" align="bottom">
                                            <Col ><h3><Icon type="form" /> Note <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag></h3></Col>
                                            <Col>
                                            </Col>
                                        </Row>
                                        {
                                            error && <Alert type="error" message={error} />
                                        }
                                        <Input
                                            placeholder="Some note for this VIP"
                                            value={value}
                                            onChange={e => setValue(e.target.value)}
                                            allowClear
                                        />
                                    </AntdForm.Item>
                                )
                            }
                        })
                    }
                </AntdForm>
                {OrderInfoCard}
                {CancelVipSubscription}
            </Spin>
        </Modal >
    )
}))