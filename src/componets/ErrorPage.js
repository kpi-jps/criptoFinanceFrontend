import DashboardHeader from "./DashboarHeader";
import '../css/ErrorPage.css'
const ErrorPage = (props) => {

    return (
        <>
            <DashboardHeader/>
            <div id="error-container">
                <h1>Erro de conexão</h1>
                <h4>Sem conexão com o servidor</h4>
                
            </div>
        </>
        
    )
}

export default ErrorPage;