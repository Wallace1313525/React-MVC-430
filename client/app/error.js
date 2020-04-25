
const errorWindow = (props) => {
    return(
        <div>
        <p>Page Doesn't Exist</p>
        </div>
    
    );
};

const createErrorWindow = (csrf) => {
    ReactDOM.render(
    <errorWindow csrf={csrf}/>,
        document.querySelector("#content")
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