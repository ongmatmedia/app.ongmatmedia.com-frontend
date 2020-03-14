import { Button, Col, Icon, Row, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { LivestreamsListTab } from './LivestreamsListTab';
import { CreateUpdateLivestreamTab } from './CreateUpdateLivestreamTab';
import { DetailLivestreamTab } from './DetailLivestreamTab';
import { Livestream } from '../../types'

const { TabPane } = Tabs;

export const LivestreamTabs = () => {

  const [activeTabKey, setActiveTabKey] = useState<string>("1")
  const [live, selectLiveToUpdate] = useState<Livestream | null>()

  return (
    <div>
      <Row style={{ backgroundColor: "white", padding: 20 }}>
        <Col span={24}>
          <Tabs activeKey={activeTabKey} onTabClick={(key: string, event: MouseEvent) => setActiveTabKey(key)} defaultActiveKey="1" type="card">
            <TabPane tab="List livestreams" key="1">
              <Button type="primary" onClick={() => {
                selectLiveToUpdate(null)
                setActiveTabKey("2")
              }} style={{ marginBottom: 20 }}>
                <Icon type="plus" />
                Add livestream schedule
              </Button>
              <LivestreamsListTab onNavigateCreateUpdateTab={() => setActiveTabKey('2')} onSelectLiveToUpdate={live => selectLiveToUpdate(live)}/>
            </TabPane>
            <TabPane tab="Create/Update livestream" key="2">
              <CreateUpdateLivestreamTab setActiveTabKey={setActiveTabKey} task={live} mode={live ? 'update' : 'create'} clearLiveCache={() => selectLiveToUpdate(null)} />
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