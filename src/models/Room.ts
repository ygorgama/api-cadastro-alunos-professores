import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import TeacherRoom from './RoomTeacher';
import Teachers from './Teachers';
import StudentRoom from './StudentRoom';
import Students from './Students';

@Table({
    tableName: 'rooms',
    timestamps: false
})
class Rooms extends Model {
    
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
    })
    declare id: number;

    @Column({type: DataType.STRING})
    declare description: string;

    @BelongsToMany(() => Teachers, () => TeacherRoom)
    declare teachers: Array<Teachers & {TeacherRoom: TeacherRoom}>;

    @BelongsToMany(() => Students, () => StudentRoom)
    declare students: Array<Students & {StudentRoom: StudentRoom}>;
}

export default Rooms;