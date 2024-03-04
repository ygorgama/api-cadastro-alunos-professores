'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, {DataTypes}) {
    return queryInterface.createTable('rooms', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('rooms');
  }
};
