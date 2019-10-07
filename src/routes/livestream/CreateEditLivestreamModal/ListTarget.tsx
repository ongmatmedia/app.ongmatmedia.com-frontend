import React from 'react'

import { LivestreamTarget } from '../../../schema/Services/Livestream/LivestreamTarget'
import { useState } from 'react'
import { Card, Avatar, Col, Row, Button, Input, Icon, Alert } from 'antd'
import { LivestreamTargetItemSelector } from './LivestreamTargetItemSelector'
import { LivestreamFacebookTargetType } from './LivestreamFacebookTargetType'
import { ListTargetItem } from './ListTargetItem'


export const ListTarget = ((props: { value: LivestreamTarget, onChange: Function }) => {
    const [mode, set_mode] = useState<null | LivestreamFacebookTargetType>(null)


    const FacebookIcon = {
        [LivestreamFacebookTargetType.profile]: 'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png',
        [LivestreamFacebookTargetType.group]: 'https://www.codester.com/static/uploads/items/5415/icon.png',
        [LivestreamFacebookTargetType.page]: 'https://www.socialmediaexaminer.com/wp-content/uploads/2014/07/kl-facebook-pages-app-logo.jpg'
    }

    const select = (uid: string, name: string, type: LivestreamFacebookTargetType) => {
        props.onChange({
            ...props.value,
            facebooks: [...props.value.facebooks, {
                uid, name, type
            }]
        })
    }
    const un_select = (uid: string) => {
        props.onChange({
            ...props.value,
            facebooks: props.value.facebooks.filter(t => t.uid != uid)
        })
    }

    return (
        <span>

            {
                props.value.facebooks.length == 0 && props.value.rtmps.length == 0 && (
                    <Alert message="Add some targets !" type="warning" showIcon style={{ marginBottom: 10 }} />
                )
            }

            {
                [
                    LivestreamFacebookTargetType.profile,
                    LivestreamFacebookTargetType.group,
                    LivestreamFacebookTargetType.page
                ].map((t,i) => (
                    <Card
                        key={i}
                        size="small"
                        title={(
                            <span>
                                <Avatar src={FacebookIcon[t]} size={30} style={{ marginRight: 10 }} />
                                <span>Facebook {t}</span>
                            </span>
                        )}
                        style={{ marginBottom: 10, borderRadius: 20 }}
                        headStyle={{ color: 'white', background: 'linear-gradient(to right, rgb(37, 116, 168), rgb(81, 74, 157))' }}
                    >
                        <ListTargetItem
                            list={props.value.facebooks.filter(a => a.type == t)}
                            onRemove={uid => un_select(uid)}
                            type={t}
                        />

                        {
                            mode == t ? (
                                <LivestreamTargetItemSelector
                                    type={t}
                                    selected={props.value.facebooks.filter(a => a.type == t).map(p => p.uid)}
                                    onSelect={(uid: string, name: string) => select(uid, name, t)}
                                    onClose={() => set_mode(null)}
                                />
                            ) : (
                                    <Row type="flex" justify="space-around" align="middle" style={{ paddingTop: 10 }}>
                                        <Col>
                                            <Button
                                                type="dashed"
                                                icon="plus"
                                                onClick={() => set_mode(t)}
                                            >Add {t}</Button>
                                        </Col>
                                    </Row>
                                )
                        }

                    </Card>

                ))
            }

            <Card
                size="small"
                title={(
                    <span>
                        <Avatar
                            src="https://raw.githubusercontent.com/martijn00/ExoPlayerXamarin/master/icon_exoplayer.png "
                            size={30}
                            style={{ marginRight: 10 }}
                        />
                        <span>RTMP</span>
                    </span>
                )}
                style={{ marginBottom: 10, borderRadius: 20 }}
                headStyle={{ color: 'white', background: 'linear-gradient(to right, rgb(37, 116, 168), rgb(81, 74, 157))' }}
            >

                <Row  >
                    <Col span={24}>
                        {
                            props.value.rtmps.map((rtmp: string, index: number) => (
                                <Input
                                    key={index}
                                    value={rtmp}
                                    onChange={e => props.onChange({
                                        ...props.value,
                                        rtmps: props.value.rtmps.map((v, i) => i == index ? e.target.value : v)
                                    })
                                    }
                                    addonAfter={<Icon type="minus" onClick={() => props.onChange({
                                        ...props.value,
                                        rtmps: props.value.rtmps.filter((v, i) => i != index)
                                    })} />}
                                    style={{ padding: 5 }}
                                />
                            ))
                        }
                    </Col>
                </Row>

                <Row type="flex" justify="space-around" align="middle" style={{ paddingTop: 10 }}>
                    <Col>
                        <Button
                            type="dashed"
                            icon="plus"
                            onClick={() => props.onChange({ ...props.value, rtmps: [...props.value.rtmps, ''] })}
                        >Add RTMP</Button>
                    </Col>
                </Row>
            </Card>
        </span>
    )
}) as any as Function

