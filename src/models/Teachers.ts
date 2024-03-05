import { Column, Model, Table, DataType, BelongsToMany, ForeignKey, BelongsTo, AutoIncrement } from 'sequelize-typescript';
import Rooms from './Room';

@Table({
    tableName: 'teachers'
})
class Teachers extends Model {
    
    @AutoIncrement
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
    declare roomId: number;

    @BelongsTo(() => Rooms)
    declare room: Rooms

}

export default Teachers;