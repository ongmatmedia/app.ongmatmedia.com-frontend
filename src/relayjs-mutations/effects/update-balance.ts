import { RelayEnvironment } from '../../configs/relayjs'
import { fetchQuery } from 'react-relay';
const graphql = require('babel-plugin-relay/macro');

const query = graphql`
        query updateBalanceQuery{
            me{
                balance,username
            }
        }
`

export const update_balance = () => fetchQuery(RelayEnvironment, query, {},{force: true})   