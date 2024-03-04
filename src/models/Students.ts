import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import Rooms from './Room';
import StudentRoom from './StudentRoom';

@Table({
    tableName: 'students'
})
class Students extends Model {
    
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
    })
    declare id: number;

    @Column({type: DataType.STRING})
    declare name: string;

    @Column({type: DataType.STRING})
    declare email: string;

    @Column({type: DataType.STRING})
    declare password: string 

    @BelongsToMany(() => Rooms, () => StudentRoom)
    declare rooms: Array<Rooms & {StudentRoom: StudentRoom}>;
}

export default Students;