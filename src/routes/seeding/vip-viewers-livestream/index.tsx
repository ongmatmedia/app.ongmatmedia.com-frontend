import React  from "react";
import { VipViewersLivestreamServiceList } from "./list";
import { Card } from "antd";
import { VipViewersLivestreamServiceWidget } from "./add-edit.widget";

export const VipViewersLivestreamServicePage = () => (
    <div>
        <Card title="Vip viewers livestream">
            <VipViewersLivestreamServiceWidget />
            <VipViewersLivestreamServiceList />
        </Card>
    </div>
)