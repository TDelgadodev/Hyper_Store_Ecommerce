const createResponseError = require("../../helpers/createResponseError");
const sendSucessResponse = require("../../helpers/sendSucessResponse");
const {
  getUserWithFavorites,
  addOrRemoveToFavorite,
} = require("../../services/favoritesServices");

module.exports = {
  getFavorites: async (req, res) => {
    try {
       //const { id } = req.session.userLogin;
       const user = await getUserWithFavorites({ userId: 1 });
      sendSucessResponse(res, { data: user.productFavorites });
    } catch (error) {
      createResponseError(res, error);
    }
  },
  toggleProductFavorite: async (req, res) => {
    try {
       //const { id } = req.session.userLogin;
       const { productId } = req.body;
      const isRemove = await addOrRemoveToFavorite({ userId: 1, productId });
      sendSucessResponse(res, { data: { isRemove } });
    } catch (error) {
      createResponseError(res, error);
    }
  },
};
