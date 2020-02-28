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
import { VipViewersLivestream, User } from '../../../types';
import { create_vip_viewers_livestream } from '../../../graphql/create_vip_viewers_livestream';
import { update_vip_viewers_livestream } from '../../../graphql/update_vip_viewers_livestream';
import { withForm } from '../../../libs/Form';
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper';
import { FormElement } from '../../../components/form/FormElement'


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

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export type CUModalProps = {
  mode: 'create' | 'update';
  vip?: VipViewersLivestream;
  onClose: Function;
};

export type CUModalGraphqlData = { me: User, vip: VipViewersLivestream };


const A = props => <span>{JSON.stringify(props)}</span>
const B = (props: PropsWithChildren<{ a: string, b: string }>) => {
  const { children, ...s } = props

  return (
    <span>
      {
        React.cloneElement(children as any, s)
      }

    </span>
  )
}



export const CUModal = GraphQLWrapper<CUModalGraphqlData, CUModalProps>(
  query,
  {},
  withForm(props => {
    const [editing_uid, set_editing_uid] = useState<boolean>(props.mode == 'create');
    const [error, set_error] = useState<string | null>(null);
    const [loading, set_loading] = useState<boolean>(false);

    const { t, i18n } = useTranslation('cu_modal');

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
        set_editing_uid(true);
        props.onClose();
      } catch (e) {
        set_error(e.message);
        set_loading(false);
      }
    });

    const { FormField } = props.form



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

          <FormField<string>
            name="id"
            initalValue={props.vip && props.vip.id}
            require="Require"
            render={p => (
              <FormElement
                icon="user"
                label={t('form.facebook_object_input.title')}
                require
                error={p.error}
              >
                <FacebookAccountInput />
              </FormElement>
            )
            }
          />

          {
            props.form.field({
              name: "ba",
              render: p => (
                <FormElement
                  icon="eye"
                  label="Amount"
                  require
                >
                  <Select onChange={p.setValue} style={{ width: '100%' }} size="large" value={p.value} >
                    {new Array(50).fill(0).map((v, index) => (index + 1) * 100).map(amount => (
                      <Select.Option value={amount}>
                        {amount} {props.vip && props.vip.amount == amount && ' ** (not change)'}
                      </Select.Option>
                    ))}
                  </Select>
                </FormElement>
              )
            })
          }

          <FormField<number>
            name="v"
            initalValue={props.vip ? props.vip.amount : 100}
            require="Require"
            render={p => <FormElement
              icon="eye"
              label="Amount"
              require
            >
              <Select onChange={p.setValue} style={{ width: '100%' }} size="large" value={p.value} >
                {new Array(50).fill(0).map((v, index) => (index + 1) * 100).map(amount => (
                  <Select.Option value={amount}>
                    {amount} {props.vip && props.vip.amount == amount && ' ** (not change)'}
                  </Select.Option>
                ))}
              </Select>
            </FormElement>}
          />


        </Spin>
      </Modal>
    );
  }),
);
