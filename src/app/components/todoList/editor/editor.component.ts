import { Component, OnInit, Output, ContentChild, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { ViewmodeDirective } from 'src/app/directives/viewmode.directive';
import { EditmodeDirective } from 'src/app/directives/editmode.directive';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Subject } from 'rxjs';
import { take, filter, switchMapTo } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

/**
 * Core logic for modify as fast as possible todos is here. This component catches click, dbclick and enter event and fires relative actions switching from view to edit mode and viceversa.
 * @param mode: string          which template we charge
 * @param viewModeTpl: ViewmodeDirective        view mode template
 * @param editModeTpl: EditmodeDirective        edit mode template
 * 
 * @function viewModeHandler(), listen for a dblclick event on the component and switch to edit mode
 * @function editModeHandler(), listen for a click event out of the component and switch to view mode
 * 
 */

@Component({
  selector: 'editor',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `
})


@UntilDestroy()

export class EditorComponent {

  @ContentChild(ViewmodeDirective) viewModeTpl: ViewmodeDirective;
  @ContentChild(EditmodeDirective) editModeTpl: EditmodeDirective;

  mode: 'view' | 'edit' = 'view';

  //Listen for the enter keyevent

  @HostListener('document:keyup.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.mode = 'view';
  }

  constructor(private host: ElementRef) {
  }
  
  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  private viewModeHandler() { 
     fromEvent(this.element, 'dblclick').pipe(
       untilDestroyed(this)
    ).subscribe(() => {
      this.mode = 'edit';
      this.editMode.next(true);
    });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false), take(1)
    )
 
    this.editMode$.pipe(
      switchMapTo(clickOutside$),
      untilDestroyed(this)
    ).subscribe(event => {
      this.mode = 'view';
    });
  }
  
  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private get element() {
    return this.host.nativeElement;
  }
  
}