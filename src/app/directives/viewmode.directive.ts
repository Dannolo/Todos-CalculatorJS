import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive for view mode, takes template from editmode
 */

@Directive({
  selector: '[viewMode]'
})
export class ViewmodeDirective {

  constructor(public tpl: TemplateRef<any>) { }

}
