import { Column, Model, Table, DataType, BelongsToMany, HasOne } from 'sequelize-typescript';
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

    @HasOne(() => Teachers)
    declare teacher: Teachers 

    @BelongsToMany(() => Students, () => StudentRoom)
    declare students: Array<Students & {StudentRoom: StudentRoom}>;
}

export default Rooms;