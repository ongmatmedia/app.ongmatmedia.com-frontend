import React, { useState } from 'react'
import { Input, Icon } from 'antd'

export enum LivestreamFacebookTargetType {
    profile = "profile",
    group = "group",
    page = "page"
}

export type FacebookObjectInputProps = {
    onSelect: (obj: { name: string, uid: string, image: string, type: LivestreamFacebookTargetType }) => any,
    placeholder?: string
    defaultValue?: string
}

export const FacebookObjectInput = (props: FacebookObjectInputProps) => {
    const [loading, set_loading] = useState<boolean>(false)
    const [value, set_value] = useState<string>(props.defaultValue || '')

    const submit = async () => {
        set_loading(true)
        await new Promise(s => setTimeout(s, 3000))
        props.onSelect({
            image: 'http://graph.facebook.com/100002482238412/picture?type=large',
            name: 'Duong Van Ba',
            uid: `${Date.now()}`,
            type: LivestreamFacebookTargetType.group
        })
        set_loading(false)
        set_value('')
    }

    return (
        <Input
            addonAfter={<Icon type={loading ? 'loading' : 'search'} style={{ cursor: 'pointer' }} onClick={submit} />}
            allowClear
            value={value}
            onChange={e => set_value(e.target.value)}
            placeholder={props.placeholder || ''}
        />
    )
}