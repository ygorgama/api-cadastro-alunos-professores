import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})
class User extends Model {
    
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @Column({type: DataType.STRING})
    declare name: string;

    @Column({type: DataType.STRING})
    declare email: string;

    @Column({type: DataType.STRING})
    declare password: string 
}

export default User;