import {Alert, Avatar, Button, Col, Form, Row, Select, Tooltip} from 'antd'
import {FormComponentProps} from 'antd/lib/form'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal'
import React from 'react'
import {withFilterFriendsStore} from '../../../../libs/filter-friends/store'

const {Option} = Select

const seedingAccounts: {uid: string, cookie: string, name: string}[] = [
  {
    cookie: 'test cookie',
    uid: 'uid',
    name: 'name'
  }
]

export const FriendFilteringActions = Form.create()(withFilterFriendsStore<FormComponentProps>(props =>
{

  const submit = async () =>
  {
    props.form.validateFields((err, values) => !err && props.store.load(values.cookie, values.limit))
  }

  const delete_friends = async () => Modal.confirm({
    title: 'Do you want to delete multiple friends',
    content: `You are going to delete ${props.store?.delete_friends_list?.length} friends`,
    onOk: () =>
    {
      props.store.delete_friends(props.store?.delete_friends_list, 5)
    }
  })

  return (
    <Form style={{width: '100%'}}>
      {
        props.store.error && (
          <Alert
            showIcon
            message={props.store.error}
            type="error"
            style={{marginBottom: 10}}
          />
        )
      }
      <Row gutter={16} style={{marginBottom: 15}}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item>
            {props.form.getFieldDecorator('cookie', {
              rules: [{required: true, message: 'Account is invalid!'}],
            })(
              <Select style={{minWidth: 200}} size="large" placeholder="Select an account">
                {
                  seedingAccounts.map(account => (
                    <Option key={account.uid} value={account.cookie}>
                      <Avatar src={`https://graph.facebook.com/${account.uid}/picture?type=large`} />&nbsp; {account.name}
                    </Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={16}>
            <Col xs={16}>
              <Form.Item>
                {props.form.getFieldDecorator('limit', {
                  initialValue: 500
                })(
                  <Select>
                    {
                      [10, 20, 30, 50, 100, 200, 300, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(n => <Option key={n} value={n}>Scan {n} posts</Option>)
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item>
                <Tooltip title="Start scan all your friends and inbox, comment, reaction, ..." placement="bottom">
                  <Button
                    loading={props.store.loading_status == 'get_access_token'}
                    icon="search"
                    type="primary"
                    onClick={submit}
                    style={{width: "100%"}}
                  >Scan</Button>
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={18} style={{marginTop: 7}}>
              <Input onChange={e => props.store.search_name = e.target.value} allowClear placeholder="Search name" />
            </Col>
            <Col xs={24} sm={12} md={6} style={{textAlign: 'center', marginTop: 7}}>
              <Button style={{width: "100%"}} disabled={props.store?.delete_friends_list?.length == 0} type="danger" icon="close" onClick={() => delete_friends()}>Remove {props.store?.delete_friends_list?.length} friends
          </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form >
  )
}))