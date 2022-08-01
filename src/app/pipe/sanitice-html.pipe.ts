import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'saniticeHtml'
})
export class SaniticeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: string): string {
    return this._sanitizer.bypassSecurityTrustHtml(value).toString();
  }

}
