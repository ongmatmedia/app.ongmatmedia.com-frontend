import React, { CSSProperties } from 'react';
import { Modal, Row, Avatar, Col, Card, message, Icon, Button } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import { PaymentMethod } from '../../types';

interface IPaymentInfoModal {
  data: PaymentMethod | null
  isVisible: boolean,
  onClose: Function,
}

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'left',
};

export const PaymentInfoModal = (props: IPaymentInfoModal) => {
  return (
    <Modal
      visible={props.isVisible}
      destroyOnClose
      closable={false}
      onCancel={() => props.onClose()}
      title={props.data ? `${props.data.name}` : 'Detail information'}
      okType='ghost'
    >
      <Row type="flex" align="middle">
        {props.data ? (
          <Card
            bordered={false}
            cover={<img alt="example" src={props.data.image_url} />}
          >
            <Card.Grid style={gridStyle}>
              <Row>
                {props.data.owner}
              </Row>
              <Row>
                <CopyToClipboard
                  text={props.data.account}
                  onCopy={() => message.info('Copied')}
                >
                  <span style={{ cursor: 'pointer' }}>
                    <span>{props.data.account} &nbsp;</span>
                    <Icon type="copy" />
                  </span>
                </CopyToClipboard>
              </Row>
            </Card.Grid>
            <Card.Grid style={gridStyle}>{props.data.description}</Card.Grid>
            <Card.Grid style={{ width: '100%', textAlign: 'center' }}>
              <Row style={{ marginBottom: 20 }}>
                <Button type="primary">
                  <a href="http://fb.com" target="_blank">Go to</a>
                </Button>
              </Row>
              <Row>
                <QRCode value="http://facebook.github.io/react/" />
              </Row>
            </Card.Grid>
          </Card>
        ) : ''}
      </Row>
    </Modal>
  )
}