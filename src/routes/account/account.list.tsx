import React from 'react'
import { List, Card, Row, Col, Icon, Avatar, Popover, Popconfirm } from 'antd'

const data = [
  {
    uid: '100002482238412',
    name: 'Duong Van Ba'
  },
  {
    uid: '100002482238412',
    name: 'Duong Van Ba'
  },
  {
    uid: '100002482238412',
    name: 'Duong Van Ba'
  },
  {
    uid: '100002482238412',
    name: 'Duong Van Ba'
  },
  {
    uid: '100002482238412',
    name: 'Duong Van Ba'
  },
  {
    uid: '100002482238412',
    name: 'Duong Van Ba'
  },
]

export const AccountList = () => {


  return (
    <List
      grid={{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 6,
        xxl: 8,
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item>


          <Popconfirm placement="bottom" title="Do you want to delete this account" trigger="click">
            <Card bodyStyle={{ padding: 10, paddingBottom: 0, cursor: 'pointer' }}>
              {/* 
            <Row  >
              <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Icon type="close-circle" style={{ cursor: 'pointer', color: 'red  ' }} />
              </Col>
            </Row> */}

              <Row type="flex" justify="start" align="middle" style={{ paddingBottom: 10 }} >
                <Col >
                  <Avatar src={`http://graph.facebook.com/${item.uid}/picture?type=large`} size={60} />
                </Col>
                <Col style={{ marginLeft: 10 }}>
                  {
                    item.name
                  }
                </Col>
              </Row>

            </Card>
          </Popconfirm>


        </List.Item>
      )}
    />
  )
}