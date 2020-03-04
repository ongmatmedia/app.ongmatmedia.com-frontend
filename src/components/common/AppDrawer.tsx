import { Avatar, Button, Card, Col, Icon, Modal, Row } from 'antd';
import { Auth } from 'aws-amplify';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import { AppCycleHook } from '../../AppCycleHook'

const DrawerLinks: Array<{
  name: string;
  icon: string;
  to: string;
}> = [
    { name: 'seeding_icon_title', icon: 'alert', to: '/seeding' },
    { name: 'payments_icon_title', icon: 'bars', to: '/payments' },
    { name: 'deposit_icon_title', icon: 'dollar', to: '/deposit' },
  ];

const LogoutButton = withRouter((props: RouterProps) => {
  const { t, i18n } = useTranslation('app_drawer');
  return (
    <div
      onClick={() =>
        Modal.confirm({
          title: 'Logout now?',
          onOk: async () => {
            props.history.push('/auth/login');
            await AppCycleHook.logout()
          },
        })
      }
      style={{
        width: 80,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 15,
        alignItems: 'center',
        cursor: 'pointer',
      }}
      className="drawerItem"
    >
      <Icon type="logout" style={{ fontSize: 30 }} />
      <span style={{ fontSize: 12, paddingTop: 15 }}>{t('logout_icon_title')}</span>
    </div>
  );
});

export const AppDrawer = (props: { onClick: Function }) => {
  const { t, i18n } = useTranslation('app_drawer');
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      onClick={() => props.onClick()}
      style={{
        width: 260,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
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
                <Row>
                  <Col style={{ wordBreak: 'break-all', fontWeight: 'bold' }}>
                    {user && user.username}
                  </Col>
                </Row>
                <Row>
                  <Col style={{ color: 'rgb(0, 131, 227)', fontWeight: 'bold' }}>
                    {user && user.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    <Icon
                      type="dollar"
                      style={{
                        fontSize: 16,
                        verticalAlign: '-0.2em',
                        paddingLeft: 3,
                        color: 'white',
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}
      />

      {DrawerLinks.map(el => (
        <Link key={el.to} to={el.to}>
          <div
            style={{
              width: 80,
              padding: 10,
              display: 'flex',
              flexDirection: 'column',
              marginTop: 15,
              alignItems: 'center',
              cursor: 'pointer',
            }}
            className="drawerItem"
          >
            <Icon type={el.icon} style={{ fontSize: 30 }} />
            <span style={{ fontSize: 12, paddingTop: 15 }}>{t(`${el.name}`)}</span>
          </div>
        </Link>
      ))}

      <LogoutButton />
      <div style={{
        width: 260,
        marginRight: 10,
        textAlign: 'center',
      }}
      >
        <Button type="link" onClick={() => changeLanguage('vi')} >
          <Avatar size="small" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png" />
        </Button>
        <Button type="link" onClick={() => changeLanguage('en')}>
          <Avatar size="small" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/475px-Flag_of_the_United_States.svg.png" />
        </Button>
        <Button type="link" onClick={() => changeLanguage('th')}>
          <Avatar size="small" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1280px-Flag_of_Thailand.svg.png" />
        </Button>
      </div>
    </div>
  );
};
