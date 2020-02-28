import { DatePicker, Tag } from 'antd';
import React from 'react';

export interface IAddSchedule {
  tagsSchedule?: number[],
  onChange?: (listTimeSchedule: number[]) => any,
}

export const AddSchedule = (props: IAddSchedule) => {

  const handleCloseInputScheduleTime = (removedTag: number) => {
    props.onChange && props.onChange((props.tagsSchedule || []).filter(tag => tag !== removedTag))
  };

  return (
    <div>
      {(props.tagsSchedule || []) .map((tag, index) => (
        <Tag key={tag} closable={index !== 0} onClose={() => handleCloseInputScheduleTime(tag)}>
          {new Date(tag).toLocaleDateString()}
        </Tag>
      ))}
      <DatePicker allowClear showTime placeholder="Select Time" onOk={date => props.onChange && props.onChange([...(props.tagsSchedule || []), date.valueOf()])} />
    </div>
  )
}