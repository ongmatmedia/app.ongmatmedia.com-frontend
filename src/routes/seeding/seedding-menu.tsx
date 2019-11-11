import React from 'react'
import { Menu, Icon } from "antd";
import { Link } from 'react-router-dom';

export const SeedingMenuContent = () => (
    <Menu
        theme="light"
        mode="inline"
    >
        <Menu.ItemGroup key="services" className="gx-menu-group" title="Service">

            <Menu.SubMenu key="like" title={<span><Icon type="like" style={{fontSize: 20}}/>Auto like</span>}>
                <Menu.Item key="services/buff-viewers-livestream">
                    <Link to="/buff-viewers-livestream"><i className="icon icon-custom-view" />Buff</Link>
                </Menu.Item>
                <Menu.Item key="/seeding/vip-viewer-livestream">
                    <Link to="/seeding/vip-viewer-livestream"><i className="icon icon-view" />VIP   </Link>
                </Menu.Item> 

            </Menu.SubMenu>



            <Menu.SubMenu key="livestream" title={<span><Icon type="eye" style={{fontSize: 20}}/>View livestream</span>}>
                <Menu.Item key="services/buff-viewers-livestream">
                    <Link to="/buff-viewers-livestream"><i className="icon icon-custom-view" />Buff</Link>
                </Menu.Item>
                <Menu.Item key="/seeding/vip-viewer-livestream">
                    <Link to="/seeding/vip-viewer-livestream"><i className="icon icon-view" />VIP</Link>
                </Menu.Item>
                <Menu.Item key="services/vip-viewerbs-livestream">
                    <Link to="/buff-video-viewers"><i className="icon icon-view" />Buff viewers</Link>
                </Menu.Item>

            </Menu.SubMenu>

            <Menu.Item key="services/faceboock-account">
                <Link to="/main/dashboard/crm"><Icon type="message" style={{fontSize: 20}}/>Auto comments</Link>
            </Menu.Item>

            <Menu.Item key="servicces/faceboock-account" >
                <Link to="/main/dashboard/crm"> <Icon type="shop" style={{fontSize: 20}} />Store review</Link>
            </Menu.Item>

            



        </Menu.ItemGroup>



    </Menu>

)