const { Op } = require("sequelize");
const db = require("../database/models");

module.exports = {
  getUserWithFavorites: async ({userId}) => {

        if (!userId) {
        throw {
            status : 400,
            message : 'Es necesario enviar el userId'
        }
    }

    const config = {
        include : [
            {
                association : 'productFavorites',
                include : [
                    {
                        association : 'images'
                    }
                ]
            }
        ]
    }

    return await db.User.findByPk(userId,config)

  },
  addOrRemoveToFavorite : async ({ userId, productId}) =>{

    if (!userId || !productId) {
        throw {
            status : 400,
            message : 'Es necesario enviar el userId y el productId'
        }
    }

    const config = {
        where : {
            [Op.and] : [
                {
                    userId
                },
                {
                    productId
                }
            ]
        },
        defaults : { userId, productId } 
    }

    const [Favorite, isCreated] = await db.Favorite.findOrCreate(config);

    if(!isCreated){
        await Favorite.destroy()
    }

    return !isCreated;
  }

};
