import React, {useEffect, useState} from "react";
import {message, Select, Button, Popconfirm} from "antd";
import {get, post} from '~/helpers/api';

import * as Styles from './styles';


function RemoveUser(){
    const [users, setUsers] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userToDelete, setToDelete] = useState(null);

    useEffect(() => {
        getUsers();
    },[]);

    async function getUsers() {
        try {
            const resp = await get({}, 'users');
            setUsers(resp.data.users);
            setLoading(false)
        } catch (e) {
            message.error(e.message);
        }
    }

    function onChange(i) {
        setToDelete(i)
    }

    async function deleteUser() {
        try {
            await post({name: userToDelete}, 'deleteUser');
            message.success(`User ${userToDelete} has been removed`);
            getUsers();
        } catch (e) {
            message.error(e.message);
        }
    }

    if(loading) return null;

    return (
        <Styles.Container>
            <Styles.Item>
                <Select
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    onChange={onChange}
                >
                    {users.map(u => {
                        return <Select.Option value={u}>{u}</Select.Option>
                    })}
                </Select>
            </Styles.Item>
            <Styles.Item>
                <Popconfirm
                    title="Are you sure delete this user?"
                    onConfirm={deleteUser}
                    okText="Yes"
                    cancelText="No">
                    <Button type="danger">Remove User</Button>
                </Popconfirm>
            </Styles.Item>
        </Styles.Container>
    )
}



export default RemoveUser;