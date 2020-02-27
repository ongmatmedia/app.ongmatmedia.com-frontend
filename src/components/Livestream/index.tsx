import { Button, Col, Icon, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { LivestreamsListTab } from './LivestreamsListTab';
import { AddingLivestreamTab } from './AddingLivestreamTab';
import { DetailLivestreamTab } from './DetailLivestreamTab';
const { TabPane } = Tabs;

export const LivestreamTabs = () => {

  const [activeTabKey, setActiveTabKey] = useState<string>("1")

  return (
    <div>
      <Row style={{ backgroundColor: "white", padding: 20}}>
        <Col span={24}>
          <Tabs activeKey={activeTabKey} onTabClick={(key: string, event: MouseEvent) => setActiveTabKey(key)} defaultActiveKey="1" type="card">
            <TabPane tab="List livestreams" key="1">
              <Button type="primary" onClick={() => setActiveTabKey("2")}>
                <Icon type="plus" />
                Add livestream schedule
              </Button>
              <LivestreamsListTab />
            </TabPane>
            <TabPane tab="Add livestream" key="2">
              <AddingLivestreamTab setActiveTabKey={setActiveTabKey} />
            </TabPane>
            <TabPane tab="Detail livestream" key="3">
              <DetailLivestreamTab />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}