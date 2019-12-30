import React, { useEffect } from 'react';
import { Icon, Modal, Card, Row, Col, Avatar } from 'antd'
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { RouterProps } from 'react-router';
import { UserInfo } from '../containers/UserInfo';
import { RelayJSCache } from '../configs/relayjs';
import { useTranslation } from 'react-i18next';

const DrawerLinks: Array<{
    name: string,
    icon: string,
    to: string
}> = [
        { name: 'seeding_icon_title', icon: 'alert', to: '/seeding' },
        { name: 'payments_icon_title', icon: 'bars', to: '/payments' },
        { name: 'deposit_icon_title', icon: 'dollar', to: '/deposit' },
    ]

const LogoutButton = withRouter((props: RouterProps) => {
    const { t, i18n } = useTranslation('app_drawer');
    return (
        <div
            onClick={() => Modal.confirm({
                title: "Logout now?",
                onOk: async () => {
                    props.history.push('/auth/login')
                    RelayJSCache.clear()
                    await Auth.signOut()
                }
            })}
            style={{
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
            <Icon type="logout" style={{ fontSize: 30 }} />
            <span style={{ fontSize: 12, paddingTop: 15 }}>{t('logout_icon_title')}</span>
        </div>
    )
})



export const AppDrawer = (props: { onClick: Function }) => {
    const { t, i18n } = useTranslation('app_drawer');
    return (

        <div
            onClick={() => props.onClick()}
            style={{
                width: 260,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10
            }}
        >
            <UserInfo
                render={(loading, user) => (
                    <Card style={{ width: '100%' }} size="small" loading={loading}>
                        <Row type="flex" justify="start" align="middle">
                            <Col>
                                <Avatar src="https://hammockweb.com/slider/img/user.png" size={60} />
                            </Col>
                            <Col style={{ paddingLeft: 20 }}>
                                <Row><Col style={{ wordBreak: 'break-all', fontWeight: 'bold' }}>{user && user.username}</Col></Row>
                                <Row><Col style={{ color: 'rgb(0, 131, 227)', fontWeight: 'bold' }}>{
                                    user && user.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })
                                }
                                    <Icon type="dollar" style={{ fontSize: 16, verticalAlign: "-0.2em", paddingLeft: 3, color: "white" }} />
                                </Col></Row>
                            </Col>
                        </Row>
                    </Card>
                )}

            />

            {
                DrawerLinks.map(el => (
                    <Link key={el.to} to={el.to}>
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
                            <span style={{ fontSize: 12, paddingTop: 15 }}>{t(`${el.name}`)}</span>
                        </div>
                    </Link>
                ))
            }

            <LogoutButton />
        </div>
    )
}