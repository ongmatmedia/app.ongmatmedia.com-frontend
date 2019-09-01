import React, { useState } from 'react'
import { VIPBuffViewersLivestreamTask } from "../../../schema/Task/VIPBuffViewersLivestream";
import { Table, notification, Button, Input } from "antd";
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from "../../../configs/relayjs";
import { ListColumn } from './list-column-render'
import { vip_viewers_livestream_widget_store } from '../../../store/widgets/add-edit-vip-viewers-livestream.widget';
const graphql = require('babel-plugin-relay/macro');



const query = graphql`

        query listVipViewersLivestreamMutation{
            tasks(type: "VIPBuffViewersLivestreamTask"){
                edges{
                    node{
                        __typename,
                        ... on VIPBuffViewersLivestreamTask{
                            uid, amount,name,id,active,active_groups,groups,note,created_time,end_time
                        }
                    }
                }
            }
        }

`

export interface Props {
    loading: boolean,
    list: VIPBuffViewersLivestreamTask[]
}

export const VipViewersLivestreamServiceTable = (props: Props) => {

    const [search_content, search] = useState("")

    return (
        <span>
            <div className="table-operations">
                <Button
                    type="primary"
                    icon="plus"
                    onClick={() => vip_viewers_livestream_widget_store.show_add()} >
                    Add VIP
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
                pagination={{
                    position: "bottom",
                    pageSizeOptions: ['10','20','30','50','100','200','300','500','1000'],
                    showSizeChanger: true
                } as any}
                columns={ListColumn}
                rowKey="uid"
                dataSource={
                    search_content == ''
                    ? props.list
                    : props.list.filter(
                        el => `${el.uid} ${el.name} ${el.note}`.toLowerCase().indexOf(search_content.toLowerCase()) >= 0
                    )
                }
                loading={props.loading}
                size="small"
                style={{ cursor: "pointer" }}
            />
        </span>
    )
}


export const VipViewersLivestreamServiceList = () => (
    <QueryRenderer
        environment={RelayEnvironment}
        query={query}
        variables={{ type: 'VIPBuffViewersLivestreamTask' }}
        render={data => {
            data.error && notification.error({ message: 'Somethings wrong in system, try again laster' })
            let list: VIPBuffViewersLivestreamTask[] = []
            if (data.props != null) list = (data.props as any).tasks.edges.map(x => x.node);
            return <VipViewersLivestreamServiceTable list={list} loading={data.props == null} />
        }}

    />
)