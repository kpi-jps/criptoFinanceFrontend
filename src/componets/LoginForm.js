import { useState } from "react";
import { fetchData } from '../utils/utils.js';


const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const login = (event) => {
        event.preventDefault();
        fetchData('/user/login', 'POST', {email : email, passwd : passwd})
        .then((response) => {
            if(response.error) {
                props.setErrorLayout();
                return;
            }
            if(response.status === 500) {
                alert(response.data.msg);
                return;
            }
            if(response.status === 401) {
                alert(response.data.msg);
                return
            }
            console.log(response)
            props.setUserInfo({userId: response.data.userId, userName: response.data.userName});
            props.setLayoutMethods.setDashboardLayout();
        });
    }

    return (
            <form onSubmit={e => login(e)}>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    Senha:
                    <input type="password" name="passwd" value={passwd} onChange={e => setPasswd(e.target.value)}/>
                </label>
                <input type="submit" value="Entrar"/>
                <div> Não tem cadastro? <span onClick={e => props.setLayoutMethods.setRegisterLayout()}>crie</span> uma conta</div>
            </form>
    )
}

export default LoginForm;