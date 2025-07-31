import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import HomeContent from './HomeContent';
import ActivitySquare from './ActivitySquare';
import MyActivity from './MyActivity';
import AccountManager from './AccountManager';
import CreateActivityDialog from './CreateActivityDialog'
import axios from 'axios';

const MainPage = (props) => {
    const [id, setId] = useState(props.id || localStorage.getItem('id'));
    const [username, setUsername] = useState(props.username || localStorage.getItem('username'));
    const [avatarUrl, setAvatarUrl] = useState(`http://127.0.0.1:7001/user/avatar/${id}`);
    const [sideBar, setSideBar] = useState('');
    const [activities, setActivities] = useState([]);
    const [myRegisterActivies, setMyRegisterActivities] = useState([]);
    const [myParticipateActivities, setMyParticipateAxtivities] = useState([]);
    const [showCreateActivityDialog, setShowCreateActivityDialog] = useState(false);
    useEffect(() => {
        const storedAvatarUrl = localStorage.getItem('avatarUrl');
        if(storedAvatarUrl){
            setAvatarUrl(storedAvatarUrl);
        }
    })

    useEffect(() => {
        if (sideBar === 'activities') {
            getActivities().then(data => {
                setActivities(data);
            });
        }
        if (sideBar === 'my-activities') {
            getMyRegisterActivities().then(data => {
                setMyRegisterActivities(data);
            })
            getMyParticipateActivities().then(data => {
                setMyParticipateAxtivities(data);
            })
        }
    }, [sideBar]);

    const updateAvatarUrl = () => {
        const newAvatarUrl = `http://127.0.0.1:7001/user/avatar/${id}?t=${new Date().getTime()}`;
        localStorage.setItem('avatarUrl', newAvatarUrl);
        setAvatarUrl(newAvatarUrl);
    }

    let userData = {username: props.username, avatarUrl: avatarUrl};
    const onUpdate = (updatedData) => {
        axios.post(`http://127.0.0.1:7001/user/modification/${id}`, updatedData).then(response => {
            if(!response.data.success){
                alert(response.data.message);
            }
            else{
                if(updatedData.username){
                    localStorage.setItem('username', updatedData.username);
                    props.setUsername(updatedData.username);
                    setUsername(updatedData.username);
                }
                if(updatedData.avatarUrl){
                    updateAvatarUrl();
                }
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

    const getActivities = () => {
        return axios.get(`http://127.0.0.1:7001/activity/all/${id}`).then(response => {
            return response.data.data.activities;
        }).catch(error => {
            if(error.response){
                console.log(error.response.data.message);
            }
            else if(error.request){
                console.log('请求未响应');
            }
            else{
                console.log('请求失败');
            }
            return [];
        })
    }

    const getMyRegisterActivities = () => {
        return axios.get(`http://127.0.0.1:7001/activity/register/${id}`).then(response => {
            return response.data.data.activities;
        }).catch(error => {
            if(error.response){
                console.log(error.response.data.message);
            }
            else if(error.request){
                console.log('请求未响应');
            }
            else{
                console.log('请求失败');
            }
            return [];
        })
    }

    const getMyParticipateActivities = () => {
        return axios.get(`http://127.0.0.1:7001/activity/participate/${id}`).then(response => {
            return response.data.data.activities;
        }).catch(error => {
            if(error.response){
                console.log(error.response.data.message);
            }
            else if(error.request){
                console.log('请求未响应');
            }
            else{
                console.log('请求失败');
            }
            return [];
        })
    }
    const childrenComponent = () => {
        switch(sideBar){
            case 'dashboard':
                return <HomeContent username={username} />;
            case 'activities':{
                return <ActivitySquare userId={id} activities={activities} />;
            }
            case 'my-activities':
                return <MyActivity 
                            userId={id} 
                            registerActivities={myRegisterActivies} 
                            participateActivities={myParticipateActivities} 
                            onActivityDeleted={() => getMyRegisterActivities().then(data => setMyRegisterActivities(data))}
                        />;
            case 'account':
                return <AccountManager id={id} userData={userData} onUpdate={onUpdate} />
            default:
                return null;
        }
    }

    const registerActivity = (formData) =>{
        axios.post('http://127.0.0.1:7001/activity/register', formData).then(response => {
            console.log(response.data.message);
            setShowCreateActivityDialog(false);
        }).catch(error => {
            if(error.response){
                alert(error.response.data.message);
            }
            else{
                alert('创建失败');
                if(error.request){
                    console.log('服务器未响应');
                }
                else{
                    console.log('请求失败');
                }
            }
        })
    }
    const test = (e) => {
        console.log(e);
    }
    return (
        <div>
            <NavBar avatarUrl={avatarUrl} />
            <SideBar activeMenu={sideBar} setActiveMenu={setSideBar} setShowCreateActivityDialog={setShowCreateActivityDialog} />
            {childrenComponent()}
            {showCreateActivityDialog &&(<CreateActivityDialog hostId={id} cancel={() => setShowCreateActivityDialog(false)} confirm={registerActivity} />)}
        </div>
    )
}

export default MainPage