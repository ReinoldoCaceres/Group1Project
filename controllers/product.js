let messageModel = require("../models/message");
let productModel = require("../models/products");
let sgMail = require("@sendgrid/mail");


// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  let newProduct = productModel();

  res.render("products/product-add-form", {
    title: "New product",
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
    image: req.body.image

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
// module.exports.displayCart = (req, res, next) => {
//   let newProduct = cartModel();

//   res.render("products/product-cart-form", {
//     title: "Product",
//     product: newProduct,
//   });
// };


// // Processes cart page
// module.exports.processCartPage = (req, res, next) => {
//   const productId = req.params.id;
//   const product = productModel.findById(productId);
//   console.log(product.name);
//   //const itemIndex = cart.items.findIndex((p) => p.productId == productId);
   
//   let newCart = cartModel({
//     name: product.name,
//     brand: product.brand,
//     description: product.description,
//     price: product.price,
//     category: product.category,
//     condition: product.condition,
//     image: product.image,
//     totalCost: product.price,

//   });
// };
//   // if product does not exists in cart, find it in the db to retrieve its price and add new item
  // cartModel.items.push({
  //     name: product.name,
  //       brand: product.brand,
  //       description: product.description,
  //       price: product.price,
  //       category: product.category,
  //       condition: product.condition,
  //       image: product.image,
  //       totalCost: product.price,
  //   });
  // cartModel.create(newCart, (err, item) => {
  //   if (err) {
  //     console.log(err);
  //     res.end(err);
  //   } else {
  //     // refresh the book list
  //     console.log(item);
  //     res.redirect("/products/list");
  //   }
  // });

// module.exports.cartList = function (req, res, next) {
//   cartModel.find((err, cartList) => {
//   if (err) {
//     return console.error(err);
//   } else {
//     res.render("products/products-cart-form", {
//       title: "Products List",
//       ProductList: cartList,
//       userName: req.user ? req.user.username : "",
//     });
//   }
// });
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
      res.redirect("/products/list");
    }
  });
};




// Deletes a message based on its id.
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  productModel.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/products/list");
    }
  });
};




// Display checkout page
module.exports.displaycheckoutPage = (req, res, next) => {
  let newProduct = productModel();

  res.render("checkout/checkout-form", {
    title: "New product",
    product: newProduct,
  });
};


// Processes check out page
module.exports.processcheckoutPage = (req, res, next) => {
  
let newProduct = productModel({
  
});

productModel.create(newProduct, (err, item) => {
  if (err) {
    console.log(err);
    res.end(err);
  } else {
    
    console.log(item);
    res.redirect("/checkout/check");
  }
});

};