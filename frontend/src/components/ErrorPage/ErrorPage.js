import "./ErrorPage.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const ErrorPage = () => {

    return (
        <>
        <div id="error-page-root">
            <div id="error-messages">
                <h1 id="message-404">404</h1>
                <h1 id="page-not-found">PAGE NOT FOUND</h1>
                <br></br>
                <Link to="/" id="return-home-button">return home</Link>
            </div>
        </div>
        </>
    )
};

export default ErrorPage;