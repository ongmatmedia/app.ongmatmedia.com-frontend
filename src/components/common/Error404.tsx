import { Button, Result } from 'antd'
import i18n from 'i18next'
import React from 'react'

export const Error404Page = props => (
  <Result
    status="404"
    title={null}
    subTitle={i18n.language == 'en' ? 'This feature is in experimental. Please wait next release!' : 'Tính năng này đang trong quá trình thử nghiệm!'}
    extra={<Button type="primary" onClick={() => window.history.back()}>{i18n.language == 'en' ? 'Go back' : 'Quay trở lại trang trước'}</Button>}
  />
)