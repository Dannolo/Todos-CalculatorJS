import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive for edit mode, takes template from editmode
 */

@Directive({
  selector: '[editMode]'
})
export class EditmodeDirective {

  constructor(public tpl: TemplateRef<any>) { }

}
