let messageModel = require("../models/message");
let productModel = require("../models/products");
let sgMail = require("@sendgrid/mail");


// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  let newProduct = productModel();

  res.render("products/product-add-form", {
    title: "Add a new product",
    product: newProduct,
  });
};

// Processes the data submitted from the Add form to create a new event
module.exports.processAddPage = (req, res, next) => {
    // name: String,
    // brand: String,
    // description: String,
    // price: String,
    // category: String,
    // condition: String
  let newProduct = productModel({
    _id: req.params.id,
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    condition: req.body.condition,

  });

  productModel.create(newProduct, (err, item) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      console.log(item);
      res.redirect("/products/list");
    }
  });
  
};

// Gets all messages from the Database and renders the page to list them all.
module.exports.productList = function (req, res, next) {
    productModel.find((err, productList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/products-list", {
        title: "Products List",
        ProductList: productList,
        userName: req.user ? req.user.username : "",
      });
    }
  });
};

// // Gets a message by id and renders the details page.
// module.exports.details = (req, res, next) => {
//   let id = req.params.id;

//   messageModel.findById(id, (err, messageToShow) => {
//     if (err) {
//       console.log(err);
//       res.end(err);
//     } else {
//       //show the edit view
//       res.render("messages/details", {
//         title: "Message Details",
//         message: messageToShow,
//       });
//     }
//   });
// };

// module.exports.displaySuccess = (req, res, next) => {
//   let newMessage = messageModel();

//   res.render("messages/success", {
//     title: "Success",
//     message: newMessage,
//   });
// };

// Deletes a message based on its id.
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  productModel.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("products/list");
    }
  });
};
