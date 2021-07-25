import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ITask } from '@ntmal/api-interfaces';
import { CreateTasksDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {}

  async create({description}: CreateTasksDto): Promise<ITask> {
    try {
      const taskAlreadyExists = await this.taskModel.findOne({
        where: {
          description
        }
      });

      if (taskAlreadyExists) {
        throw new HttpException({message: 'Tarefa já cadastrada.'}, HttpStatus.BAD_REQUEST);
      }

      const task = await this.taskModel.create({ description })

      return task;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({message: 'Erro ao cadastrar dados.'}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<ITask[]> {
    try {
      const tasks = await this.taskModel.findAll();

      return tasks;
    } catch (error) {
      throw new HttpException({message: 'Erro ao obter dados.'}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<ITask> {
    try {
      const task = await this.taskModel.findByPk(id);

      if (!task) {
        throw new HttpException({message: 'Tafera não encontrada.'}, HttpStatus.NOT_FOUND);
      }

      return task;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({message: 'Erro ao obter dados.'}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, dto: CreateTasksDto): Promise<void> {
    try {
      const task = await this.taskModel.findByPk(id);

      if (!task) {
        throw new HttpException({message: 'Tarefa não encontrada.'}, HttpStatus.NOT_FOUND);
      }

      await this.taskModel.update(dto, {where: { id }})
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({message: 'Erro ao atualizar dados.'}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const task = await this.taskModel.findByPk(id);

      if (!task) {
        throw new HttpException({message: 'Tarefa não encontrada.'}, HttpStatus.NOT_FOUND);
      }

      await this.taskModel.destroy({where: { id }})
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException({message: 'Erro ao remover dados.'}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}