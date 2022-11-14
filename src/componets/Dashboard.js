import { useState, useEffect } from "react";
import { fetchData } from '../utils/utils.js'
import UpdateNameForm from './UpdateNameForm.js'
import UpdatePasswdForm from './UpdatePasswdForm.js'
import AddCriptoRegisterForm from './AddCriptoRegisterForm.js'
import Home from './Home.js'

const Dashboard = (props) => {
    const id  = props.userInfo.userId;
    const [name, setName] = useState(props.userInfo.userName);
    const [dashboadLayout, setDashboardLayout] = useState({ editNameLayout: false, editPasswdLayout: false, addCriptoRegisterLayout: false });
    const [criptoRegisters, setCriptoRegisters] = useState([]);

    
    const editNameLayout = () => {
        setDashboardLayout({ editNameLayout: true, editPasswdLayout: false, addCriptoRegisterLayout: false });
    }

    const editPasswdLayout = () => {
        setDashboardLayout({ editNameLayout: false, editPasswdLayout: true, addCriptoRegisterLayout: false });
    }

    const addCriptoRegisterLayout = () => {
        setDashboardLayout({ editNameLayout: false, editPasswdLayout: false, addCriptoRegisterLayout: true });
    }

    const homeLayout = () => {
        setDashboardLayout({ editNameLayout: false, editPasswdLayout: false, addCriptoRegisterLayout: false });
    }

    const getCriptoRegister = async () => {
        const registerList = await fetchData(`/crypto/getAll/${id}`, 'GET', {});
    }

    const dashboadCtrlMethods = {
        setName,
        setCriptoRegisters,
        editNameLayout, 
        editPasswdLayout, 
        addCriptoRegisterLayout, 
        homeLayout
    };

    useEffect(() => {
        fetchData(`/crypto/getAll/${id}`, 'GET', {}).then(
            result => {
                console.log(result);
                setCriptoRegisters(result.data);
                //console.log(criptoRegisters);
            }
        )
        
    }, []);


    const logout = () => {
        console.log('logout')
        fetchData('/user/logout', 'GET', {})
            .then((response) => {
                console.log(response);
                props.setLayoutMethods.setLoginLayout();
            });
    }
    return (
        <div>
            <div id="header"> Usuário #{id} - Nome: {name}</div>
            <ul id="ctrls">
                <li onClick={e => homeLayout()}>Home</li>
                <li onClick={e => editNameLayout()}>Editar nome do usuário</li>
                <li onClick={e => editPasswdLayout()}>Editar senha do usuário </li>
                <li onClick={e => addCriptoRegisterLayout()}>Adicionar cripto registro</li>
                <li onClick={e => logout()}>Sair</li>
            </ul>

            { dashboadLayout.editNameLayout && <UpdateNameForm name={name}/> }
            { dashboadLayout.editPasswdLayout && <UpdatePasswdForm/> }
            { dashboadLayout.addCriptoRegisterLayout && <AddCriptoRegisterForm/> }
            {   !dashboadLayout.editNameLayout && 
                !dashboadLayout.editPasswdLayout && 
                !dashboadLayout.addCriptoRegisterLayout && 
                <Home criptoRegisters={criptoRegisters}/> 
            }

            
        </div>
    )
};

export default Dashboard;