import React, { useState, useEffect, useRef } from 'react';
import { Layout, Popover, Icon, Avatar, Row, Col, Button } from 'antd'
import { withAppDrawerState } from '../store/app-drawer'
import { AppDrawer } from '../components/AppDrawer'
import { UserProfile } from './UserProfile';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const TopBar = withAppDrawerState(props => {

    const [drawer_visible, set_drawer_visible] = useState<boolean>(false)
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

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
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', float: "right", marginRight: 20 }}>
                    <Button onClick={() => changeLanguage('vi')}>vi</Button>
                    <Button onClick={() => changeLanguage('en')}>en</Button>
                </div>
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
