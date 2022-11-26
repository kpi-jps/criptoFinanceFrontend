import { useState } from "react";
import { fetchData } from '../utils/utils'

const UpdateNameForm = (props) => {
    const [name, setName] = useState(props.name)

    const updateName = (event) => {
        event.preventDefault();
        fetchData(`/user/update-name`, 'PUT', {email: props.email, newName: name,}).then(
            response => {
                if(response.error) {
                    props.methods.errorLayout()
                    return;
                }
                if(response.status === 500) {
                    alert(response.data.msg);
                    return;
                }
                if(response.status === 401) {
                    alert(response.data.msg);
                    window.location.reload();
                    return
                }
                //console.log(response);
                alert(response.data.msg)
                props.methods.setName(name);
                props.methods.homeLayout();
            }
        );
    }
    

    return (
        <div>
            <form onSubmit={e => updateName(e) }>
                <label>
                    Nome:
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}

export default UpdateNameForm;