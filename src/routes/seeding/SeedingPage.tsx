import React from 'react';
import { Card, Icon, Avatar, List, Tag } from 'antd';
import { height } from '@material-ui/system';
import { Link } from 'react-router-dom';
import { GraphQLWrapper } from '../../containers/GraphQLWrapper';
import graphql from 'babel-plugin-relay/macro'; 
import { useTranslation } from 'react-i18next';
import { User } from '../../types';

type SeedingService = {
  name: string;
  icon: string;
  description: React.ReactNode | string;
  cover: string;
  link: string;
};

const query = graphql`
  query SeedingPageQuery {
    me {
      price_percent
      pricing {
        buff_viewers_livestream
        vip_viewers_livestream
        livestream {
          p480
          p720
          p1080
        }
      }
    }
  }
`;

export const SeedingPage = GraphQLWrapper<{ me: User }>(query, {}, props => {
  const { t, i18n } = useTranslation('seeding_page');

  const cards: SeedingService[] = [
    // {
    //   cover: 'https://cdn.mos.cms.futurecdn.net/daz7oJeNjzogqkdhSUKPiY.jpg',
    //   link: '/seeding/vip-viewers-livestream',
    //   description: (
    //     <span>
    //       {props.data && (
    //         <Tag color="#108ee9">
    //           {Math.ceil(
    //             props.data.me.pricing ? props.data.me.pricing.vip_viewers_livestream : NaN,
    //           ).toLocaleString()}
    //           <Icon
    //             type="dollar"
    //             style={{ fontSize: 16, verticalAlign: '-0.2em', paddingLeft: 3, color: 'white' }}
    //           />
    //         </Tag>
    //       )}
    //       {t('vip_livestream_description')}
    //     </span>
    //   ),
    //   icon: 'https://www.logolynx.com/images/logolynx/72/723a8b2156ff3429b6b93830df4a0475.png',
    //   name: t('vip_livestream_title'),
    // },
    {
      cover: 'https://techcrunch.com/wp-content/uploads/2015/08/facebook-live.png?w=730&crop=1',
      link: '/seeding/buff-viewers-livestream',
      description: (
        <span>
          {props.data && (
            <Tag color="#108ee9">
              {Math.ceil(
                props.data.me.pricing ? props.data.me.pricing.buff_viewers_livestream : NaN,
              ).toLocaleString()}
              <Icon
                type="dollar"
                style={{ fontSize: 16, verticalAlign: '-0.2em', paddingLeft: 3, color: 'white' }}
              />
            </Tag>
          )}
          {t('buff_livestream_description')}
        </span>
      ),
      icon:
        'https://cdn1.iconfinder.com/data/icons/antivirus-flat/512/signal_service_online_stream-512.png',
      name: t('buff_livestream_title'),
    },
    // {
    //   cover:
    //     'https://wordpress.mediatel.co.uk/wp-content/uploads/2019/05/bigstock-Social-Influencer-Concept-Med-227207743.jpg',
    //   link: '/seeding/buff-viewers',
    //   description: (
    //     <span>
    //       {props.data && (
    //         <Tag color="#108ee9">
    //           {Math.ceil(
    //             props.data.me.pricing ? props.data.me.pricing.buff_viewers_livestream : NaN,
    //           ).toLocaleString()}
    //           <Icon
    //             type="dollar"
    //             style={{ fontSize: 16, verticalAlign: '-0.2em', paddingLeft: 3, color: 'white' }}
    //           />
    //         </Tag>
    //       )}
    //       {t('buff_viewers_description')}
    //     </span>
    //   ),
    //   icon: 'https://cdn1.iconfinder.com/data/icons/marketing-32/512/Growth_icon-512.png',
    //   name: t('buff_viewers_title'),
    // },
  ];

  return (
    <Card title={t('seeding_page:title')}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
        dataSource={cards}
        renderItem={item => (
          <List.Item>
            <Link to={item.link}>
              <Card cover={<img src={item.cover} style={{ width: '100%', height: 170 }} />}>
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
  );
});
