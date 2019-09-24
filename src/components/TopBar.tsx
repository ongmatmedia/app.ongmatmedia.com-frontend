import React, { useState, useEffect, useRef } from 'react';
import { Layout, Popover, Icon, Avatar } from 'antd'
import { withAppDrawerState } from '../store/app-drawer'
import { AppDrawer } from '../components/AppDrawer'
import { UserProfile } from './UserProfile';
import { Link } from 'react-router-dom';


export const TopBar = withAppDrawerState(props => {

    const [drawer_visible, set_drawer_visible] = useState<boolean>(false)
 

    return (
        <div style={{
            height: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ width: 70, paddingLeft: 15 }}>
                <Icon
                    type="menu"
                    style={{ fontSize: 20, color: '#f8ffd9' }}
                    onClick={() => props.store.toggle()}
                />
            </div>

            <div>
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

            <div style={{
                width: 100,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 20
            }}>
                <Popover placement="bottomRight" content={UserProfile} trigger="click">
                    <Avatar size={40} src="https://img.icons8.com/bubbles/2x/user.png" style={{ marginRight: 10 }} />
                </Popover>

                <Popover
                    placement="bottomRight"
                    content={<AppDrawer onClick={() => set_drawer_visible(false)} />}
                    visible={drawer_visible}
                    trigger="click"
                >
                    <Icon
                        type="appstore"
                        style={{ fontSize: 30, color: '#f8ffd9' }}
                        onClick={() => set_drawer_visible(!drawer_visible)}
                    />
                </Popover>

            </div>

        </div>
    )
})
