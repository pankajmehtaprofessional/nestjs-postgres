import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ modelName: 'users', createdAt: 'created_at', updatedAt: 'updated_at' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  password: string;
}
