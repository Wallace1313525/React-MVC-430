const handleDomo = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'}, 350);
    
    if($("#domoName").val() == '' || $("#domoNum").val() =='' || $("#domoRel").val() == ''){
        handleError("RING! All fields are required");
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
        <input id="domoRel" type="text" name="rel" placeholder="Relationship"/>
        
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
                <h3 className="domoName">Name: <span id="data">{domo.name}</span></h3>
                <h3 className="domoNum">Number: <span id="data">{domo.num}</span></h3>
                <h3 className="domoRel">Relationship: <span id="data">{domo.rel}</span></h3>
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

const setup = function(csrf){
    ReactDOM.render(
    <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );
    
    ReactDOM.render(
    <DomoList domos={[]} />, document.querySelector("#domos")
    );
    
    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});









