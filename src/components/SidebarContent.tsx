import React from 'react';
import { Menu, Icon } from "antd";
import { CustomScrollbars } from "../components/CustomScrollbars";
import { UserProfile } from './UserProfile';
import { Link } from 'react-router-dom';


export const SidebarContent = () => (

    // <CustomScrollbars  >
        <Menu
            theme="light"
            mode="inline"
        >


            <Menu.ItemGroup key="services" className="gx-menu-group" title="Service">
                <Menu.Item key="services/facebook-account">
                    <Link to="/main/dashboard/crm"><i className="icon icon-user-o" />Facebook accounts</Link>
                </Menu.Item>

                <Menu.SubMenu key="dashboard" title={<span><i className="icon icon-custom-view" />Viewers livestream</span>}>
                    <Menu.Item key="services/buff-viewers-livestream">
                        <Link to="/buff-viewers-livestream"><i className="icon icon-custom-view" />Buff</Link>
                    </Menu.Item>
                    <Menu.Item key="services/vip-viewers-livestream">
                        <Link to="/vip-viewers-livestream"><i className="icon icon-view" />VIP</Link>
                    </Menu.Item>
                    <Menu.Item key="services/vip-viewerbs-livestream">
                        <Link to="/buff-video-viewers"><i className="icon icon-view" />Buff viewers</Link>
                    </Menu.Item>

                </Menu.SubMenu>
                <Menu.Item key="services/faceboock-account">
                    <Link to="/main/dashboard/crm"><i className="icon icon-quote-backward" />Auto comments</Link>
                </Menu.Item>
                <Menu.Item key="services/faceboock-adccount">
                    <Link to="/main/dashboard/crm"><i className="icon icon-reply" />Auto inbox</Link>
                </Menu.Item>





            </Menu.ItemGroup>



            <Menu.ItemGroup key="user" className="gx-menu-group" title="User">

                <Menu.Item key="user/profile">
                    <Link to=""><i className="icon icon-avatar" />Profile</Link>
                </Menu.Item>
                <Menu.Item key="user/deposit">
                    <Link to=""><i className="icon icon-bitcoin" />Deposit</Link>
                </Menu.Item>
                <Menu.Item key="user/deposdit">
                    <Link to=""><i className="icon icon-bitcoin" />Pricing</Link>
                </Menu.Item>
                <Menu.Item key="payment-history">
                    <Link to="/payment-history"><i className="icon icon-select" />Payment history</Link>
                </Menu.Item>

                <Menu.Item key="main/layouts">
                    <Link to="/logout"><i className="icon icon-close" />Logout</Link>
                </Menu.Item>



            </Menu.ItemGroup>



            <Menu.ItemGroup key="support" className="gx-menu-group" title="Support">

                <Menu.Item key="contact-admin">
                    <Link to="contact-admin"><i className="icon icon-tickets" /> Contact admin</Link>
                </Menu.Item>


            </Menu.ItemGroup>

        </Menu>


    // </CustomScrollbars>



)