import { useState } from "react";
import { fetchData } from '../utils/utils.js';
import FormHeader from './FormHeader.js';
import '../css/Forms.css';



const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const login = (event) => {
        event.preventDefault();
        fetchData('/user/login', 'POST', {email : email, passwd : passwd})
        .then((response) => {
            if(response.error) {
                props.methods.setErrorLayout();
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
            //console.log(response)
            props.methods.setUserInfo(
                {   userId: response.data.userId, 
                    userName: response.data.userName, 
                    userEmail : response.data.userEmail
                }
            );
            props.methods.setDashboardLayout();
        });
    }

    return (
            <div className="form-container">
                <FormHeader/>
                <form onSubmit={e => login(e)}>
                    <label>
                        Email:
                        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        Senha:
                        <input type="password" name="passwd" value={passwd} onChange={e => setPasswd(e.target.value)}/>
                    </label>
                    <input className="btn" type="submit" value="Entrar"/>
                    <div className="info-footer"> Não tem cadastro? <span className="link" onClick={e => props.methods.setRegisterLayout()}>Crie</span> uma conta</div>
                </form>
            </div>
            
    )
}

export default LoginForm;