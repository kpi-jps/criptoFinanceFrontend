import { useState, useEffect } from "react";
import { fetchData } from '../utils/utils'
import DashboardHeader from "./DashboarHeader";
import UpdateNameForm from './UpdateNameForm'
import UpdatePasswdForm from './UpdatePasswdForm'
import AddCriptoRegisterForm from './AddCriptoRegisterForm'
import ErroPage from './ErrorPage.js'
import Home from './Home.js'
import '../css/Dashboard.css'

const Dashboard = (props) => {
    const userId = props.userInfo.userId;
    const email = props.userInfo.userEmail;
    const [name, setName] = useState(props.userInfo.userName);
    const [dashboadLayout, setDashboardLayout] = useState(
        {
            editNameLayout: false,
            editPasswdLayout: false,
            addCriptoRegisterLayout: false,
            errorLayout: false
        }
    );
    const [criptoRegisters, setCriptoRegisters] = useState([]);


    const editNameLayout = () => {
        setDashboardLayout(
            {
                editNameLayout: true,
                editPasswdLayout: false,
                addCriptoRegisterLayout: false,
                errorLayout: false
            }
        );
    }

    const editPasswdLayout = () => {
        setDashboardLayout(
            {
                editNameLayout: false,
                editPasswdLayout: true,
                addCriptoRegisterLayout: false,
                errorLayout: false
            }
        );
    }

    const addCriptoRegisterLayout = () => {
        setDashboardLayout(
            {
                editNameLayout: false,
                editPasswdLayout: false,
                addCriptoRegisterLayout: true,
                errorLayout: false
            }
        );
    }

    const homeLayout = () => {
        setDashboardLayout(
            {
                editNameLayout: false,
                editPasswdLayout: false,
                addCriptoRegisterLayout: false,
                errorLayout: false
            }
        );
    }

    const errorLayout = () => {
        setDashboardLayout(
            {
                editNameLayout: false,
                editPasswdLayout: false,
                addCriptoRegisterLayout: false,
                errorLayout: true
            }
        );
    }

    const updateCriptoRegisterList = () => {
        fetchData(`/crypto/getAll/${userId}`, 'GET', {}).then(
            response => {
                //console.log(response);
                if (response.error) {
                    errorLayout();
                    return;
                }
                if (response.status === 500) {
                    alert(response.data.msg);
                    return;
                }
                if (response.status === 401) {
                    alert(response.data.msg);
                    window.location.reload();
                    return
                }
                setCriptoRegisters(response.data);

            }
        )
    }

    useEffect(() => { 
        updateCriptoRegisterList() ;
    }, []);


    const logout = () => {
        console.log('logout')
        fetchData('/user/logout', 'GET', {})
            .then((response) => {
                console.log(response);
                props.methods.setLoginLayout();
            });
    }
    return (
        dashboadLayout.errorLayout ? <ErroPage content={'content'} /> :
            <>
                <DashboardHeader/>
                <nav id="ctrls">
                    <ul id="left-ctrls">
                        <li className="link" onClick={e => homeLayout()}>Home</li>
                        <li className="link" onClick={e => editNameLayout()}>Editar nome do usuário</li>
                        <li className="link" onClick={e => editPasswdLayout()}>Editar senha do usuário </li>
                        <li className="link" onClick={e => addCriptoRegisterLayout()}>Adicionar cripto registro</li>
                    </ul>
                    <ul id="right-ctrls">    
                        <li className="link" onClick={e => logout()}>Sair</li>
                    </ul>
                </nav>
                <div id="user-info"> <b>Usuário #{userId}</b> - <b>Email :</b> {email} - <b>Nome:</b> {name}</div>
                <div id="dashboard-container">
                    {dashboadLayout.editNameLayout && <UpdateNameForm name={name} email={email} methods={{ homeLayout, setName, errorLayout }} />}
                    {dashboadLayout.editPasswdLayout && <UpdatePasswdForm email={email} methods={{ homeLayout, errorLayout }} />}
                    {dashboadLayout.addCriptoRegisterLayout && <AddCriptoRegisterForm userId={userId} methods={{ homeLayout, updateCriptoRegisterList, errorLayout }} />}
                    {!dashboadLayout.editNameLayout &&
                        !dashboadLayout.editPasswdLayout &&
                        !dashboadLayout.addCriptoRegisterLayout &&
                        <Home userId={userId} criptoRegisters={criptoRegisters} methods={{ updateCriptoRegisterList, errorLayout }}/>
                    }

                </div>
            </>
    )
};

export default Dashboard;