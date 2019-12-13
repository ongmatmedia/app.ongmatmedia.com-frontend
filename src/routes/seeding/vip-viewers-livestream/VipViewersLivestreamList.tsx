import React, { Fragment, useState } from 'react'
import { Row, Col, Spin, List, Card, Avatar, Tag, Tooltip } from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import { GraphQLWrapper } from '../../../containers/GraphQLWrapper'
import { VIPViewersLivestreamConnection } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestreamConnection'
import { CUModal } from './CUModal'
import { VIPViewersLivestream } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestream'
import Moment from 'react-moment';
import { VipViewersLivestreamReport } from './VipViewersLivestreamReport'

const query = graphql`
    query VipViewersLivestreamListQuery{
        vip_viewers_livestream_tasks{
            edges{
                node{
                    id,
                    active,
                    amount, 
                    note,
                    name,
                    created_time,
                    updated_time,
                    end_time,
                    groups{id,name,image}
                }
            }
        }
    }
`


export const VipViewersLivestreamList = GraphQLWrapper<{ vip_viewers_livestream_tasks: VIPViewersLivestreamConnection }, { search: string }>(query, {}, props => {

    const [editing_vip, set_editing_vip] = useState<VIPViewersLivestream | null>(null)

    if (props.loading) {
        return (
            <Row align="middle" type="flex" justify="center">
                <Col><Spin spinning={true} /></Col>
            </Row>
        )
    }

    return props.data && (
        <Fragment>
            {
                editing_vip && <CUModal mode="update" onClose={() => set_editing_vip(null)} vip={editing_vip} />
            }
            <VipViewersLivestreamReport vips={props.data ? props.data.vip_viewers_livestream_tasks.edges.map(e => e.node) : []}/>
            <List
                grid={{
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                }}
                rowKey="uid"
                pagination={{
                    pageSizeOptions: ['5', '10', '20', '30', '50', '100', '200', '300', '400', '500', '1000'],
                    showSizeChanger: true
                }}
                dataSource={
                    props
                        .data
                        .vip_viewers_livestream_tasks
                        .edges
                        .map(e => e.node)
                        .filter(e => e.id.includes(props.search) || e.name.toLowerCase().includes(props.search))
                }
                renderItem={item => (
                    <List.Item style={{ margin: 5 }} >
                        <Card type="inner" hoverable size="small" onClick={() => set_editing_vip(item)}  >
                            <Row type="flex" justify="start" align="middle" >
                                <Col>
                                    <Avatar
                                        src={`http://graph.facebook.com/${item.id}/picture?type=large`}
                                        size={65}
                                    />
                                </Col>
                                <Col style={{ paddingLeft: 10, overflowWrap: 'break-word', lineHeight: '2em' }}>
                                    <Row><Col>{item.name}</Col></Row>
                                    <Row><Col>
                                        <Tag color="#108ee9">{item.amount} viewers</Tag>
                                        {
                                            !item.active && <Tag color="rgb(192, 25, 34)">Disabled</Tag>
                                        }
                                    </Col></Row>
                                    <Row>
                                        <Col>
                                            <Tooltip title={<Moment format="DD/MM/YYYY H:mm">{item.end_time}</Moment>} placement="bottom">
                                                <Tag color={item.end_time > Date.now() ? 'blue' : '#c01922'}>
                                                    Expire <Moment fromNow>{item.end_time}</Moment>
                                                </Tag>
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </Fragment>
    )
})