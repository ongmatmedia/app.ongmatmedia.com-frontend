import React  from "react";
import { ViewersLivestreamServiceList } from "./list";
import { Card } from "antd";
import { ViewersLivestreamServiceWidget } from "./add.widget";

export const ViewersLivestreamServicePage = () => (
    <div>
        <Card title=" viewers livestream">
            <ViewersLivestreamServiceWidget />
            <ViewersLivestreamServiceList />
        </Card>
    </div>
)