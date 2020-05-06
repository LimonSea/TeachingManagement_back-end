
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
@Table({
  modelName: 'group',
  timestamps: true,
})
export class Group extends Model<Group> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER(11),
    comment: '工作室ID',
  })
  id: number;

  @Column({
    comment: '工作室名称',
  })
  name: string;

  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}

export default () => Group;
