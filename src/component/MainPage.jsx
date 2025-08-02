import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import HomeContent from './HomeContent';
import ActivitySquare from './ActivitySquare';
import MyActivity from './MyActivity';
import AccountManager from './AccountManager';
import CreateActivityDialog from './CreateActivityDialog';
import ActDetail from './ActDetail'
import axios from 'axios';

const MainPage = (props) => {
    const id = props.id || localStorage.getItem('id');
    const [username, setUsername] = useState(props.username || localStorage.getItem('username'));
    const [avatarUrl, setAvatarUrl] = useState(`http://127.0.0.1:7001/user/avatar/${id}`);
    const [sideBar, setSideBar] = useState(localStorage.getItem('sideBar') || '');
    const [activities, setActivities] = useState([]);
    const [myRegisterActivies, setMyRegisterActivities] = useState([]);
    const [myParticipateActivities, setMyParticipateAxtivities] = useState([]);
    const [detail, setDetail] = useState(localStorage.getItem('detail') ? JSON.parse(localStorage.getItem('detail')) : []);
    const [showCreateActivityDialog, setShowCreateActivityDialog] = useState(false);
    useEffect(() => {
        const storedAvatarUrl = localStorage.getItem('avatarUrl');
        if(storedAvatarUrl){
            setAvatarUrl(storedAvatarUrl);
        }
    },[avatarUrl])

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
        if (sideBar === 'detail') {
            const storedDetail = localStorage.getItem('detail');
            if (storedDetail) {
                setDetail(JSON.parse(storedDetail));
            }
        }
    }, [sideBar]);

    const updateAvatarUrl = () => {
        const newAvatarUrl = `http://127.0.0.1:7001/user/avatar/${id}?t=${new Date().getTime()}`;
        localStorage.setItem('avatarUrl', newAvatarUrl);
        setAvatarUrl(newAvatarUrl);
    }

    let userData = {username: props.username, avatarUrl: avatarUrl};
    const onUpdate = (updatedData) => {
        axios.put(`http://127.0.0.1:7001/user/${id}`, updatedData).then(response => {
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
    
    const onClickCard = (act) => {
        localStorage.setItem('source', sideBar);
        localStorage.setItem('detail', JSON.stringify(act));
        setDetail(act);
        localStorage.setItem('sideBar', 'detail');
        setSideBar('detail');
    }

    const deleteActivity = (id) => {
        setSideBar(localStorage.getItem('source'));
        const newActivity = myRegisterActivies.filter(item => item.id !== id);
        setMyRegisterActivities(newActivity);
        axios.delete(`http://127.0.0.1:7001/activity/${id}`).then(response => {
            console.log(response.data.message);
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
        })
    }

    const onSubmit = (searchTerm) => {
        const targets = searchTerm
            .split(/[\s,年日月]+/)  // 匹配一个或多个指定分隔符
            .filter(t => t); 
        const newActivities = activities.filter(item => {
            return Object.values(item).some(value => {
                return typeof value === 'string' && targets.some(target => value.includes(target));
            });
        });
        setActivities(newActivities);
    }

    const onCancel = () => {
        getActivities().then(data => {
                setActivities(data);
            });
    }

    const childrenComponent = () => {
        switch(sideBar){
            case 'dashboard':
                return <HomeContent username={username} />;
            case 'activities':{
                return <ActivitySquare 
                    userId={id} 
                    activities={activities} 
                    onClickCard={onClickCard}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    />;
            }
            case 'my-activities':
                return <MyActivity 
                            userId={id} 
                            registerActivities={myRegisterActivies} 
                            participateActivities={myParticipateActivities} 
                            onActivityDeleted={() => getMyRegisterActivities().then(data => setMyRegisterActivities(data))}
                            onClickCard={onClickCard}
                        />;
            case 'account':
                return <AccountManager id={id} userData={userData} onUpdate={onUpdate} />
            case 'detail':
                return <ActDetail 
                    userId={id} 
                    username={username} 
                    activity={detail} 
                    setSideBar={setSideBar} 
                    deleteActivity={deleteActivity}
                />
            default:
                return null;
        }
    }

    const registerActivity = (formData) =>{
        axios.post('http://127.0.0.1:7001/activity', formData).then(response => {
            console.log(response.data.message);
            getMyRegisterActivities().then(data => {
                setMyRegisterActivities(data);
            })
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
    
    return (
        <div>
            <NavBar avatarUrl={avatarUrl} />
            <SideBar activeMenu={sideBar} 
                setActiveMenu={(id) => {
                    localStorage.setItem('sideBar', id);
                    setSideBar(id);
                }}
                setShowCreateActivityDialog={setShowCreateActivityDialog} 
            />
            {childrenComponent()}
            {showCreateActivityDialog &&(<CreateActivityDialog hostId={id} cancel={() => setShowCreateActivityDialog(false)} confirm={registerActivity} />)}
        </div>
    )
}

export default MainPage