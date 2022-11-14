import { useState } from "react";
import { DIFF_PASS_MSG } from '../utils/constants';
import { fetchData } from '../utils/utils'


const UpdatePasswdForm = (props) => { 

    const [newPasswd, setPasswd] = useState('');
    const [confirmPasswd, setConfirmPasswd] = useState('');
    const updatePasswd = (event) => {
        event.preventDefault();
        if (newPasswd !== confirmPasswd) {
            alert(DIFF_PASS_MSG);
            return;
        }
        fetchData(`/user/update-passwd`, 'PUT', { email: props.email, newPasswd: newPasswd }).then(
            response => {
                if (response.error) {
                    props.methods.errorLayout()
                    return;
                }
                if (response.status === 500) {
                    alert(response.data.msg);
                    return;
                }
                if (response.status === 401) {
                    alert(response.data.msg);
                    return
                }
                //console.log(response);
                alert(response.data.msg)
                props.methods.homeLayout();
            }
        );
    }

    return (
        <div>
            <form onSubmit={e => updatePasswd(e)}>
                <label>
                    Nova Senha:
                    <input type="password" name="passwd" value={newPasswd} onChange={e => setPasswd(e.target.value)} />
                </label>
                <label>
                    Confirmar senha:
                    <input type="password" name="confirPasswd" value={confirmPasswd} onChange={e => setConfirmPasswd(e.target.value)} />
                </label>
                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}

export default UpdatePasswdForm;