import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import Rooms from './Room';
import Teachers from './Teachers';
import Students from './Students';

@Table({
    tableName: 'students-room',
    timestamps: false
})
class StudentRoom extends Model {
    @ForeignKey(() => Students)
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
    })
    declare student_id: number;

    @ForeignKey(() => Rooms)
    @Column({
        primaryKey: true,
        type: DataType.BIGINT, 
    })
    declare room_id: number;
}

export default StudentRoom;