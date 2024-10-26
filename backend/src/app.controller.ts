import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session/session.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sessioninfo')
  @UseGuards(new AuthGuard())
  getSessionInfo(
    @Session() session: SessionContainer,
  ): Record<string, unknown> {
    return {
      sessionHandle: session.getHandle(),
      userId: session.getUserId(),
      accessTokenPayload: session.getAccessTokenPayload(),
    };
  }

  @Get('/todos')
  @UseGuards(new AuthGuard())
  async getTodos(@Session() session: SessionContainer) {
    return await this.appService.getTodos(session);
  }

  @Post('/todos')
  @UseGuards(new AuthGuard())
  addTodo(
    @Session() session: SessionContainer,
    @Body() body: { text: string },
  ) {
    return this.appService.addTodo(session, body.text);
  }

  @Delete('/todos/:id')
  @UseGuards(new AuthGuard())
  deleteTodo(@Session() session: SessionContainer, @Param('id') id: number) {
    return this.appService.deleteTodo(session, id);
  }

  @Post('/todos/:id/toggle')
  @UseGuards(new AuthGuard())
  toggleTodo(@Session() session: SessionContainer, @Param('id') id: number) {
    return this.appService.toggleTodo(session, id);
  }
}
