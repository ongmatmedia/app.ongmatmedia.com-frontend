import React from 'react';
import { Layout } from "antd";
import { TopBar } from '../../components/TopBar'


export const Header = () => (
    <Layout.Header style={{
        height: 50,
        background: 'linear-gradient(to right, #24c6dc, #514a9d)',
        padding: 0 
    }}>
        <TopBar />
    </Layout.Header>
)