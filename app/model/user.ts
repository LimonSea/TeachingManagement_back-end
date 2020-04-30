
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
@Table({
  modelName: 'user',
  timestamps: true,
})
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER(11),
    comment: '用户ID',
  })
  id: number;

  @Column({
    comment: '用户姓名',
  })
  name: string;

  @Column({
    comment: '用户性别',
  })
  sex: number;

  @Column({
    comment: '用户年龄',
  })
  age: number;

  @Column({
    comment: '用户邮箱',
  })
  mail: string;

  @Column({
    comment: '用户手机号码',
  })
  mobile: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '头像',
  })
  avatar: string;

  @Column({
    comment: '用户权限',
    field: 'current_authority',
  })
  currentAuthority: string;

  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}

export default () => User;
