import React from 'react'
import { Badge, Icon, Row, Col, Avatar, Comment, Form, Button, Typography, Divider } from 'antd'
import TextArea from 'antd/lib/input/TextArea';

const { Text, Paragraph } = Typography

const Editor = () => (
  <div>
    <Form.Item>
      <TextArea rows={4} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export const VideoFeedback = () => (
  <>
    <Row>
      <Text strong>Video's name: </Text>
      <Text>Fucking livestream</Text>
    </Row>
    <Row style={{ paddingTop: 10 }}>
      <Text strong>Datetime: </Text>
      <Text>2020/02/10</Text>
    </Row>
    <Row type="flex" style={{ textAlign: 'center', marginTop: 30 }} gutter={16} justify="space-between">
      <Col span={2}>
        <Badge count={5}>
          <Avatar src="https://pngimage.net/wp-content/uploads/2018/06/icon-view-png-9.png" />
        </Badge>
      </Col>
      <Col span={2}>
        <Badge count={5}>
          <Avatar src="https://www.freepngimg.com/download/facebook/65441-emoticon-like-button-haha-facebook-emoji.png" />
        </Badge>
      </Col>
      <Col span={2}>
        <Badge count={5}>
          <Avatar src="https://clipart.info/images/ccovers/1499793243facebook-wow-emoji-like-png.png" />
        </Badge>
      </Col>
      <Col span={2}>
        <Badge count={5}>
          <Avatar src="https://i.dlpng.com/static/png/4745704-emoji-facebook-emoticon-death-sadness-crying-emoji-png-download-crying-emoji-png-900_900_preview.png" />
        </Badge>
      </Col>
      <Col span={2}>
        <Badge count={5}>
          <Icon type="like" style={{ fontSize: 30, color: "#1890ff" }} theme="filled" />
        </Badge>
      </Col>
      <Col span={2}>
        <Badge count={5}>
          <Avatar src="https://www.pinclipart.com/picdir/middle/31-317389_facebook-clipart-emoji-love-emoticon-facebook-png-transparent.png" />
        </Badge>
      </Col>
      <Col span={2}>
        <Badge count={255}>
          <Icon type="message" style={{ fontSize: 30, color: "green" }} theme="filled" />
        </Badge>
      </Col>
      <Col span={2}>
        <Badge count={255}>
          <Avatar src="https://www.freepnglogos.com/uploads/share-png/android-blue-circle-network-share-sharing-social-icon-5.png" />
        </Badge>
      </Col>
    </Row>
    <Row>
      <Comment
        content={
          <Editor />
        }
      />
    </Row>
    <Row>
      <Text strong>Facebook: </Text>
      {
        new Array(10).fill(
          <Button style={{ marginRight: 5, marginBottom: 5 }}>
            <Avatar src="https://lh3.googleusercontent.com/proxy/OFd0E4rwA6Zze4NyOzwoeBWCSARW_gF7uTgJQ-FYNXisA7h2uQHkRfKZHGva2yRsxh7Val0cpKwIa5MTAh__bLmyunUX1ZAkPfslaMw0r1z4gy6TD3L0" size="small" style={{ marginRight: 10 }} />
            Hoi so vo
        </Button>
        )
      }
    </Row>
    <Row style={{ paddingTop: 10 }}>
      <Text strong>RTMP: </Text>
      <Text>8</Text>
    </Row>
  </>
)