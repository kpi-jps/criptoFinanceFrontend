import { useState } from "react";
import { fetchData } from '../utils/utils';
import FormHeader from './FormHeader.js';
import '../css/Forms.css';


const RegisterForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [confirmPasswd, setConfirmPasswd] = useState('');

    const register = (event) => {
        event.preventDefault();
        if (passwd !== confirmPasswd) {
            alert('Senha e confirmação de senha são diferentes!');
            return;
        }
        fetchData('/user/create', 'POST', { name, email, passwd })
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
                //console.log(response);
                alert(response.data.msg)
                props.methods.setLoginLayout()

            });
    }

    return (
        <div className="form-container">
            <FormHeader/>
            <form onSubmit={e => register(e)}>
                <label>
                    Nome:
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Senha:
                    <input type="password" name="passwd" value={passwd} onChange={e => setPasswd(e.target.value)} />
                </label>
                <label>
                    Confirmar senha:
                    <input type="password" name="confirPasswd" value={confirmPasswd} onChange={e => setConfirmPasswd(e.target.value)} />
                </label>
                <input className="btn" type="submit" value="Registrar" />
                <div> Já tem conta? <span className="link" onClick={e => props.methods.setLoginLayout()}> Volte </span> para tela de login!</div>
            </form>
        </div>
    )
}

export default RegisterForm;