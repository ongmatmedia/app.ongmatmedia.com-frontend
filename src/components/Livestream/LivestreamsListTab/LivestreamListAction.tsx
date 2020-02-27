import React, { useState } from 'react';
import { Button } from 'antd';
import { CreateEditLivestreamModal } from '../CreateEditLivestreamModal';

export const LivestreamListAction = () => {
  const [create_modal_visible, set_create_modal_visible] = useState<boolean>(false);

  return (
    <span>
      <CreateEditLivestreamModal
        visible={create_modal_visible}
        onClose={() => set_create_modal_visible(false)}
        mode="create"
      />
      <Button icon="plus" type="primary" onClick={() => set_create_modal_visible(true)}>
        Add livestream schedule
      </Button>
    </span>
  );
};
