import React, { useState, useEffect } from 'react';
import { AutoSelectInput } from './AutoSelectInput';
import { InputProps } from 'antd/lib/input';

type InputNumberAutoSelectProps = {
  onChangeValue: (newValue: number) => any;
  defaultValue: number;
};

export const InputNumberAutoSelect = (props: InputNumberAutoSelectProps) => {
  const [value, set_value] = useState<string>(props.defaultValue.toLocaleString(undefined));
  useEffect(() => set_value(props.defaultValue.toLocaleString(undefined)), [props.defaultValue]);

  const changeValue = (v: string) => {
    const match = v.replace(/\.|,/g, '').match(/^(?:\-|)[0-9]{0,20}$/);
    if (match) {
      if (v == '-') {
        set_value('-');
      } else {
        const n = Number(match[0]);
        set_value(n.toLocaleString(undefined));
        props.onChangeValue(n);
      }
      console.log(value);
    }
  };

  return <AutoSelectInput value={value} onChange={e => changeValue(e.target.value)} />;
};
