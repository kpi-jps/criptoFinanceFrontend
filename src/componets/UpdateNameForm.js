import { useState, useEffect } from "react";
import { fetchData } from '../utils/utils.js'

const UpdateNameForm = (props) => {
    const [name, setName] = useState(props.name)

    const updateName = (event) => {
        event.preventDefault();
        fetchData(`/user/update-name`, 'PUT', {newName: name, email: props.email}).then(
            result => {
                if(result.error) {
                    props.methods.erroLayout()
                    return;
                }
                console.log(result);
                props.methods.setName(name);
                props.methods.homeLayout();
            }
        );
    }
    

    return (
        <div>
            <form onSubmit={e => { updateName(e) }}>
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