import React, { useState } from 'react';
import { Modal, Form, Spin, Col, Row, Tag, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { send_money } from '../../relayjs-mutations/send_money';
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect';
import { User } from '../../types';
export type SendMoneyModalProps = FormComponentProps & {
  visible: boolean;
  user: User;
  me: User;
  onClose: Function;
};

export const SendMoneyModal = Form.create<SendMoneyModalProps>()((props: SendMoneyModalProps) => {
  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string | null>(null);
  const [send_amount, set_send_amount] = useState<number>(0);
  const [receive_amount, set_receive_amount] = useState<number>(0);
  const [note, set_note] = useState<string | null>(null);

  const submit = async () => {
    if (note && note.length == 0) return;
    set_loading(true);
    try {
      await send_money(note || '', send_amount, props.user.id, props.user.balance + receive_amount);
      set_error(null);
      set_loading(false);
      props.onClose();
    } catch (e) {
      set_error(e.message);
      set_loading(false);
    }
  };

  const update_amount = (amount: number, is_send_amount: boolean) => {
    if (is_send_amount) {
      set_send_amount(amount);
      const receive_amount = Math.floor((amount * props.user.price_percent) / 100);
      set_receive_amount(receive_amount);
    } else {
      const send_amount = Math.ceil((amount * 100) / props.user.price_percent);
      set_receive_amount(amount);
      set_send_amount(send_amount);
    }
  };

  return (
    <Modal
      title="Send money"
      visible={props.visible}
      onOk={submit}
      onCancel={() => props.onClose()}
      okButtonProps={{
        disabled: note == null || note.length == 0 || send_amount > props.me.balance,
        loading,
      }}
    >
      {error && <Tag color="red">{error}</Tag>}
      <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
        <Col span={12}>Your user pricing percent</Col>
        <Col>
          <Tag color="#108ee9">{props.user.price_percent.toFixed(2)} %</Tag>
        </Col>
      </Row>
      <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
        <Col span={12}>Send Amount</Col>
        <Col>
          <InputNumberAutoSelect
            defaultValue={send_amount}
            onChangeValue={n => update_amount(n, true)}
          />
        </Col>
      </Row>
      <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
        <Col span={12}>Your balance</Col>
        <Col>
          <Tag color="#108ee9">
            {(props.me.balance || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} $
          </Tag>
        </Col>
      </Row>
      <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
        <Col span={12}>Receive Amount</Col>
        <Col>
          <InputNumberAutoSelect
            defaultValue={receive_amount}
            onChangeValue={n => update_amount(n, false)}
          />
        </Col>
      </Row>
      <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
        <Col span={12}>Note</Col>
        <Col>
          <Input defaultValue={note || ''} onChange={e => set_note(e.target.value)} />
          {note && note.length == 0 && <Tag color="red">Require note</Tag>}
        </Col>
      </Row>
    </Modal>
  );
});
