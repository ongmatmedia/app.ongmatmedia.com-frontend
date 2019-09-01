import React, { Component } from 'react'
import { ColumnProps } from "antd/lib/table";
import { BuffViewersLivestreamTask } from '../../../schema/Task/BuffViewersLivestream'
import Moment from 'react-moment'
import { Tag, Button, Modal, notification, Icon } from 'antd';
import { delete_task } from '../../../relayjs-mutations';

export const ListColumn: Array<ColumnProps<BuffViewersLivestreamTask>> = [
    {
        key: 'uid',
        title: 'Video ID',
        render: (el: BuffViewersLivestreamTask) => (
            <a href={`https://fb.com/${el.uid}`} target="_blank"><Icon type="video-camera" /> &nbsp;{el.uid}</a>
        )
    },
    {
        key: 'amount',
        title: 'Amount',
        render: (el: BuffViewersLivestreamTask) => <Tag color={el.amount < 1000 ? '#2db7f5' : 'red'}>{el.amount}</Tag>,
        sorter: (a: BuffViewersLivestreamTask, b: BuffViewersLivestreamTask) => a.amount - b.amount
    },
    {
        key: 'created_time',
        title: 'Created',
        render: (el: BuffViewersLivestreamTask) => (
            <span>
                <Moment format="DD/MM/YYYY H:mm">{el.created_time}</Moment>  &nbsp;&nbsp;   
                <Tag color="blue"><Moment toNow>{el.created_time}</Moment></Tag>
            </span>
            
        ),
        sorter: (a: BuffViewersLivestreamTask, b: BuffViewersLivestreamTask) => (b.created_time - a.created_time)
    },
    {
        key: 'note',
        title: 'Note',
        render: (el: BuffViewersLivestreamTask) => el.note
    },
    {
        key: 'action',
        title: 'Action',
        render: (el: BuffViewersLivestreamTask) => (
            <span>
                <Button
                    type="danger"
                    icon="delete"
                    onClick={() => {
                        Modal.confirm({
                            title: `Do you want to delete tas ${el.uid} : ${el.note}`,
                            onOk: () => {
                                try {
                                    delete_task(el.id, el['__typename'])
                                } catch (e) {
                                    notification.error({ message: 'Some thing wrong' })
                                }
                            },
                        },

                        )

                    }}
                >
                    Delete
                </Button>
            </span>
        )
    }
]