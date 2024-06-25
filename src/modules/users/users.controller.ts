import {
  Body,
  Controller,
  Get,
  Param,
  // NotFoundException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.enity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/middlewares/interceptors.ts/logging.interceptor';
import { TransformInterceptor } from 'src/middlewares/interceptors.ts/transform.interceptor';
import { HTTP_CODE } from '../../config';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Records.' })
  async findAll(): Promise<User[]> {
    // throw new NotFoundException();
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user detail' })
  @ApiResponse({
    status: HTTP_CODE.SUCCESS.CODE,
    description: HTTP_CODE.SUCCESS.MSG,
  })
  @ApiParam({
    name: 'id',
    description: 'User Id',
  })
  async detail(@Param('id') id): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}
