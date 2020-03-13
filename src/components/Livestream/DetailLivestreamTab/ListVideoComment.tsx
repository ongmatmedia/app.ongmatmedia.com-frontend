import React from 'react'
import { Tooltip, Icon, Comment, Avatar, List, Form, Button, Divider } from 'antd'
import TextArea from 'antd/lib/input/TextArea';

const actions = [
  <span key="comment-basic-like">
    <Tooltip title="Like">
      <Icon
        type="like"
      />
    </Tooltip>
    <span style={{ paddingLeft: 8, cursor: 'auto' }}>10</span>
  </span>,
  <span key=' key="comment-basic-dislike"'>
    <Tooltip title="Dislike">
      <Icon
        type="dislike"
      />
    </Tooltip>
    <span style={{ paddingLeft: 8, cursor: 'auto' }}>10</span>
  </span>,
  <span key="comment-basic-reply-to">Reply to</span>,
]

export const ListVideoComment = (props: {
  data: Array<{
    author: string,
    content: JSX.Element,
    avatar: string,
    datetime: JSX.Element
  }>
}) => (
    <>
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
          <li>
            <Comment
              actions={actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </>
  )
