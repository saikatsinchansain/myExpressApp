module.exports = (sequelize, Sequelize) => {
    const Lottery = sequelize.define("lotteries", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
    return Lottery;
  };