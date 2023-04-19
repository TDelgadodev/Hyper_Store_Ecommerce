const db = require("../database/models");

module.exports = {
  Home: async (req, res) => {
    try {
      
    
    const products = await db.Product.findAll({
      include: [
        {
          association: "images",
          attributes: ["name"],
        },
      ],
      limit : 10
    });

    const categoryPc = await db.Category.findOne({
      where: {
        name: "Pc",
      },
      include: [
        {
          association: "products",
          include: ["images"],
        },
      ],
    });

    const productsOrder = await db.Product.findAll({
      order : [
        ['name', 'ASC']
      ],
      limit : 6,
      include: [
        {
          association: "images",
          attributes: ["name"],
        },
      ],
    })

        return res.render("home", {
          title: "HyperStore | Home",
          products,
          productsPc : categoryPc.products,
          productsOrder
        });
      } catch (error) {
      console.log(error.message)
      }
  },
  Help: (req, res) => {
    return res.render("help", {
      title: "Help",
    });
  },
  p404: (req, res) => {
    return res.render("404");
  },
};
