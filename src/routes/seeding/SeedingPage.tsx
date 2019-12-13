import React from 'react'
import { Card, Icon, Avatar, List, Tag } from 'antd'
import { height } from '@material-ui/system'
import { Link } from 'react-router-dom'
import { GraphQLWrapper } from '../../containers/GraphQLWrapper'
import graphql from 'babel-plugin-relay/macro';
import { ServicePricing } from '../../schema/User/ServicePricing'
import { User } from '../../schema/User/User'

type SeedingService = {
    name: string
    icon: string
    description: React.ReactNode | string
    cover: string
    link: string
}

const query = graphql`
    query SeedingPageQuery{
        pricing{
            buff_viewers_livestream
            vip_viewers_livestream
            livestream{
              p480
              p720
              p1080
            }
        }
        me{
            price_percent
        }
    }
`



export const SeedingPage = GraphQLWrapper<{ pricing: ServicePricing, me: User }>(query, {}, props => {

    const cards: SeedingService[] = [
        {
            cover: 'https://cdn.mos.cms.futurecdn.net/daz7oJeNjzogqkdhSUKPiY.jpg',
            link: '/seeding/vip-viewers-livestream',
            description: (
                <span>
                    {
                        props.data && <Tag color="#108ee9">{
                            Math.ceil(
                                props.data.pricing.vip_viewers_livestream * props.data.me.price_percent * 0.01
                            ).toLocaleString()
                        }<Icon type="dollar" style={{ fontSize: 16, verticalAlign: "-0.2em", paddingLeft: 3, color: "#ffc55c" }} />
                        </Tag>
                    }
                    AUTO increase livestream viewers when livestream
                </span>
            ),
            icon: 'https://www.logolynx.com/images/logolynx/72/723a8b2156ff3429b6b93830df4a0475.png',
            name: 'VIP livestream'
        },
        {
            cover: 'https://techcrunch.com/wp-content/uploads/2015/08/facebook-live.png?w=730&crop=1',
            link: '/seeding/buff-viewers-livestream',
            description: (
                <span>
                    {
                        props.data && <Tag color="#108ee9">{
                            Math.ceil(props.data.pricing.buff_viewers_livestream * props.data.me.price_percent * 0.01).toLocaleString()
                        }<Icon type="dollar" style={{ fontSize: 16, verticalAlign: "-0.2em", paddingLeft: 3, color: "#ffc55c" }} />
                        </Tag>
                    }
                    Increase viewers for active livestreaming video
                    </span>
            ),
            icon: 'https://cdn1.iconfinder.com/data/icons/antivirus-flat/512/signal_service_online_stream-512.png',
            name: 'BUFF livestream'
        }
    ]


    return (
        <Card title="Seeding services">
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 6
                }}
                dataSource={cards}
                renderItem={item => (
                    <List.Item>
                        <Link to={item.link}>
                            <Card
                                cover={<img src={item.cover} style={{ width: '100%', height: 170 }} />}  >
                                <Card.Meta
                                    avatar={<Avatar src={item.icon} />}
                                    title={item.name}
                                    description={item.description}
                                />
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        </Card>
    )
})