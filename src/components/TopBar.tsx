import React, { useState, useEffect, useRef } from 'react';
import { Layout, Popover, Icon, Avatar, Row, Col } from 'antd'
import { withAppDrawerState } from '../store/app-drawer'
import { AppDrawer } from '../components/AppDrawer'
import { UserProfile } from './UserProfile';
import { Link } from 'react-router-dom';


export const TopBar = withAppDrawerState(props => {

    const [drawer_visible, set_drawer_visible] = useState<boolean>(false)


    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', height: 55 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Icon
                    type="menu"
                    style={{ fontSize: 25, color: '#f8ffd9', marginLeft: 20 }}
                    onClick={() => props.store.toggle()}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 55 }}>

                <Link to="/">
                    <img
                        src="https://freeiconshop.com/wp-content/uploads/edd/play-flat.png"
                        style={{
                            width: 35,
                            borderRadius: 20,
                            borderStyle: "solid",
                            borderWidth: 2,
                            borderColor: 'white'
                        }}
                    />
                </Link>
            </div>
            <div style={{ display: 'flex' }}>
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
            </div>
        </div>
    )
})
