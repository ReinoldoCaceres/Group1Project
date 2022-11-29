let productModel = require("../models/products");
let cartModel = require("../models/cart");

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


//Render the add product using cart form.ejs template
module.exports.cartaddPage = (req, res, next) => {
  let addProduct = productModel();

  res.render("products/product-cart-form", {
    title: "New product",
    product: addProduct,
  });
};

module.exports.AddcartPage = (req, res, next) => {

  
  let newProduct = productModel({
    _id: req.params.id,
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    condition: req.body.condition,
    image: req.body.image

        
      /*id: req.params.id,
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
*/

  });

  productModel.create(newProduct, (err, item) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      console.log(item);
      res.redirect("/products/cart");
    }
  });
  
};



// Renders the Add form using the add_edit.ejs template
module.exports.displaycartPage = (req, res, next) => {
  let newProduct = cartModel();

  res.render("products/product-cart-form", {
    title: "New product",
    product: newProduct,
  });
};

// Processes the data submitted from the Add form to create a new event
module.exports.processcartPage = (req, res, next) => {

  let newProduct = cartModel({
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
      res.redirect("/products/lists");
    }
  });
  
};


// cart list
// Gets all messages from the Database and renders the page to list them all.
module.exports.cartList = function (req, res, next) {
  productModel.find((err, CartList) => {
  if (err) {
    return console.error(err);
  } else {
    res.render("products/cart-lists", {
      title: "cart List",
      CartList: CartList,
      userName: req.user ? req.user.username : "",
    });
  }
});
};

