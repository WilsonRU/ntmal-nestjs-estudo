import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-task.dto';
import { ITask } from '@ntmal/api-interfaces';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
   async create(@Body() createTaskDto: CreateTasksDto): Promise<ITask> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<ITask[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ITask>{
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: CreateTasksDto): Promise<void> {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
