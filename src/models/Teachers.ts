import { Column, Model, Table, DataType, BelongsToMany, ForeignKey, HasOne } from 'sequelize-typescript';
import Rooms from './Room';

@Table({
    tableName: 'teachers'
})
class Teachers extends Model {
    
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @Column({type: DataType.STRING})
    declare name: string;

    @Column({type: DataType.STRING})
    declare cpf: string;

    @Column({type: DataType.STRING})
    declare degree: string;

    @ForeignKey(() => Rooms)
    @Column({type: DataType.INTEGER})
    declare room_id: number;

    @HasOne(() => Rooms)
    declare room: Rooms

}

export default Teachers;