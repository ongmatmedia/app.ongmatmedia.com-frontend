import React from 'react'
import { Table, Button } from 'antd'
import { BuffViewersLivestream } from '../../../schema/Services/BuffViewersLivestream/BuffViewersLivestream'


const columns = [
    {
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Action',
        key: 'address',
        render: text => <Button type="danger">Delete</Button>
    }
]

const data: BuffViewersLivestream[] = [
    {
        amount: 30,
        created_time: (new Date()).toString(),
        id: "214324",
        name: "Duong Van BA",
        note: "Ahihi",
        uid: "52346",
        user_id: "s"
    }
]

export const BuffViewersLivestreamList = () => (
    <Table
        columns={columns}
        dataSource={data}

    />
)