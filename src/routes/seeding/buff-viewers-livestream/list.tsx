import React, { useState } from 'react'
import { BuffViewersLivestreamTask } from "../../../schema/Task/BuffViewersLivestream";
import { Table, notification, Button, Input } from "antd";
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from "../../../configs/relayjs";
import { ListColumn } from './list-column-render'
import {
    BuffViewrsLivestreamWidgetStore,
    buff_viewers_livestream_widget_store
} from '../../../store/widgets/add-viewers-livestream.widget';
const graphql = require('babel-plugin-relay/macro');



const query = graphql`

        query listViewersLivestreamMutation{
            tasks(type: "BuffViewersLivestreamTask"){
                edges{
                    node{
                        __typename,
                        ... on BuffViewersLivestreamTask{
                            id, created_time,note, uid,amount
                        }
                    }
                }
            }
        }

`

export interface Props {
    loading: boolean,
    list: BuffViewersLivestreamTask[]
}

export const ViewersLivestreamServiceTable = (props: Props) => {

    const [search_content, search] = useState("")

    return (
        <span>
            <div className="table-operations">
                <Button
                    type="primary"
                    icon="plus"
                    onClick={() => buff_viewers_livestream_widget_store.show()} >
                    Buff now
            </Button>
                <Input
                    placeholder="Search"
                    defaultValue=""
                    allowClear
                    onChange={e => search(e.target.value)}
                    style={{ float: 'right', maxWidth: 300 }}
                />
            </div>


            <Table
                pagination={{ position: 'bottom' }}
                columns={ListColumn}
                rowKey="uid"
                dataSource={
                    search_content == ''
                    ? props.list
                    : props.list.filter(
                        el => `${el.uid} ${el.note}`.toLowerCase().indexOf(search_content.toLowerCase()) >= 0
                    )
                }
                loading={props.loading}
                size="small"
            />
        </span>
    )
}


export const ViewersLivestreamServiceList = () => (
    <QueryRenderer
        environment={RelayEnvironment}
        query={query}
        variables={{ type: 'BuffViewersLivestreamTask' }}
        render={data => {
            data.error && notification.error({ message: 'Somethings wrong in system, try again laster' })
            let list: BuffViewersLivestreamTask[] = []
            if (data.props != null) list = (data.props as any).tasks.edges.map(x => x.node);
            return <ViewersLivestreamServiceTable list={list} loading={data.props == null} />
        }}

    />
)