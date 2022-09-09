let messageModel = require("../models/message");

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  let newMessage = messageModel();

  res.render("messages/contact-us", {
    title: "New Message",
    message: newMessage,
  });
};

// Processes the data submitted from the Add form to create a new event
module.exports.processAddPage = (req, res, next) => {
  let newMessage = messageModel({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phone,
    message: req.body.message,
  });

  messageModel.create(newMessage, (err, item) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      console.log(item);
      res.redirect("/messages/success");
    }
  });
};

// Gets all messages from the Database and renders the page to list them all.
module.exports.messageList = function (req, res, next) {
  messageModel.find((err, messagesList) => {
    //console.log(eventList);
    if (err) {
      return console.error(err);
    } else {
      res.render("messages/message-list", {
        title: "Message List",
        MessagesList: messagesList,
        userName: req.user ? req.user.username : "",
      });
    }
  });
};

// Gets a message by id and renders the details page.
module.exports.details = (req, res, next) => {
  let id = req.params.id;

  messageModel.findById(id, (err, messageToShow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("messages/details", {
        title: "Message Details",
        message: messageToShow,
      });
    }
  });
};

module.exports.displaySuccess = (req, res, next) => {
  let newMessage = messageModel();

  res.render("messages/success", {
    title: "Success",
    message: newMessage,
  });
};


// Deletes a message based on its id.
module.exports.performDelete = (req, res, next) => {
    
  let id = req.params.id;

  messageModel.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/messages/messages-list");
    }
  });
}