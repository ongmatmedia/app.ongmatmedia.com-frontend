import React, { useState, useEffect, useRef } from 'react';
import { Layout, Popover, Icon, Avatar, Row, Col } from 'antd'
import { withAppDrawerState } from '../store/app-drawer'
import { AppDrawer } from '../components/AppDrawer'
import { UserProfile } from './UserProfile';
import { Link } from 'react-router-dom';


export const TopBar = withAppDrawerState(props => {

    const [drawer_visible, set_drawer_visible] = useState<boolean>(false)


    return (
        <Row type="flex" justify="space-around" align="middle" style={{ lineHeight: '50px' }}>
            <Col span={8} >
                <Icon
                    type="menu"
                    style={{ fontSize: 25, color: '#f8ffd9', marginLeft: 10 }}
                    onClick={() => props.store.toggle()}
                />
            </Col>
            <Col span={8} >
                <Row type="flex" justify="space-around" align="top"> <Col>
                    <Link to="/">
                        <img
                            src="https://freeiconshop.com/wp-content/uploads/edd/play-flat.png"
                            style={{
                                width: 35,
                                marginBottom: 10,
                                borderRadius: 20,
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderColor: 'white'
                            }}
                        />
                    </Link>
                </Col> </Row>
            </Col>
            <Col span={8}  >
                <Row type="flex" justify="end" align="middle"> 
                    <Col>
                        <Popover
                            placement="bottomRight"
                            content={<AppDrawer onClick={() => set_drawer_visible(false)} />}
                            visible={drawer_visible}
                            trigger="click"
                        >
                            <Icon
                                type="appstore"
                                style={{ fontSize: 30, color: '#f8ffd9', marginRight: 10, marginTop: 10 }}
                                onClick={() => set_drawer_visible(!drawer_visible)}
                            />
                        </Popover>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
})
