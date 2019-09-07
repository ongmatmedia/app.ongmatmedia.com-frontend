import React from 'react';
import { Icon } from 'antd'
import { Link } from 'react-router-dom';

const DrawerLinks: Array<{
    name: string,
    icon: string,
    to: string
}> = [
        { name: 'Dashbroad', icon: 'home', to: '/' },
        { name: 'Seeding', icon: 'alert', to: '/seeding' },
        { name: 'Backup', icon: 'save', to: '/backups' },
        { name: 'Groups', icon: 'team', to: '/groups' },
        { name: 'Inbox', icon: 'message', to: '/inbox' },
        { name: 'CRM', icon: 'cluster', to: '/crm' },
        { name: 'Livestream', icon: 'eye', to: '/livestream' },
        { name: 'Account', icon: 'user', to: '/account' },
        { name: 'Deposit', icon: 'dollar', to: '/deposit' },
        { name: 'Agency', icon: 'global', to: '/agency' },
        { name: 'Log out', icon: 'logout', to: '/logout' },
        
    ]

export const AppDrawer = () => (

    <div style={{
        width: 260,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    }}>
        {
            DrawerLinks.map(el => (
                <Link to={el.to}>
                    <div style={{
                        width: 80,
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 15,
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                        className="drawerItem"
                    >
                        <Icon type={el.icon} style={{ fontSize: 30 }} />
                        <span style={{ fontSize: 12, paddingTop: 15 }}>{el.name}</span>
                    </div>
                </Link>
            ))
        }
    </div>
)