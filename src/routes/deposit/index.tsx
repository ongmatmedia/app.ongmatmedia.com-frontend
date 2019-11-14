import React from 'react'
import { Card, List, Avatar, Icon, Tooltip, Row, Col } from 'antd'

type DepositMethod = {
    name: string
    account: string
    cover: string
    icon: string
}

const methods: DepositMethod[] = [
    {
        account: '0301.0003.814.58',
        name: 'Vietcombank',
        cover: 'http://gg.gg/frngs',
        icon: 'https://lh3.googleusercontent.com/hRq2DVKkzBXQkyftxr0e2ytl0fS2hEWx3UTe3V652RfJVYWqVRGgBNhmZgqNzJ8PKHE'
    },
    {
        account: '0172.0199.104',
        name: 'TPBank',
        cover: 'http://gg.gg/frng0',
        icon: 'https://lh3.googleusercontent.com/mSM5SOjZpz2zBfwPCbEiLrWMHD1ubpk2pnrstPmjJWGPjuVUlqtz7Gg5b4l6XxBUvuY'
    },
    {
        account: '0978.346.354',
        name: 'Momo',
        cover: 'http://gg.gg/frngb',
        icon: 'https://static.mservice.io/img/logo-momo.png'
    }
]

export const DepositPage = () => (
    <Card title="Deposit">
        <List
            grid={{
                gutter: 16,
                xs: 2,
                sm: 2,
                md: 4,
                lg: 6,
                xl: 6,
                xxl: 6
            }}
            dataSource={methods}
            renderItem={item => (
                <List.Item>
                    <Card
                        size="small"
                        cover={<img src={item.cover}  />}
                        actions={[
                            <Tooltip title="Copy account" placement="bottom"><Icon type="copy" /></Tooltip>
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar src={item.icon} />}
                            title={item.name}
                            description={
                                <Row>
                                    <Col>Dương Văn Ba</Col>
                                    <Col>Account: {item.account}</Col>
                                </Row>
                            }

                        />
                    </Card>
                </List.Item>
            )}
        />
    </Card>
)