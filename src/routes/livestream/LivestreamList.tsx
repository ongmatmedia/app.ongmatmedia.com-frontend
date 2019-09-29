import * as graphql from 'babel-plugin-relay/macro'


const ListLivestreamQuery = graphql`
    query LivestreamListQuery{
        livestream_tasks{
            edges{
                node{
                    id,
                    videos{
                        thumbnail_url
                    }
                    name
                    note
                    active
                    created_time
                    updated_time
                    time  
                }
            }
        }
    }
`