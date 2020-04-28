//render error window
const ErrorWindow = (props) => {
    return(
        <div>
        <h3>IF YOU ARE COMING HERE FROM CHANGING YOUR PASSWORD PAGE</h3>
        <p>Your password has successfully changed.  Just hit the go back button in the top left.</p>
        <h3 id="errortxt">Page Does Not Exist</h3>
        <img src="/assets/img/sadphone2.png" alt="error" className="errorimg"/>
        </div>
    
    );
};

const createErrorWindow = (csrf) => {
    ReactDOM.render(
    <ErrorWindow csrf={csrf} />, document.querySelector("#content")
    );
};

const setup = (csrf) => {
    createErrorWindow(csrf);

};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
})