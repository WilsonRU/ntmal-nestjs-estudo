import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";
import { ITask, Status } from "@ntmal/api-interfaces";

@Table({
  modelName: 'tasks',
  timestamps: true,
  paranoid: true,
  underscored: true
})
export class Task extends Model implements ITask {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column(DataType.STRING)
  status?: Status;

  @Column
  description: string;
}