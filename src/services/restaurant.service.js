const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      // include:"userLikes",

      // include: {
      //   association: "userLikes",
      //   through: {
      //     attributes: [],
      //   },
      // },

      include: [
        "owner",
        {
          association: "userLikes",
          // attributes:{
          //   exclude:["email","password"]
          // },
          through: {
            attributes: [],
          },
        },
      ],
    });
    return restaurants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createRestaurant = async (data) => {
  try {
    const restaurant = await Restaurant.create(data);
    return restaurant;
  } catch (error) {
    throw error;
  }
};

// requester: chứa thông tin user thực hiện request này
const deleteRestaurant = async (restaurantId, requester) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "restaurant not found");
    }

    // Kiểm tra người xóa nhà hàng có phải là chủ nhà hàng hay không
    if (restaurant.userId !== requester.id) {
      throw new AppError(403, "no have permission");
    }
    await Restaurant.destroy({ where: { id: restaurantId } });
  } catch (error) {
    throw error;
  }
};

const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "restaurant not found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found");
    }
    console.log(restaurant.__proto__);
    // Khi thiết lập relationships cho các model, mặc định sequelize sẽ tạo ra các phương thức cho các model để tương tác với các model khác
    // await restaurant.addUserLike(userId);
    const hasLiked = await restaurant.hasUserLike(user.id);

    if (hasLiked) {
      await restaurant.removeUserLike(user.id);
    } else {
      await restaurant.addUserLike(user.id);
    }

    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  likeRestaurant,
};
