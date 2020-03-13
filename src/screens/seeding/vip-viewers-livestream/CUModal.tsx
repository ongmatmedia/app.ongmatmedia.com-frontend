import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Form as AntdForm,
  Icon,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
  Spin,
  Switch,
  Tag,
} from 'antd';
import { graphql } from 'babel-plugin-relay/macro';
import React, { Fragment, useState, PropsWithChildren } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import {
  FacebookAccountInput,
} from '../../../components/FacebookAccountInput';
import { VipViewersLivestream, User, FacebookAccount } from '../../../types';
import { create_vip_viewers_livestream } from '../../../graphql/create_vip_viewers_livestream';
import { update_vip_viewers_livestream } from '../../../graphql/update_vip_viewers_livestream';
import { withForm, FormFieldParams } from '../../../libs/Form';
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper';
import { FormElement } from '../../../components/form/FormElement'
import { OrderInfo } from '../../../components/OrderInfo'
import { RefundOrderInfo } from '../../../components/RefundOrderInfo'
import { delete_vip_viewers_livestream } from '../../../graphql/delete_vip_viewers_livestream';


const query = graphql`
  query CUModalQuery {
    me {
      id
      balance
      price_percent
      pricing {
        vip_viewers_livestream
      }
    }
  }
`;


export type CUModalProps = {
  mode: 'create' | 'update';
  vip?: VipViewersLivestream;
  onClose: Function;
};

export type CUModalGraphqlData = { me: User, vip: VipViewersLivestream };




export const CUModal = GraphQLWrapper<CUModalGraphqlData, CUModalProps>(
  query,
  {},
  withForm(props => {
    const [error, set_error] = useState<string | null>(null);
    const [loading, set_loading] = useState<boolean>(false);

    const { t } = useTranslation('cu_modal');

    const { form } = props

    const submit = () => form.submit(async data => {
      set_error(null);
      try {
        set_loading(true);
        if (props.mode == 'create') {
          await create_vip_viewers_livestream({ ...data, active: true });
          notification.success({ message: 'Create success' });
        } else {
          await update_vip_viewers_livestream(data);
          notification.success({ message: 'Update success' });
        }
        set_error(null);
        set_loading(false);
        props.onClose();
      } catch (e) {
        set_error(e.message);
        set_loading(false);
      }
    });

    const onCancel = () => props.vip && props.data && Modal.confirm({
      title: "Cancel order?",
      content: <RefundOrderInfo
        title="Order infomation"
        statics={[
          { name: "Name", amount: props.vip.name },
          { name: "Amount viewers", amount: props.vip.amount },
          { name: "Bought mins", amount: props.vip.bought_mins },
          { name: "Price", amount: props.data.me.pricing?.vip_viewers_livestream || 0 },
          { name: "Refund", color: 'red', amount: props.vip.amount * props.vip.bought_mins * (props.data.me.pricing?.vip_viewers_livestream || 0) }
        ]}
      />,
      onOk: async () => {
        set_loading(true)
        props.vip && await delete_vip_viewers_livestream(props.vip.id)
        set_loading(false)
        props.onClose()
      }
    })


    const amounts_list = new Array(50).fill(0).map((_, index) => (index + 1) * 100)
    const mins_list = new Array(100).fill(0).map((_, index) => (index + 1) * 30)


    return (
      <Modal
        visible={true}
        onOk={() => submit()}
        onCancel={() => props.onClose()}
        destroyOnClose
        closable={false}
        okButtonProps={{ loading }}
        title={props.mode == 'create' ? t('title.creating') : t('title.editing')}

      >
        <Spin spinning={props.loading}>

          {
            error && <Alert type="error" message={error} />
          }

          {props.form.field<string>({
            name: 'id',
            require: 'Require',
            initalValue: props.vip?.id,
            render: _ => (
              <FormElement icon="user" label={t('form.facebook_object_input.title')} require error={_.error}   >
                <FacebookAccountInput
                  account={_.value ? { id: _.value, name: props.vip?.name || '' } : undefined}
                  onChange={_.setValues}
                />
              </FormElement>)
          })}

          {
            props.form.field({
              name: "amount",
              initalValue: props.vip?.amount || 100,
              render: _ => (
                <FormElement icon="eye" label="Amount" require error={_.error}   >
                  <Select value={_.value} style={{ width: '100%' }} onChange={_.setValue}>
                    {
                      amounts_list.map(amount => <Select.Option value={amount}>{amount}</Select.Option>)
                    }
                  </Select>
                </FormElement>
              )
            })
          }

          {
            props.form.field({
              name: "bought_mins",
              initalValue: props.vip?.bought_mins || 30,
              render: _ => (
                <FormElement icon="clock-circle" label="Bought mins" require error={_.error}   >
                  <Select value={_.value} style={{ width: '100%' }} onChange={_.setValue}>
                    {
                      mins_list.map(min => <Select.Option value={min}>{min}</Select.Option>)
                    }
                  </Select>
                </FormElement>
              )
            })
          }

          {
            props.form.field({
              name: "parallel",
              initalValue: props.vip?.parallel || 1,
              render: _ => (
                <FormElement icon="menu" label="Parallel" require error={_.error}   >
                  <Select value={_.value} style={{ width: '100%' }} onChange={_.setValue}>
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(min => <Select.Option value={min}>{min}</Select.Option>)
                    }
                  </Select>
                </FormElement>
              )
            })
          }

          {
            props.form.field<number>({
              name: "auto_disable_after",
              initalValue: props.vip?.auto_disable_after || -1,
              render: _ => (
                <FormElement icon="pause-circle" label="Auto disable after" require error={_.error}   >
                  <Select value={_.value} style={{ width: '100%' }} onChange={_.setValue}>
                    <Select.Option value={-1}>Unlimited</Select.Option>
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(min => <Select.Option value={min}>{min}</Select.Option>)
                    }
                  </Select>
                </FormElement>
              )
            })
          }

          {
            props.form.field<string>({
              name: "note",
              require: 'Require',
              initalValue: props.vip?.note,
              render: _ => (
                <FormElement icon="edit" label="Note" require error={_.error} noMargin  >
                  <Input.TextArea onChange={e => _.setValue(e.target.value)} value={_.value} rows={4} />
                </FormElement>
              )
            })
          }

          {
            props.data && (
              <OrderInfo
                order={[
                  { amount: props.form.data.amount, unit: 'viewers' },
                  { amount: props.form.data.bought_mins, unit: 'mins' },
                  { amount: props.data.me.pricing?.vip_viewers_livestream, unit: 'credit/viewer' },
                ]}
                old={props.vip ? [
                  { amount: props.vip.amount, unit: 'viewers' },
                  { amount: props.vip.bought_mins || 0, unit: 'mins' },
                  { amount: props.data.me.pricing?.vip_viewers_livestream || 0, unit: 'credit/viewer' }
                ] : []
                }
                balance={props.data.me.balance}
              />
            )

          }

          {
            props.vip && (
              <Row type="flex" justify="end"><Col>
                <Button
                  icon="delete"
                  type="danger"
                  onClick={onCancel}
                >Delete then refund</Button>
              </Col></Row>
            )
          }


        </Spin>
      </Modal>
    );
  }),
);
