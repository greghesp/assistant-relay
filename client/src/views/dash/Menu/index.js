import React, {useState} from "react";
import { Menu, Icon } from 'antd';


function MenuContainer() {
    const [current, setCurrent] = useState('home');

    function handleClick() {

    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home">
                <Icon type="home" />
                Home
            </Menu.Item>
            <Menu.Item key="addUser">
                <Icon type="user-add" />
                Add New User
            </Menu.Item>
            <Menu.Item key="Test">
                <Icon type="code" />
                    Sandbox

            </Menu.Item>
        </Menu>
    )
}

export default MenuContainer