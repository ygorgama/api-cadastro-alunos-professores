'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, {DataTypes}) {
    return queryInterface.createTable('teachers', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
      },
      degree: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      created_at:{
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at:{
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('teachers');
  }
};
