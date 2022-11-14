import { useState, useEffect } from "react";


const UpdatePasswdForm = (props) => {
    return (
        <div>
            <form>
                <label>
                    Nova senha:
                    <input type="password" name="passwd" />
                </label>
                <label>
                    Confirmar senha:
                    <input type="password" name="confirm" />
                </label>
                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}

export default UpdatePasswdForm;