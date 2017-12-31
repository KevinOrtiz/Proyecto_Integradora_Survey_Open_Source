import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'saniarHtml'
})
export class SaniarHtmlPipe implements PipeTransform {

  constructor (private _sanitizer: DomSanitizer) {}
  transform(html: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
