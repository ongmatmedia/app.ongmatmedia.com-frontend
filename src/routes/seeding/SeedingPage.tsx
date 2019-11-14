import React from 'react'
import { Card, Icon, Avatar, List } from 'antd'
import { height } from '@material-ui/system'
import { Link } from 'react-router-dom'

type SeedingService = {
    name: string
    icon: string
    description: string
    cover: string
    link: string
}

const cards: SeedingService[] = [
    {
        cover: 'https://cdn.mos.cms.futurecdn.net/daz7oJeNjzogqkdhSUKPiY.jpg',
        link: '/seeding/vip-viewers-livestream',
        description: 'AUTO increase livestream viewers when livestream',
        icon: 'https://www.logolynx.com/images/logolynx/72/723a8b2156ff3429b6b93830df4a0475.png',
        name: 'VIP livestream'
    },
    {
        cover: 'https://techcrunch.com/wp-content/uploads/2015/08/facebook-live.png?w=730&crop=1',
        link: '/seeding/buff-viewers-livestream',
        description: 'Increase viewers for active livestreaming video',
        icon: 'https://cdn1.iconfinder.com/data/icons/antivirus-flat/512/signal_service_online_stream-512.png',
        name: 'BUFF livestream'
    }
]

export const SeedingPage = () => (
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
                        <Card cover={<img src={item.cover} style={{ width: '100%', height: 170 }} />}  >
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