import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UnauthorizedResponseDto } from '../authentication/dto';
import { JwtAuthGuard } from '../authentication/guard/jwtAuth.guard';
import { Status, StudentAppliesTaskBodyDto, StudentCreatedTaskBodyDto, TeacherAcceptedTaskBodyDto, TeacherCreatedTaskBodyDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor (
    private readonly taskService: TaskService,
  ) { }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  async tasks () {
    return this.taskService.getAll();
  }

  @ApiBody({ type: TeacherCreatedTaskBodyDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create (@Request() req, @Body() task: TeacherCreatedTaskBodyDto) {
    task.assessor = req.user.userId;
    return this.taskService.createTask(task);
  }

  @ApiBody({ type: StudentCreatedTaskBodyDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @Post('request')
  @UseGuards(JwtAuthGuard)
  async request (@Request() req, @Body() task: StudentCreatedTaskBodyDto) {
    task.student = req.user.userId;
    task.status = Status.Requested;
    return this.taskService.requestTask(task);
  }

  @ApiBody({ type: TeacherAcceptedTaskBodyDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @Patch('accept')
  @UseGuards(JwtAuthGuard)
  async accept (@Request() req, @Body() task: TeacherAcceptedTaskBodyDto) {
    return this.taskService.acceptAssesing(req.user, task);
  }

  @ApiBody({ type: StudentAppliesTaskBodyDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @Patch('apply')
  @UseGuards(JwtAuthGuard)
  async apply (@Request() req, @Body() body) {
    return this.taskService.apply(req.user, body);
  }
}
