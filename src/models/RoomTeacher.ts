import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import Rooms from './Room';
import Teachers from './Teachers';

@Table({
    tableName: 'teacher-room',
    timestamps: false
})
class TeacherRoom extends Model {
    @ForeignKey(() => Teachers)
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
    })
    declare teacher_id: number;

    @ForeignKey(() => Rooms)
    @Column({
        primaryKey: true,
        type: DataType.BIGINT, 
    })
    declare room_id: number;
}

export default TeacherRoom;