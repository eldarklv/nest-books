import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  transform(objectId: any, metadata: ArgumentMetadata) {
    if (isValidObjectId(objectId)) {
      return objectId;
    } else {
      throw new BadRequestException('ObjectID is not valid');
    }
  }
}
