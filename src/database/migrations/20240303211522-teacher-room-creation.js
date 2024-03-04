'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, {DataTypes}) {
    return queryInterface.createTable('teacher-room', {
      teacher_id: {
        type: DataTypes.BIGINT,
        model: 'teachers',
        allowNull: false,
        primaryKey: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        
      },
      room_id: {
        type: DataTypes.BIGINT,
        model: 'rooms',
        allowNull: false,
        primaryKey: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }
    })
  },

  async down (queryInterface, Sequelize) {

    return await queryInterface.dropTable('teacher-room');
  }
};
