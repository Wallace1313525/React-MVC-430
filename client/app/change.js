
const handleSignup = (e) => {
    e.preventDefault();
    $("#contactMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("RING! All field required");
        return false;
    }
    
    if($("#pass").val() !== $("#pass2").val()){
        handleError("RING! Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    return false;
    
}


const SignupWindow = (props) => {
    return(
    <form id="signupForm" name="signupForm"
        onSubmit={handleSignup}
        action="/changePass"
        method="POST"
        className="mainForm"
    >
    <h3>Change your password</h3>
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username"/>
    <label htmlFor="pass">Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password"/>
    <label htmlFor="pass2">Password: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype password"/>          
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="formSubmit" type="submit" value="Sign up"/>
    
    </form>
    
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
    <SignupWindow csrf={csrf}/>,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    createSignupWindow(csrf);

};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
})