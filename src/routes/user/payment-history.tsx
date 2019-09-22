import React from "react"; 

// const graphql = require('babel-plugin-relay/macro')


// const query = graphql`
//     query paymentHistoryQuery($next_token: String, $from: Long ){
//         payment_histories(
//             next_token: $next_token,
//             from: $from
//         ){
//             edges{
//                 node{
//                    note,from,to,time, service,total,balance_after
//                 }
//             }
//             pageInfo{
//                 next_token
//             }
//         }
//     }
// `

// const ServicesList: { [code: string]: { text: string, color: string } } = {
//     SendMoney: {
//         color: 'blue',
//         text: 'Send money',
//     },
//     BuffViewersLivestreamTask: {
//         color: 'orange',
//         text: 'Buff Viewers Livestream',
//     },
//     VIPBuffViewersLivestreamTask: {
//         color: 'pink',
//         text: 'VIP Buff Viewers Livestream',
//     }
// }



// const payment_history_column_render: ColumnProps<PaymentHistory>[] = [
//     {
//         key: 'time',
//         title: 'Time',
//         sorter: (a: PaymentHistory, b: PaymentHistory) => a.time - b.time,
//         render: (el: PaymentHistory) => <Moment format="DD/MM/YYYY H:mm">{el.time}</Moment>
//     },
//     {
//         key: 'service',
//         title: 'Service',
//         render: (el: PaymentHistory) => (
//             <Tag color={(ServicesList[el.service] || { color: 'green' }).color}>
//                 {el.service}
//             </Tag>
//         ),
//         sorter: (a: PaymentHistory, b: PaymentHistory) => a.service.localeCompare(b.service),
//         onFilter: (service: string, el: PaymentHistory) => el.service == service,
//         filters: Object.keys(ServicesList).map(key => ({ value: key, text: ServicesList[key].text }))
//     },

//     {
//         key: 'to',
//         title: 'To',
//         sorter: (a: PaymentHistory, b: PaymentHistory) => a.to.localeCompare(b.to),
//         render: (el: PaymentHistory) => el.to
//     },
//     {
//         key: 'total',
//         title: 'Total',
//         sorter: (a: PaymentHistory, b: PaymentHistory) => a.total - b.total,
//         render: (el: PaymentHistory) => <Tag color="#108ee9">{el.total.toLocaleString(undefined, { maximumFractionDigits: 2 })} vnd</Tag>
//     },
//     {
//         key: 'balance_after',
//         title: 'Balance after',
//         render: (el: PaymentHistory) => el.balance_after ? <Tag color="#108ee9">{el.balance_after.toLocaleString(undefined, { maximumFractionDigits: 2 }) }</Tag> : null
//     },
//     {
//         key: 'note',
//         title: 'Note',
//         render: (el: PaymentHistory) => el.note
//     }
// ]

// const PaymentHistoryPageRender = (props: LoadMoreContainerRenderProps<PaymentHistory>) => (
//     <span>
//         <Card title="Payment history">
//             <div style={{ marginBottom: 10 }} >
//                 <Button
//                     type="dashed"
//                     style={{ marginBottom: 0, marginLeft: 10 }}
//                     onClick={() => props.load_more({ from: Date.now() }, true)}
//                 >
//                     See from today
//                                     </Button>
//                 or from a day &nbsp;&nbsp;
//                                     <DatePicker onChange={date => {
//                     props.load_more({
//                         from: date && date.valueOf()
//                     }, true)
//                 }} />
//             </div>
//             <Table
//                 columns={payment_history_column_render}
//                 loading={props.loading}
//                 dataSource={props.data.edges.map(x => ({ ...x.node, key: `${Math.random()}` }))}
//                 pagination={false}
//             />

//             <div style={{ width: '100%', marginTop: 10 }}>
//                 <Row>
//                     <Col style={{ textAlign: 'center' }} span={24}>
//                         <Spin spinning={props.loadingMore} />
//                         {
//                             !props.loadingMore && props.data.pageInfo.next_token && (
//                                 <Button
//                                     onClick={() => props.load_more({ next_token: props.data.pageInfo.next_token }, false)}
//                                 >Load more</Button>
//                             )
//                         }
//                     </Col>
//                 </Row>
//             </div>



//         </Card>

//     </span>
// )




export const PaymentHistoryPage = () => (
    <span>Payment history</span>
)