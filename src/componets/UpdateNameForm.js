import { useState, useEffect } from "react";

const UpdateNameForm = (props) => {
    const [name, setName] = useState(props.name)
    return (
        <div>
            <form onSubmit={e => { }}>
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