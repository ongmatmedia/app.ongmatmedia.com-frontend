import React, { useState } from 'react'
import { DateTimePicker as DateTimePickerMaterial } from "@material-ui/pickers";
import { Row, Col } from 'antd';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const DateTimePickerMaterialComponent = DateTimePickerMaterial as any
export const DateTimePicker = ((props: { value: number, onChange: Function }) => {

    return (
        <Row type="flex" justify="space-around" align="middle"><Col>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePickerMaterialComponent
                    ampm={false}
                    disablePast
                    format="D/M/Y  H:mm"
                    showTodayButton
                    emptyLabel="Click to select time"
                    maxDate={new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000)}
                    value={props.value ? new Date(new Date(props.value)) : null}
                    onChange={d => props.onChange(d.valueOf())}
                />
            </MuiPickersUtilsProvider>
        </Col></Row>
    )
}) as any