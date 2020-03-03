import { DatePicker, Tag } from 'antd';
import React, { useState } from 'react';

export interface IAddSchedule {
  tagsSchedule?: number[],
  onChange: (listTimeSchedule: number[]) => void,
}

export const AddSchedule = (props: IAddSchedule) => {

  const handleCloseInputScheduleTime = (removedTag: number) => {
    props.onChange && props.onChange((props.tagsSchedule || []).filter(tag => tag !== removedTag))
  };

  return (
    <div>
      {(props.tagsSchedule || []).map((tag, index) => (
        <Tag style={{display: 'inline'}} key={tag} closable onClose={() => handleCloseInputScheduleTime(tag)}>
          {new Date(tag).toLocaleString()}
        </Tag>
      ))}
      <DatePicker style={{ marginTop: 15 }} allowClear showTime showToday placeholder="Select Time" onOk={date => props.onChange && props.onChange([...(props.tagsSchedule || []), date.valueOf()])} />
    </div>
  )
}