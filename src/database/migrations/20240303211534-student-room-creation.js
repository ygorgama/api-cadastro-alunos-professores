'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, {DataTypes}) {
    return queryInterface.createTable('student-room', {
      student_id: {
        type: DataTypes.INTEGER,
        model: 'students',
        allowNull: false,
        primaryKey: true,
        onDelete: 'restrict',
        onUpdate: 'cascade'
      },
      room_id: {
        type: DataTypes.INTEGER,
        model: 'rooms',
        allowNull: false,
        primaryKey: true,
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('student-room');
  }
};
