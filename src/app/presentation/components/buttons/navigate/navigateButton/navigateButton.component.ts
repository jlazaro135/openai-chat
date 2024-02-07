import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'navigate-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <button class="learn-more">
    <span class="circle" aria-hidden="true">
    <span class="icon arrow"></span>
    </span>
    <span class="button-text">CV interactivo</span>
  </button>
  `,
  styleUrl: './navigateButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigateButtonComponent { }
