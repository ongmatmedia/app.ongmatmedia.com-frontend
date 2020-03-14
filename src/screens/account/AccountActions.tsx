import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';
import { AddAccountModal } from './AddAccountModal';

export const AccountActions = (props: {
  removeable: boolean
  onChangeSelectedAccounts: Function
  isSelectingAllAccounts: boolean
}) => {
  const [modal_visible, set_modal_visible] = useState<boolean>(false);

  return (
    <div style={{ marginBottom: 20 }}>
      <AddAccountModal onClose={() => set_modal_visible(false)} visible={modal_visible} />
      <Button type="primary" icon="plus" onClick={() => set_modal_visible(true)} style={{ marginRight: 15 }}>
        Add account
      </Button>
      <Button type="danger" icon="delete" disabled={!props.removeable}>
        Remove accounts
      </Button>
      <Checkbox defaultChecked={false} checked={props.isSelectingAllAccounts} onChange={e => props.onChangeSelectedAccounts()} style={{ float: "right", verticalAlign: "middle" }}>{props.isSelectingAllAccounts ? 'Deselect all accounts' : 'Select all accounts'}</Checkbox>
    </div>
  );
};
