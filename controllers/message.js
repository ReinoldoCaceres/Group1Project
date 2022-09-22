let messageModel = require("../models/message");
let sgMail = require("@sendgrid/mail");


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

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "hector@global-urban.com", // Recipient
    from: "admin@lissethflores.com", //  verified sender
    subject: "A new contact form was sent by " + req.body.name,
    text:  `${req.body.name} just sent a contact form directly from the website\n\nName: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}\n\nRegards,\n\nAdmin.`
    
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
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
};
