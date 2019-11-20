import React, { useState, createRef } from 'react'
import { Row, Col, Input, Icon, Avatar, Alert, Button } from 'antd'
import { LivestreamVideo } from '../../../../schema/Services/Livestream/LivestreamVideo'
import { Video } from '../../../../api/Video'

export const VideoComposer = ((props: { value: LivestreamVideo[], onChange: (videos: LivestreamVideo[]) => void }) => {

    const videos = props.value
    const [video_url, set_video_url] = useState<string>('')
    const [loading, set_loading] = useState<boolean>(false)
    const [error, set_error] = useState<string | null>(null)

    const add_video = async () => {
        if (video_url.trim().length == 0) return
        set_error(null)
        set_loading(true)
        set_video_url('')
        try {
            const data = await Video.getVideoInfo(video_url)
            videos.filter(v => v.video_id == data.video_id).length == 0 && props.onChange([...videos, data])
        } catch (e) {
            set_error(e)
        }
        set_loading(false)
    }



    return (
        <Row>
            <Col span={24}>

                {
                    error && (
                        <Row><Col span={24}>
                            <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />
                        </Col> </Row>
                    )
                }

                <Row><Col span={24}>
                    <Input
                        value={video_url}
                        onChange={e => set_video_url(e.target.value)}
                        addonAfter={loading ? <Icon type="loading" /> : <a onClick={add_video}>Enter</a>}
                        onKeyDown={e => e.keyCode == 13 && add_video()}
                        disabled={loading}
                    />
                </Col> </Row>

                {
                    videos.map((v, i) => (
                        <Row key={i} type="flex" justify="space-between" align="middle" style={{ padding: 10 }}>
                            <Col span={8}> <img src={v.thumbnail_url} style={{ maxWidth: 150 }} /> </Col>
                            <Col span={12}>
                                {v.title}
                                {
                                    (v as any).is_livestream && (
                                        <Avatar
                                            src="https://cdn4.iconfinder.com/data/icons/remains/100/facebook_live_icon-2-512.png"
                                            style={{ marginLeft: 5, fontSize: 10 }}
                                        />
                                    )
                                }

                            </Col>
                            <Col span={2}>
                                <Icon
                                    type="delete"
                                    style={{ fontSize: 20, cursor: 'pointer', color: 'red' }}
                                    onClick={() => props.onChange(videos.filter((v, index) => index != i))}
                                />
                            </Col>
                        </Row>
                    ))
                }
            </Col>
        </Row>
    )
}) as any
