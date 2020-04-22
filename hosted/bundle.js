"use strict";

var handleContact = function handleContact(e) {
  e.preventDefault();
  $("#contactMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#contactName").val() == '' || $("#contactNum").val() == '' || $("#contactRel").val() == '') {
    handleError("RING! All fields are required");
    return false;
  }

  sendAjax('POST', $("#contactForm").attr("action"), $("#contactForm").serialize(), function () {
    loadContactsFromServer();
  });
  return false;
};

var ContactForm = function ContactForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "contactForm",
      onSubmit: handleContact,
      name: "contactForm",
      action: "/maker",
      method: "POST",
      className: "contactForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "contactName",
      type: "text",
      name: "name",
      placeholder: "Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "num"
    }, "Number: "), /*#__PURE__*/React.createElement("input", {
      id: "contactNum",
      type: "text",
      name: "num",
      placeholder: "Number"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "rel"
    }, "Relationship: "), /*#__PURE__*/React.createElement("input", {
      id: "contactRel",
      type: "text",
      name: "rel",
      placeholder: "Relationship"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeContactSubmit",
      type: "submit",
      value: "Make Contact"
    }))
  );
};

var ContactList = function ContactList(props) {
  if (props.contacts.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "contactList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyContact"
      }, "No contacts yet"))
    );
  }

  var contactNodes = props.contacts.map(function (contact) {
    return (/*#__PURE__*/React.createElement("div", {
        key: contact.id,
        className: "contact"
      }, /*#__PURE__*/React.createElement("img", {
        src: "../../hosted/img/contactface.jpeg",
        alt: "contact face",
        className: "contactFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "contactName"
      }, "Name: ", /*#__PURE__*/React.createElement("span", {
        id: "data"
      }, contact.name)), /*#__PURE__*/React.createElement("h3", {
        className: "contactNum"
      }, "Number: ", /*#__PURE__*/React.createElement("span", {
        id: "data"
      }, contact.num)), /*#__PURE__*/React.createElement("h3", {
        className: "contactRel"
      }, "Relationship: ", /*#__PURE__*/React.createElement("span", {
        id: "data"
      }, contact.rel)))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "contactList"
    }, contactNodes)
  );
};

var loadContactsFromServer = function loadContactsFromServer() {
  sendAjax('GET', '/getContacts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ContactList, {
      contacts: data.contacts
    }), document.querySelector("#contacts"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ContactForm, {
    csrf: csrf
  }), document.querySelector("#makeContact"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ContactList, {
    contacts: []
  }), document.querySelector("#contacts"));
  loadContactsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#contactMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#contactMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
