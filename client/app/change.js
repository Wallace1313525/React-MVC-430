

const handleNewPass = (e) => {
    e.preventDefault();
    $("#contactMessage").animate({width:'hide'},350);
    
    if($("#oldpass").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("RING! All field required");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("RING! Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
    return false;
    
}


const ChangePassWindow = (props) => {
    return(
    <form id="changePassForm" name="changePassForm"
        onSubmit={handleNewPass}
        action="/changePass"
        method="POST"
        className="mainForm"
    >
    <h3>Change your password</h3>
    <label htmlFor="oldpass">Old password: </label>
    <input id="oldPass" type="text" name="oldPass" placeholder="old password"/>
    <label htmlFor="pass">New Password: </label>
    <input id="pass" type="password" name="pass" placeholder="new password"/>
    <label htmlFor="pass2">Retype New Password: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype password"/>          
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="formSubmit" type="submit" value="Change"/>
    
    </form>
    
    );
};

const createChangeWindow = (csrf) => {
    ReactDOM.render(
    <ChangePassWindow csrf={csrf}/>,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    createChangeWindow(csrf);

};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
})