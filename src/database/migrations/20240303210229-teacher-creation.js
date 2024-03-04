'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, {DataTypes}) {
    return queryInterface.createTable('teachers', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      formacao: {
        type: DataTypes.STRING,
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
