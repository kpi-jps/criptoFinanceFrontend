import { useState, useEffect } from "react";
import { fetchData } from '../utils/utils'

import UpdateNameForm from './UpdateNameForm'
import UpdatePasswdForm from './UpdatePasswdForm'
import AddCriptoRegisterForm from './AddCriptoRegisterForm'
import ErroPage from './ErrorPage.js'
import Home from './Home.js'

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

    const getCriptoRegister = async () => {
        const registerList = await fetchData(`/crypto/getAll/${userId}`, 'GET', {});
    }

    useEffect(() => {
        fetchData(`/crypto/getAll/${userId}`, 'GET', {}).then(
            response => {
                //console.log(response);
                if(response.error) {
                    errorLayout();
                    return;
                }
                setCriptoRegisters(response.data);
                console.log(criptoRegisters);
            }
        )

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
            <div>
                <div id="header"> Usuário #{userId} Email : {email} - Nome: {name}</div>
                <ul id="ctrls">
                    <li onClick={e => homeLayout()}>Home</li>
                    <li onClick={e => editNameLayout()}>Editar nome do usuário</li>
                    <li onClick={e => editPasswdLayout()}>Editar senha do usuário </li>
                    <li onClick={e => addCriptoRegisterLayout()}>Adicionar cripto registro</li>
                    <li onClick={e => logout()}>Sair</li>
                </ul>

                {dashboadLayout.editNameLayout && <UpdateNameForm name={name} email={email} methods={{ homeLayout, setName, errorLayout }} />}
                {dashboadLayout.editPasswdLayout && <UpdatePasswdForm  email={email} methods={{ homeLayout, errorLayout }} />}
                {dashboadLayout.addCriptoRegisterLayout && <AddCriptoRegisterForm userid = {userId} methods={{ homeLayout, setCriptoRegisters, errorLayout }} />}
                {!dashboadLayout.editNameLayout &&
                    !dashboadLayout.editPasswdLayout &&
                    !dashboadLayout.addCriptoRegisterLayout &&
                    <Home criptoRegisters={criptoRegisters} />
                }

            </div>
    )
};

export default Dashboard;