import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  baseUrl: string = 'https://icherniakov.ru/yt-course/';

  transform(value: string | null, ...args: unknown[]): unknown {
    return value ? `${this.baseUrl}${value}` : '';
  }

}
