let productModel = require("../models/products");
let cartModel = require("../models/cart");

let sgMail = require("@sendgrid/mail");

module.exports.displayAddPage = (req, res, next) => {
  let newProduct = productModel();

  res.render("products/product-add-form", {
    title: "New product",
    product: newProduct,
  });
};

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

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  productModel.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      
      res.redirect("/products/list");
    }
  });
};

module.exports.performAddToCart = (req, res, next) => {
  let id = req.params.id;
  var name;
 
  console.log(id);
  productModel.findById(id, (err, product) => {
    if (err) {
      console.log(err);
    }
    else{
      name = product.name;
      brand = product.brand;
      description = product.description;
      price = product.price;
      category = product.category;
      condition = product.condition;
      image = product.image;
      totalCost = 1;
      console.log(name, brand,description,price);


      let newCartItem = productModel({
        _id: id,
        name: name,
        brand: brand,
        description: description,
        price: price,
        category: category,
        condition: condition,
        image: image,
        totalCost: totalCost
      });
    
      cartModel.create(newCartItem, (err, item) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          console.log(item);
        }
      });
      res.redirect("/products/cartList");
      
    }
  });
}

module.exports.displaycheckoutPage = (req, res, next) => {
  let newProduct = productModel();

  res.render("checkout/checkout-form", {
    title: "New product",
    product: newProduct,
  });
};


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

  });

  productModel.create(newProduct, (err, item) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(item);
      res.redirect("/products/cart");
    }
  });
  
};


module.exports.displaycartPage = (req, res, next) => {
  let newProduct = cartModel();

  res.render("products/product-cart-form", {
    title: "New product",
    product: newProduct,
  });
};


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
      console.log(item);
      res.redirect("/products/lists");
    }
  });
  
};

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

module.exports.ListCart = function (req, res, next) {
  cartModel.find((err, cartList) => {
  if (err) {
    return console.error(err);
  } else {
    var total=0
    for(let i=0;i<cartList.length;i++){
      console.log(cartList[i].price)
       total= cartList[i].price+total;
       
    }
    var Gst= 0.13*total+total;
    res.render("products/cart-lists", {
      title: "Products List",
      pri:total,
      pritax:Gst,
      CartList: cartList,
      userName: req.user ? req.user.username : "",
    });
  }
});
};

module.exports.performDeleteCart = (req, res, next) => {
  let id = req.params.id;

  cartModel.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products/list");
    }
  });
};

module.exports.displayfeedbackPage = (req, res, next) => {
  let newProduct = productModel();

  res.render("products/feedback", {
    title: "Feedback",
    product: newProduct,
  });
};
