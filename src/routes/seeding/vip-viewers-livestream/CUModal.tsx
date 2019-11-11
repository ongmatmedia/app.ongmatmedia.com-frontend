import React, { useEffect, Fragment, useState } from 'react'
import { Modal, Form as AntdForm, Input, Icon, Select, Row, Col, Avatar, Tag, Alert, Button, Switch } from 'antd'
import { withForm, Form } from '../../../containers/Form'
import { VIPViewersLivestream } from '../../../schema/Services/VIPViewersLivestream/VIPViewersLivestream'
import { VipViewersLivestreamGroup } from '../../../schema/Services/VIPViewersLivestream/VipViewersLivestreamGroup'
import { FacebookObjectInput, LivestreamFacebookTargetType } from '../../../components/FacebookObjectInput'
import { create_vip_viewers_livestream } from '../../../relayjs-mutations/create_vip_viewers_livestream'
import { update_vip_viewers_livestream } from '../../../relayjs-mutations/update_vip_viewers_livestream'

export type CUModalProps = {
    mode: 'create' | 'update',
    vip?: VIPViewersLivestream,
    onClose: Function
}

export const CUModal = withForm<CUModalProps>((props: CUModalProps & { form: Form }) => {

    const [editing_uid, set_editing_uid] = useState<boolean>(props.mode == 'create')
    const [error, set_error] = useState<string | null>(null)
    const [loading, set_loading] = useState<boolean>(false)


    const submit = () => props.form.submit(async data => {
        try {
            set_loading(true)
            if (props.mode == 'create') {
                await create_vip_viewers_livestream({ ...data, active: true })
            } else {
                await update_vip_viewers_livestream(data)
            }
            set_error(null)
            set_loading(false)
            set_editing_uid(true)
            props.onClose()
        } catch (e) {
            set_error(e.message)
            set_loading(false)
        }
    })

    return (
        <Modal
            visible={true}
            onOk={() => submit()}
            onCancel={() => props.onClose()}
            destroyOnClose
            closable={false}
            okButtonProps={{ loading }}
            title={props.mode == 'create' ? 'Create new VIP subscription' : 'Edit VIP subscription'}
        >
            <AntdForm>
                {
                    error && <Alert type="error" message={error} />
                }
                {
                    props.mode == 'update' && props.form.field<boolean>({
                        name: 'active',
                        render: ({ setValue }) => (
                            <AntdForm.Item >
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col> <h3><Icon type="clock-circle" /> Active status</h3> </Col>
                                    <Col>
                                        {
                                            props.vip && props.vip.active ? <Tag color={'rgb(21, 100, 42)'}>Running <Icon type="sync" spin /></Tag> : <Tag color={'#c01922'}> Stopped </Tag>
                                        }
                                    </Col>
                                </Row>
                                <Switch defaultChecked={props.vip && props.vip.active} onChange={checked => setValue(checked)} />
                            </AntdForm.Item>
                        )
                    })
                }
                {
                    props.form.field({
                        name: 'id',
                        require: 'Enter Facebook fanpage or Profile',
                        initalValue: props.mode == 'create' ? undefined : props.vip && props.vip.id,
                        render: ({ error, loading, setValues, value, set_touched, touched }) => (
                            <AntdForm.Item >
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col>
                                        <h3>
                                            <Icon type="user" /> Fanpage or profile <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag>
                                        </h3>
                                    </Col>
                                </Row>
                                {
                                    error && <Alert type="error" message={error} />
                                }
                                {
                                    value && value != '' && (
                                        <Row
                                            type="flex"
                                            justify="space-between"
                                            align="middle"
                                            className="livestream-target-item"
                                            style={{ padding: 5, borderRadius: 5 }}
                                        >
                                            <Col span={4}>
                                                <Avatar src={`http://graph.facebook.com/${props.form.data.id}/picture?type=large`} size={60} />
                                            </Col >
                                            <Col span={18}>
                                                <div style={{ padding: 10, flexWrap: 'wrap' }}>
                                                    {props.mode == 'create' ? props.form.data.name : props.vip && props.vip.name}
                                                </div>
                                            </Col>
                                            <Col span={2}>
                                                {
                                                    props.mode == 'create' && (
                                                        <Icon
                                                            type="edit"
                                                            style={{ color: 'rgb(81, 74, 157)', fontSize: 20, cursor: 'pointer' }}
                                                            onClick={() => set_editing_uid(true)}
                                                        />
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    )
                                }

                                {
                                    editing_uid && (
                                        <FacebookObjectInput
                                            placeholder="Enter link of fanpage or profile here then click search"
                                            onSelect={({ name, image, type, uid }) => {
                                                // if (type == LivestreamFacebookTargetType.group) return
                                                setValues({ id: uid, name })
                                                set_editing_uid(false)
                                            }}
                                        />
                                    )
                                }

                            </AntdForm.Item>
                        )
                    })
                }
                {
                    props.form.field<number>({
                        name: 'amount',
                        require: props.mode == 'create' ? 'Select amount' : undefined,
                        render: ({ error, loading, setValue, value, set_touched, touched }) => (
                            <AntdForm.Item>
                                <Row type="flex" justify="space-between" align="middle">

                                    {
                                        props.mode == 'create' ? (
                                            <Col>
                                                <h3><Icon type="eye" /> Viewers amount <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag></h3>
                                            </Col>
                                        ) : (
                                                <Fragment>
                                                    <Col><h3><Icon type="eye" /> Change amount</h3></Col>
                                                    <Col> <Tag color="#108ee9">Current {props.vip && props.vip.amount} viewers</Tag></Col>
                                                </Fragment>

                                            )
                                    }

                                </Row>
                                {
                                    error && <Alert type="error" message={error} />
                                }
                                <Select onChange={setValue} placeholder="Click to select viewers amount when livestream">
                                    {
                                        [30, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000].map(amount => (
                                            <Select.Option value={amount}>{amount}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </AntdForm.Item>
                        )
                    })
                }
                {
                    props.form.field<number>({
                        name: 'days',
                        require: props.mode == 'create' ? 'Select day' : undefined,
                        render: ({ error, loading, setValue, value, set_touched, touched }) => (
                            <AntdForm.Item>
                                <Row type="flex" justify="space-between" align="middle" >

                                    {
                                        props.mode == 'create' ? (
                                            <Col><h3>
                                                <Icon type="calendar" /> Subscription days <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag>
                                            </h3></Col>
                                        ) : (
                                                <Fragment>
                                                    <Col><h3><Icon type="eye" /> Extend day</h3></Col>
                                                    <Col> <Tag color="#108ee9">30 days 6 hours remaining</Tag></Col>
                                                </Fragment>
                                            )
                                    }



                                </Row>
                                {
                                    error && <Alert type="error" message={error} />
                                }
                                <Select placeholder="Click to select days" onChange={setValue}>
                                    {
                                        [15, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map(days => (
                                            <Select.Option value={days}>{days} days {days >= 30 ? `~ (${Math.floor(days / 30)} months)` : ''} </Select.Option>
                                        ))
                                    }
                                </Select>

                            </AntdForm.Item>
                        )
                    })
                }

                {
                    props.form.field<VipViewersLivestreamGroup[]>({
                        name: 'groups',
                        initalValue: [],
                        render: ({ error, loading, setValue, value: groups, set_touched, touched }) => (
                            <AntdForm.Item>
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col><h3><Icon type="usergroup-add" /> Groups </h3></Col>
                                    <Col>
                                        <Tag color="#108ee9">{groups.length} groups</Tag>
                                    </Col>
                                </Row>
                                {
                                    groups.map(group => (
                                        <Row
                                            type="flex"
                                            justify="space-between"
                                            align="middle"
                                            className="livestream-target-item"
                                            style={{ padding: 5, borderRadius: 5 }}
                                        >
                                            <Col span={4}>   <Avatar src={group.image} size={60} />  </Col >
                                            <Col span={18}>
                                                <div style={{ padding: 10, flexWrap: 'wrap' }}>{group.name}</div>
                                            </Col>
                                            <Col span={2}>
                                                <Icon
                                                    type="close-circle"
                                                    style={{ color: 'rgb(81, 74, 157)', fontSize: 20, cursor: 'pointer' }}
                                                    onClick={() => setValue(groups.filter(g => g.uid != group.uid))}
                                                />
                                            </Col>
                                        </Row>

                                    ))
                                }
                                <Row>
                                    <Col>
                                        <FacebookObjectInput
                                            onSelect={({ name, image, type, uid }) => {
                                                if (type != LivestreamFacebookTargetType.group) return
                                                if (groups.filter(g => g.uid == uid).length > 0) {
                                                    setValue(groups.map(g => g.uid == uid ? { name, image, uid } : g))
                                                } else {
                                                    setValue([
                                                        { image, uid, name },
                                                        ...groups
                                                    ])
                                                }
                                            }}
                                            placeholder="Enter your group URL here then click search"
                                        />
                                    </Col>
                                </Row>
                            </AntdForm.Item>
                        )
                    })
                }

                {
                    props.form.field<string>({
                        name: 'note',
                        require: 'Enter note',
                        initalValue: props.mode == 'update' ? props.vip && props.vip.note : undefined,
                        render: ({ error, loading, setValue, value, set_touched, touched }) => {
                            return (
                                <AntdForm.Item>
                                    <Row type="flex" justify="space-between" align="middle">
                                        <Col><h3><Icon type="form" /> Note <Tag style={{ background: '#fff', borderStyle: 'dashed' }}> Require </Tag></h3></Col>
                                        <Col>
                                        </Col>
                                    </Row>
                                    {
                                        error && <Alert type="error" message={error} />
                                    }
                                    <Input
                                        placeholder="Some note for this VIP"
                                        value={value}
                                        onChange={e => setValue(e.target.value)}
                                    />
                                </AntdForm.Item>
                            )
                        }
                    })
                }
            </AntdForm>
            {
                props.mode == 'update' && (
                    <Row type="flex" justify="end">
                        <Col>
                            <Button type="danger" icon="delete"> Cancel VIP subscription</Button>
                        </Col>
                    </Row>
                )
            }
        </Modal >
    )
})