import React from 'react'
import { Menu, Icon } from "antd";
import { Link } from 'react-router-dom';

export const SeedingMenuContent = () => (
    <Menu
        theme="light"
        mode="inline"
    >
        <Menu.ItemGroup key="services" className="gx-menu-group" title="Service">

            <Menu.SubMenu key="services" title={<span><Icon type="eye" style={{fontSize: 20}}/>View livestream</span>}>
                <Menu.Item key="services/buff-viewers-livestream">
                    <Link to="/buff-viewers-livestream"><i className="icon icon-custom-view" />Buff</Link>
                </Menu.Item>
                <Menu.Item key="/seeding/vip-viewer-livestream">
                    <Link to="/seeding/vip-viewer-livestream"><i className="icon icon-view" />VIP</Link>
                </Menu.Item>
                
            </Menu.SubMenu>


        </Menu.ItemGroup>



    </Menu>

)