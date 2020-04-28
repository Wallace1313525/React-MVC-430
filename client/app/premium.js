//create premium pages.  Activate/deactivate premium based off button presses
const CustomizeWindow = (props) => {
    return(
        <div id="infoStyle">
            <h3>Thanks for purchasing Premium!</h3>
            <h3>New features coming soon...</h3>
            
            <input type="hidden" name="_csrf" value={props.csrf} />
        </div>
    );
};


const InfoWindow = (props) => {
    return(
        <div id="infoStyle">
            <h3>Want Premium?</h3>
            <p>Now only 9 dollars!</p>
            <label htmlFor="namecard">Cardholder Name: </label>
            <input id="namecard" type="text" name="namecard" placeholder="Jane Doe"/>
            <label htmlFor="cardnum">Credit Card Number: </label>
            <input id="cardnum" type="text" name="cardnum" placeholder="XXXX-XXXX-XXXX-XXXX"/>
            <label htmlFor="expdate">Expiration Date: </label>
            <input id="expdate" type="month" name="expdate" min="2020-03" value="2020-03"/>
            <label htmlFor="code">Security code: </label>
            <input id="code" type="text" name="code" placeholder="XXX"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
        </div>
    );
};

const CreateCustomizeWindow = (csrf) => {
    ReactDOM.render(
    <CustomizeWindow csrf={csrf} />, document.querySelector("#content")
    );
};

const CreateInfoWindow = (csrf) => {
    ReactDOM.render(
    <InfoWindow csrf={csrf} />, document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const actButton = document.querySelector("#actButton");
    const deactButton = document.querySelector("#deactButton");
    
    actButton.addEventListener("click", (e) =>{
        e.preventDefault();
        CreateCustomizeWindow(csrf);
        return false;
        
    });
    
    deactButton.addEventListener("click", (e) =>{
        e.preventDefault();
        CreateInfoWindow(csrf);
        return false;
        
    });
    
    CreateInfoWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
})