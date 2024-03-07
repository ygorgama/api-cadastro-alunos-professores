import { Column, Model, Table, DataType, BelongsToMany, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import Rooms from './Room';
import StudentRoom from './StudentRoom';

@Table({
    tableName: 'students'
})
class Students extends Model {
    
    @AutoIncrement
    @PrimaryKey
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @Column({type: DataType.STRING})
    declare name: string;

    @Column({type: DataType.STRING})
    declare cpf: string;

    @BelongsToMany(() => Rooms, () => StudentRoom)
    declare rooms: Array<Rooms & {StudentRoom: StudentRoom}>;
}

export default Students;