import { useState, useEffect } from "react";

const AddCriptoRegisterForm = (props) => {

    return (
        <div>
            <form>
                <label>
                    Ticker
                    <input type="type" name="ticker" />
                </label>
                <label>
                    Quantidade:
                    <input type="text" name="quantity" />
                </label>
                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}

export default AddCriptoRegisterForm;