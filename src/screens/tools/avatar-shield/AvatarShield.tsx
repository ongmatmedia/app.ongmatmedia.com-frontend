import {Alert, Avatar, Button, Col, Modal, Row, Skeleton} from 'antd'
import Card from 'antd/lib/card'
import Meta from 'antd/lib/card/Meta'
import graphql from 'babel-plugin-relay/macro'
import React, {useState} from 'react'
import {BreadCrumb} from '../../../components/common/BreadCrumb'
import {GraphQLWrapper} from '../../../graphql/GraphQLWrapper'
import {Extension} from '../../../libs/filter-friends/Extension'
import {AvatarShieldAction} from './components/AvatarShieldActions'

const query = graphql`
	query AvatarShieldQuery {
		facebook_accounts {
			edges {
				node {
					id
					name
					cookie
				}
			}
		}
	}
`


export const AvatarShield = GraphQLWrapper<{
  facebook_accounts: {
    edges: {node: {id: string; name: string; cookie: string}}[]
  }
}>(
  query,
  {},
  ({data, loading, error}) => {

    if (error)
      return (
        <Card style={{minHeight: '100%'}}>
          <Row type="flex" justify="space-around">
            <Col>
              <Alert showIcon message={error} type="error" />
            </Col>
          </Row>
        </Card>
      )

    if (loading && !error)
      return (
        <Card style={{minHeight: '100%'}}>
          <Skeleton active loading />
        </Card>
      )

    if (!Extension.installed)
      Modal.confirm({
        title:
          'Vui lòng cài extension để dùng chức năng này. Nếu gặp khó khăn gì vui lòng liên hệ admin để được hỗ trợ.',
        okText: 'Download extension',
        cancelText: 'Back',
        onOk: () =>
          window.open(
            'https://facebook-marketing-tools-assets.s3-ap-southeast-1.amazonaws.com/ext.zip',
            '_blank',
          ),
        onCancel: () => window.history.back(),
      })

    const accounts = data.facebook_accounts?.edges?.map(edge => edge.node)

    const [selectedAccount, setSelectedAccount] = useState<{id: string, username: string, cookie: string, coverUrl: string} | null>(null)

    const [loadingAccountInformation, setLoadingAccountInformation] = useState<boolean>(false)

    return (
      <Card title={<BreadCrumb />} style={{minHeight: '100%'}}>
        <AvatarShieldAction
          accounts={accounts}
          onSelectAccount={setSelectedAccount}
          onLoading={setLoadingAccountInformation}
        />
        <Row style={{marginTop: 15}}>
          <Col xs={24} sm={{offset: 8, span: 8}}>
            {
              selectedAccount ? (
                <Card
                  cover={
                    <img
                      style={{borderRadius: 15}}
                      alt="example"
                      src={selectedAccount.coverUrl}
                    />
                  }
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    boxShadow:
                      '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Meta
                    avatar={<Avatar size={64} src={`http://graph.facebook.com/${selectedAccount.id}/picture?type=large`} />}
                    title={selectedAccount.username}
                    description={<a href={`https://facebook.com/${selectedAccount.id}`}>{selectedAccount.id}</a>}
                  />
                  <Button type="primary" style={{width: "100%", marginTop: 15}}>Turn on avatar shield</Button>
                  <Button type="danger" style={{width: "100%", marginTop: 10}}>Turn off avatar shield</Button>
                </Card>
              ) : loadingAccountInformation ? (
                <Skeleton active loading paragraph={{rows: 5}} />
              ) : null
            }
          </Col>
        </Row>
      </Card>
    )
  }
)