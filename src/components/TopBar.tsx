import React from 'react';
import { Layout, Popover, Icon, Avatar } from 'antd'
import { withAppDrawerState } from '../store/app-drawer'
import { AppDrawer } from '../components/AppDrawer'
import { UserProfile } from './UserProfile';
import { Link } from 'react-router-dom';


export const TopBar = withAppDrawerState(props => (
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
            width: 90,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20
        }}>
            <Popover placement="bottomRight" content={UserProfile} trigger="click">
                <Avatar size={40} src="https://img.icons8.com/bubbles/2x/user.png" />
            </Popover>

            <Popover placement="bottomRight" content={<AppDrawer />} trigger="hover">
                <Icon type="appstore" style={{ fontSize: 20, color: '#f8ffd9' }} />
            </Popover>

        </div>

    </div>
))
 