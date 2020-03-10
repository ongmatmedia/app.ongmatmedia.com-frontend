import { DatePicker, Tag, Button } from 'antd';
import React, { useState } from 'react';

export interface IAddSchedule {
  tagsSchedule: number[],
  onChange: (listTimeSchedule: number[]) => void,
}

export const AddSchedule = (props: IAddSchedule) => {

  const handleCloseInputScheduleTime = (removedTag: number) => {
    props.onChange && props.onChange((props.tagsSchedule || []).filter(tag => tag !== removedTag))
  };

  return (
    <div>
      {(props.tagsSchedule || []).map((tag, index) => (
        <Tag style={{ display: "inline" }} key={tag} closable onClose={() => handleCloseInputScheduleTime(tag)} color={tag === 0 ? '#108ee9' : ''}>
          {tag === 0 ? 'Live now ' : new Date(tag).toLocaleString()}
        </Tag>
      ))}
      <DatePicker style={{ marginTop: 15, marginBottom: 15, display: "block" }} allowClear showTime showToday placeholder="Select Time" onOk={date => props.onChange && props.onChange([...(props.tagsSchedule || []), date.valueOf()])} />
      {
        !props.tagsSchedule || !props.tagsSchedule.includes(0) && (
          <Button type="primary" onClick={() => props.onChange([...(props.tagsSchedule || []), 0])}>Live now</Button>
        )
      }
    </div>
  )
}