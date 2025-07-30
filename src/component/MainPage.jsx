import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import HomeContent from './HomeContent';
import ActivitySquare from './ActivitySquare';
import MyActivity from './MyActivity';
import AccountManager from './AccountManager';
import axios from 'axios';

const MainPage = (props) => {
    const [avatarUrl, setAvatarUrl] = useState(`http://127.0.0.1:7001/user/avatar/${props.id}`);
    const [sideBar, setSideBar] = useState('');
    useEffect(() => {
        const storedAvatarUrl = localStorage.getItem('avatarUrl');
        if(storedAvatarUrl){
            setAvatarUrl(storedAvatarUrl);
        }
    })

    const updateAvatarUrl = () => {
        const newAvatarUrl = `http://127.0.0.1:7001/user/avatar/${props.id}?t=${new Date().getTime()}`;
        localStorage.setItem('avatarUrl', newAvatarUrl);
        setAvatarUrl(newAvatarUrl);
    }
    let userData = {username: props.username, avatarUrl: avatarUrl};
    const onUpdate = async(updatedData) => {
        axios.post(`http://127.0.0.1:7001/user/modification/${props.id}`, updatedData).then(response => {
            if(!response.data.success){
                alert(response.data.message);
            }
            else{
                if(updatedData.username){
                    localStorage.setItem('username', updatedData.username);
                    props.setUsername(updatedData.username);
                }
                updateAvatarUrl();
            }
        }).catch(error => {
            if(error.response){
                console.log(error.response.data.message);
            }
            else if(error.request){
                console.log('服务器无响应');
            }
            else{
                console.log('请求错误');
            }
        })
    }
    const childrenComponent = () => {
        switch(sideBar){
            case 'dashboard':
                return <HomeContent username={props.username} />;
            case 'activities':
                return <ActivitySquare />;
            case 'my-activities':
                return <MyActivity />;
            case 'account':
                return <AccountManager id={props.id} userData={userData} onUpdate={onUpdate} />
            default:
                return null;
        }
    }
    return (
        <div>
            <NavBar avatarUrl={avatarUrl} />
            <SideBar activeMenu={sideBar} setActiveMenu={setSideBar} />
            {childrenComponent()}
        </div>
    )
}

export default MainPage