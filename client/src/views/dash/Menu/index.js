import React from "react";
import { Menu, Icon } from 'antd';
import {withRouter} from 'react-router-dom'


function MenuContainer({history, location}) {

    function handleClick(e) {
        history.push(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[location.pathname.replace(/^\/|\/$/g, '')]} mode="horizontal">
            <Menu.Item key="home">
                <Icon type="home" />
                Home
            </Menu.Item>
            <Menu.Item key="configuration">
                <Icon type="setting" />
                Configuration
            </Menu.Item>
            <Menu.Item key="addUser">
                <Icon type="user-add" />
                Add New User
            </Menu.Item>
            <Menu.Item key="sandbox">
                <Icon type="code" />
                    Sandbox
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(MenuContainer)