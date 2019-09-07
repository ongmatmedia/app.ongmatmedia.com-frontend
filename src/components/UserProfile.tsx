import React from 'react';
import { Popover, Avatar, Col, Row, Spin } from "antd";
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from '../configs/relayjs';
import { User } from '../schema/User/User';

const graphql = require('babel-plugin-relay/macro');

const query = graphql`
        query UserProfileQuery{
            me{
                balance,username
            }
        }
`

const UserProfileView = (props: { user: User | null }) => (
    <Row style={{ padding: 10, height: 60}}>
        <Col>
            <Avatar
                src='https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png'
                className="gx-size-40 gx-pointer gx-mr-3" alt=""
            />
        </Col>

        <Col>
            <Row  style={{flex:1}}><Col>{
                props.user && props.user.username
            }</Col></Row>
            <Row style={{flex:1}}><Col>{
                props.user && props.user.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })
            } vnd</Col></Row>
        </Col>
    </Row>
)


export const UserProfile = () => (
    <QueryRenderer
        environment={RelayEnvironment}
        query={query}
        variables={{}}
        cacheConfig={{ force: true }}
        render={rs => (
            <Spin spinning={rs.props == null}>
                {
                    rs.props && <UserProfileView user={(rs.props as any).me} />
                }
            </Spin>
        )}

    />
)