"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, { DataTypes }) {
    return await queryInterface.addColumn("teachers", 'room_id', {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "rooms",
        },
        key: "id",
      },
      allowNull: true,
      onDelete: 'restrict',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('teachers', "room_id");
  },
};
