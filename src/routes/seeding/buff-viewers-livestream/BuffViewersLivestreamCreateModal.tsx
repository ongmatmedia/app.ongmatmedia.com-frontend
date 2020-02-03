import {
  Alert,
  Avatar,
  Card,
  Col,
  Form as AntdForm,
  Icon,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Spin,
  Tag,
} from 'antd';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { withForm } from '../../../containers/Form';
import { GraphQLWrapper } from '../../../containers/GraphQLWrapper';
import { create_buff_viewers_livestream } from '../../../relayjs-mutations/create_buff_viewers_livestream';
import { User } from '../../../schema/User/User';
import { VideoInput } from './VideoInput';
import { useTranslation } from 'react-i18next';
import { Dollar } from '../../../components/Dollar'

const query = graphql`
  query BuffViewersLivestreamCreateModalQuery {
    me {
      id
      balance
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

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export type BuffViewersLivestreamCreateModalProps = {
  onClose: Function;
};

export type BuffViewersLivestreamCreateModalGraphqlData = { me: User };

export const BuffViewersLivestreamCreateModal = GraphQLWrapper<
  BuffViewersLivestreamCreateModalGraphqlData,
  BuffViewersLivestreamCreateModalProps
>(
  query,
  {},
  withForm(props => {
    const [error, set_error] = useState<string | null>(null);
    const [loading, set_loading] = useState<boolean>(false);
    const [editing_uid_visible, set_editing_uid_visible] = useState<boolean>(true);

    const { t } = useTranslation('buff_viewers_livestream_create_modal');

    const submit = () =>
      props.form.submit(async data => {
        set_error(null);
        set_loading(true);
        try {
          await create_buff_viewers_livestream(data);
          notification.success({ message: 'Create success' });
          props.onClose();
        } catch (e) {
          set_error(e.message);
        }
        set_loading(false);
      });

    let OrderInfoCard: any = null;

    if (
      !props.loading &&
      props.data &&
      props.data.me &&
      props.data.me.pricing &&
      props.form.data.amount
    ) {
      const price = props.data.me.pricing.buff_viewers_livestream;
      const mins = props.form.data.limit_mins
      const total = props.form.data.amount * mins * price;

      OrderInfoCard = (
        <Card title="Order infomation" size="small" style={{ lineHeight: '2em' }}>
          <Row>
            <Tag color="#108ee9">{props.form.data.amount} viewers</Tag>
            x <Tag color="#108ee9">   {price.toLocaleString()}<Dollar /></Tag>
            x <Tag color="#108ee9">{mins} <Dollar /></Tag>
            = <Tag color="#108ee9">   {total.toLocaleString()}<Dollar />  </Tag>
          </Row>

          <Row>
            Your balance:{' '}
            <Tag color="#108ee9">   {props.data.me.balance.toLocaleString()} <Dollar /> </Tag>
          </Row>
        </Card>
      );
    }

    return (
      <Modal
        visible={true}
        onOk={() => submit()}
        onCancel={() => props.onClose()}
        destroyOnClose
        closable={false}
        okButtonProps={{ loading }}
        title={t('title')}
      >
        <Spin spinning={props.loading}>
          <AntdForm>
            {error && <Alert type="error" message={error} />}
            {props.form.field({
              name: 'id',
              require: t('form.facebook_video_input.validatingErrorMessage'),
              render: ({ error, loading, setValues, value, set_touched, touched }) => (
                <AntdForm.Item>
                  <Row type="flex" justify="space-between" align="middle">
                    <Col>
                      <h3>
                        <Icon type="user" /> {t('form.facebook_video_input.title')}
                        <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> {t('form.facebook_video_input.rule')} </Tag>
                      </h3>
                    </Col>
                  </Row>
                  {error && <Alert type="error" message={error} />}
                  {value && value != '' && (
                    <Row
                      type="flex"
                      justify="space-between"
                      align="middle"
                      className="livestream-target-item"
                      style={{ padding: 5, borderRadius: 5 }}
                    >
                      <Col span={4}>
                        <Avatar
                          src={`http://graph.facebook.com/${props.form.data.uid}/picture?type=large`}
                          size={60}
                        />
                      </Col>
                      <Col span={14}>
                        <div style={{ padding: 10, flexWrap: 'wrap' }}>
                          {' '}
                          {props.form.data.name}{' '}
                        </div>
                      </Col>
                      <Col span={6}>
                        <Icon
                          type="edit"
                          style={{
                            color: 'black',
                            marginRight: 10,
                            fontSize: 20,
                            cursor: 'pointer',
                          }}
                          onClick={() => set_editing_uid_visible(true)}
                        />
                        <Icon
                          type="video-camera"
                          style={{
                            color: 'black',
                            marginRight: 10,
                            fontSize: 20,
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(`https://fb.com/${props.form.data.id}`)}
                        />
                        <Icon
                          type="message"
                          style={{
                            color: 'black',
                            marginRight: 10,
                            fontSize: 20,
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(`https://m.me/${props.form.data.uid}`)}
                        />
                        <IconFont
                          type="icon-facebook"
                          style={{ color: 'black', fontSize: 20, cursor: 'pointer' }}
                          onClick={() => window.open(`https://fb.com/${props.form.data.uid}`)}
                        />
                      </Col>
                    </Row>
                  )}

                  {editing_uid_visible && (
                    <VideoInput
                      placeholder={t('form.facebook_video_input.placeholder')}
                      onSelect={({ name, image, type, id, uid }) => {
                        setValues({ id, name, uid });
                        set_editing_uid_visible(false);
                      }}
                      onError={() => {
                        set_editing_uid_visible(true);
                        Modal.error({ title: 'Invaild UID' });
                      }}
                    />
                  )}
                </AntdForm.Item>
              ),
            })}
            {props.form.field<number>({
              name: 'amount',
              require: t('form.viewer_amount_select.validatingErrorMessage'),
              render: ({ error, loading, setValue, value, set_touched, touched }) => (
                <AntdForm.Item>
                  <Row type="flex" justify="space-between" align="middle">
                    <Col>
                      <h3>
                        <Icon type="eye" /> {t('form.viewer_amount_select.title')}{' '}
                        <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> {t('form.viewer_amount_select.rule')} </Tag>
                      </h3>
                    </Col>
                  </Row>
                  {error && <Alert type="error" message={error} />}
                  <Select
                    onChange={setValue}
                    placeholder={t('form.viewer_amount_select.placeholder')}
                  >
                    {[
                      50,
                      100,
                      150,
                      200,
                      250,
                      300,
                      400,
                      450,
                      500,
                      600,
                      700,
                      800,
                      900,
                      1000,
                      1500,
                      2000,
                      2500,
                      3000,
                      3500,
                      4000,
                      4500,
                      5000,
                    ].map(amount => (
                      <Select.Option value={amount}>{amount}</Select.Option>
                    ))}
                  </Select>
                </AntdForm.Item>
              ),
            })}
            {props.form.field<number>({
              name: 'limit_mins',
              require: t('form.limit_mins_viewers.validatingErrorMessage'),
              render: ({ error, loading, setValue, value, set_touched, touched }) => (
                <AntdForm.Item>
                  <Row type="flex" justify="space-between" align="middle">
                    <Col>
                      <h3>
                        <Icon type="rise" /> {t('form.limit_mins_viewers.title')}{' '}
                        <Tag style={{ background: '#fff', borderStyle: 'dashed' }}>
                          {' '}
                          {t('form.limit_mins_viewers.rule')}{' '}
                        </Tag>
                      </h3>
                    </Col>
                  </Row>
                  {error && <Alert type="error" message={error} />}
                  <Select
                    onChange={setValue}
                    placeholder={t('form.limit_mins_viewers.placeholder')}
                  >
                    {[10, 20, 30, 60, 90, 120, 150, 180].map(min => (
                      <Select.Option value={min}>{min}</Select.Option>
                    ))}
                  </Select>
                </AntdForm.Item>
              ),
            })}
            {props.form.field<string>({
              name: 'note',
              require: t('form.note_input.validatingErrorMessage'),
              render: ({ error, loading, setValue, value, set_touched, touched }) => {
                return (
                  <AntdForm.Item>
                    <Row type="flex" justify="space-between" align="bottom">
                      <Col>
                        <h3>
                          <Icon type="form" /> {t('form.note_input.title')}{' '}
                          <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> {t('form.note_input.rule')} </Tag>
                        </h3>
                      </Col>
                      <Col></Col>
                    </Row>
                    {error && <Alert type="error" message={error} />}
                    <Input
                      placeholder={t('form.note_input.placeholder')}
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      allowClear
                    />
                  </AntdForm.Item>
                );
              },
            })}
          </AntdForm>
          {OrderInfoCard}
        </Spin>
      </Modal>
    );
  }),
);
