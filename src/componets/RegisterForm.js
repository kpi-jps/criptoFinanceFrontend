import { useState } from "react";
import { fetchData } from '../utils/utils.js';

const RegisterForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const register = (event) => {
        event.preventDefault();
        fetchData('/user/create', 'POST', {name, email, passwd})
        .then((response) => {
          console.log(response);
          props.setLayoutMethods.setLoginLayout()
          
        });
    }

    return (
            <form onSubmit={e => register(e)}>
                 <label>
                    Nome:
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    Senha:
                    <input type="password" name="passwd" value={passwd} onChange={e => setPasswd(e.target.value)}/>
                </label>
                <input type="submit" value="Registrar"/>
                <div> <span onClick={e => props.setLayoutMethods.setLoginLayout()}> Ir </span> para tela de login</div>
            </form>
    )
}

export default RegisterForm;