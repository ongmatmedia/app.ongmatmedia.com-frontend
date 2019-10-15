import React from 'react'
import { Slider, Icon, Row, Col, Card, Button, Tag } from 'antd';
import { LivestreamSubscription } from '../../../schema/Services/Livestream/LivestreamSubscription'
import { User } from '../../../schema/User/User';
import { withForm } from '../../../containers/Form'
import { ServicePricing } from '../../../schema/User/ServicePricing';

type UpdateSubscriptionProps = {
    sub: LivestreamSubscription
    user: User
    pricing: ServicePricing
}

export const UpdateSubscription = withForm<UpdateSubscriptionProps>(props => {

    const old_subscription = {
        concurrent_limit: props.sub.concurrent_limit,
        days: Math.floor((props.sub.end_time - Date.now()) / 1000 / 60 / 60 / 24),
        pricing: props.pricing.livestream[props.sub.quality]
    }

    const old_total = old_subscription.concurrent_limit * old_subscription.days * old_subscription.pricing

    const new_subscription = {
        concurrent_limit: props.form.data.concurrent_limit || 0,
        days: props.form.data.days + old_subscription.days || 0,
        pricing: props.pricing.livestream[`p${props.form.data.quality || '480'}`]
    }

    const new_total = new_subscription.concurrent_limit * new_subscription.days * new_subscription.pricing

    const total = Math.ceil((new_total - old_total) * props.user.price_percent / 100)

    return (

        <Card title="Update subscription">
            <Row>
                <Col span={8}>
                    <span style={{ fontWeight: 'bold' }}>Change concurrent limit</span>
                </Col>
                <Col span={16}>
                    {
                        props.form.field({
                            initalValue: props.sub ? props.sub.concurrent_limit : 1,
                            name: 'concurrent_limit',
                            render: ({ setValue, value }) => <Slider onChange={n => setValue(n as number)} min={1} max={100} step={1} defaultValue={value} tooltipVisible={true} />
                        })
                    }

                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <span style={{ fontWeight: 'bold' }}>Max quality</span>
                </Col>
                <Col span={16}>
                    {
                        props.form.field({
                            initalValue: props.sub ? Number(props.sub.quality.split('p')[1]) : 480,
                            name: 'quality',
                            render: ({ setValue, value }) => (
                                <Row type="flex" justify="start" align="middle" gutter={20}>
                                    {
                                        [480, 720, 1080].map(q => (
                                            <Col>
                                                <Button
                                                    onClick={() => setValue(q)}
                                                    type={value == q ? 'primary' : 'dashed'}
                                                >{q}p </Button>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <span style={{ fontWeight: 'bold' }}>Extends day</span>
                </Col>
                <Col span={16}>
                    {
                        props.form.field({
                            initalValue: 0,
                            name: 'days',
                            render: ({ setValue, value }) => (
                                <Slider
                                    onChange={n => setValue(n as number)}
                                    min={0}
                                    max={120}
                                    step={10}
                                    defaultValue={value}
                                    tooltipVisible={true}
                                    tooltipPlacement="bottom"
                                />
                            )
                        })
                    }
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{ marginTop: 50 }}>
                <Col md={24} xxl={12} sm={24} xs={24} >
                    <Card>
                        <Row>
                            <Col span={8}> Current subscription </Col>
                            <Col span={16}>
                                <Tag color="#108ee9">{old_subscription.concurrent_limit} threads</Tag>
                                x <Tag color="#108ee9">{old_subscription.days} days</Tag>
                                x <Tag color="#108ee9"> {old_subscription.pricing}$ / thread / day ~ {props.sub.quality}</Tag>
                                = <Tag color="#87d068"> {
                                    old_total.toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    })
                                }$</Tag>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 10 }}>
                            <Col span={8}> New subscription </Col>
                            <Col span={16}>
                                <Tag color="#108ee9">{new_subscription.concurrent_limit} threads</Tag>
                                x <Tag color="#108ee9">{new_subscription.days} days</Tag>
                                x <Tag color="#108ee9"> {new_subscription.pricing}$ / thread / day ~ {props.form.data.quality}</Tag>
                                = <Tag color="#87d068"> {
                                    new_total.toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    })
                                }$</Tag>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 10 }}>
                            <Col span={8}> Delta </Col>
                            <Col span={16}>
                                <Tag color="#108ee9">{
                                    old_total.toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    })
                                }</Tag>
                                - <Tag color="#108ee9">{
                                    new_total.toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    })
                                }</Tag>
                                = <Tag color="#87d068">{
                                    (new_total - old_total).toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    })
                                }$</Tag>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 10 }}>
                            <Col span={8}> Discount </Col>
                            <Col span={16}>
                                <Tag color="red">{100 - props.user.price_percent}%</Tag>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 10 }}>
                            <Col span={8}> Total </Col>
                            <Col span={16}>
                                <Tag color="green">{
                                    total.toLocaleString(undefined, {
                                        maximumFractionDigits: 2
                                    })
                                } $</Tag>
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle"  >
                <Col >
                    <Button>Update subscription</Button>
                </Col>
            </Row>
        </Card>
    )
})