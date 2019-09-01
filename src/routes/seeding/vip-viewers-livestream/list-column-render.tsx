import React from 'react'
import { VIPBuffViewersLivestreamTask } from "../../../schema/Task/VIPBuffViewersLivestream";
import { ColumnProps } from "antd/lib/table";
import { Button, notification, Modal, Avatar, Icon, Alert, Tag, Card } from "antd";
import { delete_task } from '../../../relayjs-mutations'
import { vip_viewers_livestream_widget_store } from '../../../store/widgets/add-edit-vip-viewers-livestream.widget'
import Moment from 'react-moment'
import Meta from 'antd/lib/card/Meta';

export const ListColumn: Array<ColumnProps<VIPBuffViewersLivestreamTask>> = [
    {
        key: 'uid',
        title: 'UID',
        render: (el: VIPBuffViewersLivestreamTask) => (
            <span onClick={() => (window as any).open(`https://fb.com/${el.uid}`, '_blank').focus} >
                {
                    el.active
                        ? <Tag color="rgb(13, 169, 157)">Active</Tag>
                        : <Tag color="red">Stoped</Tag>
                }
                {el.uid}
            </span>

        )
    },
    {
        key: 'name',
        title: 'Name',
        render: (el: VIPBuffViewersLivestreamTask) => (
            <span onClick={() => (window as any).open(`https://fb.com/${el.uid}`, '_blank').focus} >
                <Avatar src={`https://graph.facebook.com/${el.uid}/picture?type=large`} size={50} />
                &nbsp; &nbsp; {el.name}
            </span>
        ),
        sorter: (a: VIPBuffViewersLivestreamTask, b: VIPBuffViewersLivestreamTask) => a.name.localeCompare(b.name)
    },
    {
        key: 'amount',
        title: 'Amount',
        render: (el: VIPBuffViewersLivestreamTask) => <Tag color={el.amount < 1000 ? 'blue' : 'red'}>{el.amount}</Tag>,
        sorter: (a: VIPBuffViewersLivestreamTask, b: VIPBuffViewersLivestreamTask) => a.amount - b.amount
    },
    {
        key: 'note',
        title: 'Note',
        render: (el: VIPBuffViewersLivestreamTask) => el.note
    },
    {
        key: 'created_time',
        title: 'Created',
        render: (el: VIPBuffViewersLivestreamTask) => <Moment toNow>{el.created_time}</Moment>,
        sorter: (a: VIPBuffViewersLivestreamTask, b: VIPBuffViewersLivestreamTask) => (b.created_time - a.created_time)
    },
    {
        key: 'end_time',
        title: 'Expire time',
        render: (el: VIPBuffViewersLivestreamTask) => {
            const days = Math.floor((el.end_time - Date.now()) / 1000 / 60 / 60 / 24)
            return <span><Tag color={days > 0 ? '#108ee9' : 'red'}>{days}</Tag> days</span>
        },
        sorter: (a: VIPBuffViewersLivestreamTask, b: VIPBuffViewersLivestreamTask) => (a.end_time - b.end_time)
    },
    {
        key: 'active_groups',
        title: 'Buff in groups',
        render: (el: VIPBuffViewersLivestreamTask) => (
            <Tag color={el.active_groups ? '#108ee9' : 'red'}>{el.active_groups ? 'Yes' : 'No'}</Tag>
        ),
        sorter: (a: VIPBuffViewersLivestreamTask, b: VIPBuffViewersLivestreamTask) => (
            (a.active_groups ? 1 : 0) - (b.active_groups ? 1 : 0)
        )
    },
    {
        key: 'action',
        title: 'Action',
        render: (el: VIPBuffViewersLivestreamTask) => (
            <span>
                <Button
                    type="primary"
                    icon="edit"
                    onClick={() => vip_viewers_livestream_widget_store.show_edit(el)}
                >
                    Edit
                </Button>
                <Button
                    type="danger"
                    icon="delete"
                    onClick={() => {
                        Modal.confirm({
                            title: `Do you want to delete VIP livestream viewer`,
                            content: (
                                <Card>
                                    <Meta
                                        avatar={
                                            <Avatar src={`https://graph.facebook.com/${el.uid}/picture?type=large`} style={{marginTop: 10}} size={50} />
                                        }
                                        title={el.name}
                                        description={(
                                            <span>
                                                <Tag color="blue">{el.uid}</Tag>
                                                <br/>{el.note}
                                            </span>
                                        )}
                                    />
                                </Card>

                            ),
                            onOk: () => {
                                try {
                                    delete_task(el.id, el['__typename'])
                                    notification.success({message: "Deleted"})
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
