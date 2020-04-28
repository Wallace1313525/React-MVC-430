
//create form and send data to contact.js
const handleContact = (e) => {
    e.preventDefault();
    
    $("#contactMessage").animate({width:'hide'}, 350);
    
    if($("#contactName").val() == '' || $("#contactNum").val() =='' || $("#contactRel").val() == ''){
        handleError("RING! All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#contactForm").attr("action"), $("#contactForm").serialize(), function(){
        loadContactsFromServer();
    });
    
    return false;
};

const ContactForm = (props) => {
    return(
        
        
    <form id="contactForm"
        onSubmit={handleContact}
        name = "contactForm"
        action="/maker"
        method="POST"
        className="contactForm"
    >
        <label htmlFor="name">Name: </label>
        <input id="contactName" type="text" name="name" placeholder="Name"/>
        
        
        <label htmlFor="num">Number: </label>
        <input id="contactNum" type="text" name="num" placeholder="Number"/>
        
        <label htmlFor="rel">Relationship: </label>
        <input id="contactRel" type="text" name="rel" placeholder="Relationship"/>
        
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeContactSubmit" type="submit" value="Make Contact"/>
        </form>
    );
};

const ContactList = function(props) {
    if(props.contacts.length === 0){
        return(
            <div className="contactList">
                <h3 className="emptyContact">No Contacts yet</h3>
            </div>
        );
    }

    const contactNodes = props.contacts.map(function(contact){
        return(
        <div key={contact.id} className="contact">
            <img src="/assets/img/face.png" alt="contact face" className="contactFace"/>
            <img src="/assets/img/callme.png" alt="contactme" className="contactRing"/>
                <h3 className="contactName">Name: <span id="data">{contact.name}</span></h3>
                <h3 className="contactNum">Number: <span id="data">{contact.num}</span></h3>
                <h3 className="contactRel">Relationship: <span id="data">{contact.rel}</span></h3>
        </div>
        );
    });
    
    return(
    <div className="contactList">
        <h3>Your Contacts</h3>
        {contactNodes}
        </div>
    );
};


const loadContactsFromServer = () =>{
    sendAjax('GET', '/getContacts', null, (data) =>{
        ReactDOM.render(
        <ContactList contacts={data.contacts} />, document.querySelector("#contacts")
            );
    });
};

const setup = function(csrf){
    ReactDOM.render(
    <ContactForm csrf={csrf} />, document.querySelector("#makeContact")
    );
    
    ReactDOM.render(
    <ContactList contacts={[]} />, document.querySelector("#contacts")
    );
    
    loadContactsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});









