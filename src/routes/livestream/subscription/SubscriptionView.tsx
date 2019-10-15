import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { UpdateSubscription } from './UpdateSubscription'
import { SubscriptionInfo } from './SubscriptionInfo'
import { LivestreamSubscription } from '../../../schema/Services/Livestream/LivestreamSubscription'
import { GraphQLWrapper } from '../../../containers/GraphQLWrapper'
import { UserInfo } from '../../../containers/UserInfo'
import { Spin } from 'antd'
import { ServicePricing } from '../../../schema/User/ServicePricing'

const query = graphql`
    query SubscriptionViewQuery{
        livestream_subscription{
                user_id,
                quality
                concurrent_limit
                end_time
                playing
        }

        pricing{
            buff_viewers_livestream
            vip_viewers_livestream
            livestream{
            p480
            p720
            p1080
            }
        }

}
`


export const SubscriptionView = () => GraphQLWrapper<{
    livestream_subscription: LivestreamSubscription,
    pricing: ServicePricing
}>(query, {}, (loading, data) => (
    <span>
        <SubscriptionInfo loading={loading} sub={data && data.livestream_subscription} />
        <UserInfo render={(loading, user) => loading ? <Spin /> : data && data.pricing && data.livestream_subscription && user && <UpdateSubscription sub={data.livestream_subscription} user={user} pricing={data.pricing} />} />
    </span>
))
