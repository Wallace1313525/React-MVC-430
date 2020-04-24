const customizeWindow = (props) => {
    return(
        <div>
            <p>customize</p>
            <input type="hidden" name="_csrf" value={props.csrf} />
        </div>
    );
};


const infoWindow = (props) => {
    return(
        <div>
            <h3>Want Premium?</h3>       
            <label htmlFor="namecard">Cardholder Name: </label>
            <input id="namecard" type="text" name="namecard" placeholder="Jane Doe"/>
            <label htmlFor="expdate">Expiration Date: </label>
            <input id="expdate" type="month" name="expdate" min="2020-03" value="2020-03"/>
            <label htmlFor="code">Security code: </label>
            <input id="code" type="text" name="code" placeholder="XXX"/> 
            <input className="formSubmit" type="submit" value="Premium"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
        </div>
    );
};

const createCustomizeWindow = (csrf) => {
    ReactDOM.render(
    <customizeWindow csrf={csrf}/>,
        document.querySelector("#content")
    );
};

const createInfoWindow = (csrf) => {
    ReactDOM.render(
    <infoWindow csrf={csrf}/>,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const actButton = document.querySelector("#actButton");
    const deactButton = document.querySelector("#deactButton");
    
    actButton.addEventListener("click", (e) =>{
        e.preventDefault();
        createCustomizeWindow(csrf);
        return false;
        
    });
    
    deactButton.addEventListener("click", (e) =>{
        e.preventDefault();
        createInfoWindow(csrf);
        return false;
        
    });
    
    createInfoWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
})