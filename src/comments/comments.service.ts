import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async createComment(comment: CommentDto) {
    const newComment = await this.commentModel.create(comment);

    return newComment;
  }

  async findAllBookComments(bookId: string) {
    const bookComments = await this.commentModel.find({ bookId: bookId });

    return bookComments;
  }

  findOneComment(commentId: string) {
    const comment = this.commentModel.findById(commentId);

    return comment;
  }

  updateComment(commentId: string, comment: CommentDto) {
    const updatedComment = this.commentModel.findByIdAndUpdate(
      commentId,
      comment,
    );

    return updatedComment;
  }

  deleteComments(commentId: string) {
    const deletedComment = this.commentModel.findByIdAndDelete(commentId);

    return deletedComment;
  }
}
