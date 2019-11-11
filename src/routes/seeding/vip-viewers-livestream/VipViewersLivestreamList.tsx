import React, { Fragment, useState } from 'react'
import { Row, Col, Spin, List, Card, Avatar, Tag } from 'antd'
import { graphql } from 'babel-plugin-relay/macro'
import { GraphQLWrapper } from '../../../containers/GraphQLWrapper'
import { VIPViewersLivestreamConnection } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestreamConnection'
import { CUModal } from './CUModal'
import { VIPViewersLivestream } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestream'

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
                    groups{uid,name,image}
                }
            }
        }
    }
`


export const VipViewersLivestreamList = GraphQLWrapper<{ vip_viewers_livestream_tasks: VIPViewersLivestreamConnection }>(query, {}, props => {

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
            <List
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 4,
                    xl: 6,
                    xxl: 6,
                }}
                dataSource={props.data.vip_viewers_livestream_tasks.edges.map(e => e.node)}
                renderItem={item => (
                    <List.Item >
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
                                    <Row><Col><Tag color="#108ee9">{item.amount} viewers</Tag></Col></Row>
                                    <Row><Col> <Tag color="cyan">30 days 6 hours</Tag></Col></Row>
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </Fragment>
    )
})