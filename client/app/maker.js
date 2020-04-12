const handleDomo = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'}, 350);
    
    if($("#domoName").val() == '' || $("#domoNum").val() =='' || $("#domoRel").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
        loadDomosFromServer();
    });
    
    return false;
};

const DomoForm = (props) => {
    return(
    <form id="domoForm"
        onSubmit={handleDomo}
        name = "domoForm"
        action="/maker"
        method="POST"
        className="domoForm"
    >
        <label htmlFor="name">Name: </label>
        <input id="domoName" type="text" name="name" placeholder="Name"/>
        
        <label htmlFor="num">Number: </label>
        <input id="domoNum" type="text" name="num" placeholder="Number"/>
        
        <label htmlFor="rel">Relationship: </label>
        <input id="domoRel" type="text" name="rel" placeholder="Relatioship"/>
        
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeDomoSubmit" type="submit" value="Make Contact"/>
        </form>
    );
};

const DomoList = function(props) {
    if(props.domos.length === 0){
        return(
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo){
        return(
        <div key={domo.id} className="domo">
            <img src="../../hosted/img/domoface.jpeg" alt="domo face" className="domoFace"/>
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Number: {domo.num}</h3>
                <h3 className="domoName">Relationship: {domo.rel}</h3>
        </div>
        );
    });
    
    return(
    <div className="domoList">
        {domoNodes}
        </div>
    );
};


const loadDomosFromServer = () =>{
    sendAjax('GET', '/getDomos', null, (data) =>{
        ReactDOM.render(
        <DomoList domos={data.domos} />, document.querySelector("#domos")
            );
    });
};

const setupDom = function(csrf){
    ReactDOM.render(
    <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );
    
    ReactDOM.render(
    <DomoList domos={[]} />, document.querySelector("#domos")
    );
    
    loadDomosFromServer();
};

const passWindow = (props) => {
    return(
    <form id="signupForm" name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
        className="mainForm"
    >
        
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

const createPassWindow = (csrf) => {
    ReactDOM.render(
    <passWindow csrf={csrf}/>,
        document.querySelector("#content")
    );
};



const setup = (csrf) => {
    const backButton = document.querySelector("#backButton");
    const passButton = document.querySelector("#passButton");
    
    backButton.addEventListener("click", (e) =>{
        e.preventDefault();
        setupDom(csrf);
        return false;
        
    });
    
    passButton.addEventListener("click", (e) =>{
        e.preventDefault();
        createPassWindow(csrf);
        return false;
        
    });
    
    setupDom(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});









