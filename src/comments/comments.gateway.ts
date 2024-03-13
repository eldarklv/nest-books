import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { cors: true })
export class CommentsGateway {
  constructor(private readonly commentsService: CommentsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    // почему так ответ приходит на клиент
    this.server.emit('events', data);

    // а вот так не приходит
    return data;
  }

  @SubscribeMessage('addComment')
  async addComment(@MessageBody() createCommentDto: CommentDto) {
    const comment = await this.commentsService.createComment(createCommentDto);

    console.log(comment);

    this.server.emit('addComment', comment);

    return 'ok';
  }

  @SubscribeMessage('getAllComments')
  async getAllComments(@MessageBody() body: { bookId: string }) {
    console.log(body.bookId);
    const comments = await this.commentsService.findAllBookComments(
      body.bookId,
    );
    console.log(comments);

    this.server.emit('getAllComments', comments);

    return comments;
  }

  // то что ниже не используется
  @SubscribeMessage('findOneComment')
  findOneComment(@MessageBody() commentId: string) {
    return this.commentsService.findOneComment(commentId);
  }

  @SubscribeMessage('updateComment')
  updateComment(@MessageBody() updateComment: CommentDto) {
    return this.commentsService.updateComment(
      updateComment.commentId,
      updateComment,
    );
  }

  @SubscribeMessage('removeComment')
  deleteComments(@MessageBody() commentId: string) {
    return this.commentsService.deleteComments(commentId);
  }
}
