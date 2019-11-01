import React, { Fragment, useState } from 'react'
const graphql = require('babel-plugin-relay/macro');
import { GraphQLWrapper } from '../../containers/GraphQLWrapper'
import { UserConnection } from '../../schema/User/UserConnection'
import { Spin, List, Card, Col, Row, Tag, Icon, Tooltip, Button } from 'antd'
import { Avatar } from '@material-ui/core';
import { User } from '../../schema/User/User';
import { SendMoneyModal } from './SendMoneyModal';
import { UpdatePricePercentModal } from './UpdatePricePercentModal';
import { ResetPass } from './ResetPass';

const query = graphql`
    query AgencyListQuery{
        users{
            edges{
            node{
                username
                id
                balance
                price_percent
                created_at
            }
            }
        }

        me{
            price_percent
            balance
            username
        }
    }
`


export const AgencyList = GraphQLWrapper<{ users: UserConnection, me: User }>(query, {}, ({ loading, data }) => {

    if (loading) return (
        <Row type="flex" justify="space-around" align="middle" style={{ height: 200 }}>
            <Col>
                <Spin />
            </Col>
        </Row>
    )
    const [sent_money_to_user, set_sent_money_to_user] = useState<User | null>(null)
    const [update_price_percent_user, set_update_price_percent_user] = useState<User | null>(null)
    const [set_new_pass_for_user, set_set_new_pass_for_user] = useState<User | null>(null)

    return data && (
        <Fragment>
            {
                sent_money_to_user && (
                    <SendMoneyModal
                        onClose={() => set_sent_money_to_user(null)}
                        visible={true}
                        user={sent_money_to_user}
                        me={data.me}
                    />
                )
            }
            {
                update_price_percent_user && (
                    <UpdatePricePercentModal
                        visible={true}
                        onClose={() => set_update_price_percent_user(null)}
                        user={update_price_percent_user}
                        me={data.me}
                    />
                )
            }
            {
                set_new_pass_for_user && (
                    <ResetPass
                        visible={true}
                        onClose={() => set_set_new_pass_for_user(null)}
                        user={set_new_pass_for_user}
                    />
                )
            }
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 8,
                }}
                dataSource={data.users.edges.map(n => n.node)}
                renderItem={item => {

                    const percent = Number((
                        100 * item.price_percent / data.me.price_percent
                    ).toFixed(2))

                    const balance = item.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })

                    return (
                        <List.Item>
                            <Card
                                title={(
                                    <Row type="flex" align="middle" justify="start">
                                        <Col style={{ paddingRight: 5 }}><Avatar>{item.username.substring(0, 1)}</Avatar></Col>
                                        <Col>{item.username}</Col>
                                    </Row>
                                )}
                                actions={[
                                    <Tooltip placement="bottom" title="Deposit">
                                        <Icon
                                            type="dollar"
                                            key="dollar"
                                            onClick={() => set_sent_money_to_user(item)}
                                        />
                                    </Tooltip>,
                                    <Tooltip placement="bottom" title="Change price percent">
                                        <Icon
                                            type="percentage"
                                            key="percentage"
                                            onClick={() => set_update_price_percent_user(item)}
                                        />
                                    </Tooltip>,
                                    <Tooltip placement="bottom" title="Set new password">
                                        <Icon
                                            type="unlock"
                                            key="unlock"
                                            onClick={() => set_set_new_pass_for_user(item)} 
                                        />
                                    </Tooltip>,
                                ]}
                                style={{ lineHeight: '2em' }}
                            >
                                <Row type="flex" align="middle" justify="space-between">
                                    <Col >Price</Col>
                                    <Col><Tag color={percent >= 100 ? "#108ee9" : 'rgb(234, 16, 6)'}>{percent} %</Tag></Col>
                                </Row>
                                <Row type="flex" align="middle" justify="space-between">
                                    <Col >Balance</Col>
                                    <Col><Tag color="#108ee9">{balance} $</Tag></Col>
                                </Row>
                            </Card>
                        </List.Item >
                    )
                }}
            />
        </Fragment>
    )
})