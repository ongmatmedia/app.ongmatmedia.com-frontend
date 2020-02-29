import React, { ChangeEvent } from 'react'
import { Row, Col, Input, Icon } from 'antd'

interface VideoUrlInputProps {
  loading: boolean,
  videoUrlValue: string,
  setLoadingButton: (value: React.SetStateAction<boolean>) => void,
  submitVideoUrl: () => Promise<void>,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const VideoUrlInput = (props: VideoUrlInputProps) => (
  <Row>
    <Col span={24}>
      <Input
        value={props.videoUrlValue}
        onChange={props.onChange}
        addonAfter={props.loading ? <Icon type="loading" /> : <a onClick={async () => {
          props.setLoadingButton(true)
          await props.submitVideoUrl()
        }}>Enter</a>}
        onKeyDown={e => e.keyCode === 13 && e.preventDefault()}
        disabled={props.loading}
      />
    </Col>{' '}
  </Row>
)