import React from "react";
import { Menu, Icon } from 'antd';
import {withRouter} from 'react-router-dom'

const CastSVG = () => (
    <svg width="1em" height="1em" viewBox="0 0 561 561" fill="currentColor">
        <path d="M510,51H51C22.95,51,0,73.95,0,102v76.5h51V102h459v357H331.5v51H510c28.05,0,51-22.95,51-51V102
			C561,73.95,538.05,51,510,51z M0,433.5V510h76.5C76.5,466.65,43.35,433.5,0,433.5z M0,331.5v51c71.4,0,127.5,56.1,127.5,127.5h51
			C178.5,410.55,99.45,331.5,0,331.5z M0,229.5v51c127.5,0,229.5,102,229.5,229.5h51C280.5,354.45,155.55,229.5,0,229.5z"/>
    </svg>
);

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
                <Icon type="user-delete" />
                Add New User
            </Menu.Item>
            <Menu.Item key="removeUser">
                <Icon type="user-add" />
                Remove User
            </Menu.Item>
            <Menu.Item key="sandbox">
                <Icon type="code" />
                Sandbox
            </Menu.Item>
            <Menu.Item key="castsandbox">
                <Icon component={CastSVG} />
                Cast Sandbox
            </Menu.Item>
            <Menu.Item key="about">
                <Icon type="question-circle" />
                About
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(MenuContainer)