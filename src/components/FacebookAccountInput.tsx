import React, { useState, useEffect } from 'react';
import { Input, Icon, Avatar, Tag, Alert, Row } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { GraphQLQueryFetcher, LazyGrahQLQueryRenderer } from '../graphql/GraphQLWrapper';
import { FacebookAccount } from '../types';


const query = graphql`
  query FacebookAccountInputQuery($url: String!){
    facebook_account_info(url: $url){
        name
        id
      }
  }
`


export type FacebookAccountInputProps = {
  id?: string
  name?: string
  onChange?: (account: FacebookAccount) => any
}



export const FacebookAccountInput = (props: FacebookAccountInputProps) => {
  const [url, set_url] = useState<string>(props.name || '')
  const [account, set_account] = useState<FacebookAccount | null>(null)
  const [loading, set_loading] = useState<boolean>(false)
  const [editable, set_editable] = useState<boolean>(true)
  const [error, set_error] = useState<string | null>(null)

  const search = async () => {
    set_loading(true)
    try {
      const { facebook_account_info } = await GraphQLQueryFetcher<{ facebook_account_info: FacebookAccount }>(query, { url })
      set_account(facebook_account_info)
      props.onChange && props.onChange(facebook_account_info)
      set_url(facebook_account_info.name)
      set_editable(false)
    } catch (error) {
      console.log(error)
      set_error(error)
    }
    set_loading(false)
  }

  return (
    <Row type="flex" justify="start">
      <Input
        addonBefore={account && <Avatar src="https://yt3.ggpht.com/a/AGF-l7__KbEHwBoTYcJtFE58xFrpoURHPvXZ8MON2w=s48-c-k-c0xffffffff-no-rj-mo" />}
        addonAfter={<Icon
          type={loading ? 'loading' : (editable ? 'search' : 'edit')}
          style={{ cursor: 'pointer' }}
          onClick={() => !loading && (editable ? search() : set_editable(true))}
        />
        }
        size="large"
        value={url}
        allowClear={editable}
        onChange={e => set_url(e.target.value)}
        disabled={!editable}
      />
      {
        error && <Alert type="error" style={{ marginTop: 5 }} message={error} />
      }
    </Row>
  )
}