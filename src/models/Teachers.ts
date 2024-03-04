import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import Rooms from './Room';
import TeacherRoom from './RoomTeacher';

@Table({
    tableName: 'teachers'
})
class Teachers extends Model {
    
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
    })
    declare id: number;

    @Column({type: DataType.STRING})
    declare name: string;

    @Column({type: DataType.STRING})
    declare cpf: string;

    @Column({type: DataType.STRING})
    declare formacao: string;

    @BelongsToMany(() => Rooms, () => TeacherRoom)
    declare rooms: Array<Rooms & {TeacherRoom: TeacherRoom}>;

}

export default Teachers;