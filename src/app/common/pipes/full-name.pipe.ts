import { Pipe, PipeTransform } from '@angular/core';
import { IFullName } from '../interfaces/fullName.interface';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(data: IFullName): string {
    return `${data.firstName} ${data.lastName}`.trim();
  }
}
