import React from 'react'
import { Card, List, Row, Avatar } from 'antd'
import { BreadCrumb } from './BreadCrumb'
import { Link } from 'react-router-dom'

interface ListAppBlockProps {
  children: Array<{
    icon: string,
    serviceName: string
    link: string,
  }>
}

export const ListAppBlock = (props: ListAppBlockProps) => {
  return (
    <Card style={{ height: 'calc(100vh - 65px)' }} title={(
      <BreadCrumb />
    )}>
      <List
        grid={{
          gutter: 24,
          xs: 2,
          sm: 3,
          md: 6
        }}
        dataSource={props.children}
        renderItem={item => (
          <List.Item>
            <Link to={item.link}>
              <Card style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: 10, boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)' }}>
                <Row style={{ marginBottom: 15 }}>
                  <Avatar src={item.icon} size={40} />
                </Row>
                <Row>
                  {item.serviceName}
                </Row>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </Card>
  )
}