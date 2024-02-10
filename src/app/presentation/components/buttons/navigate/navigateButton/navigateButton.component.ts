import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'navigate-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <a class="learn-more" href="https://jlrresume.netlify.app/">
    <span class="circle" aria-hidden="true">
    <span class="icon arrow"></span>
    </span>
    <span class="a-text">CV interactivo</span>
  </a>
  `,
  styleUrl: './navigateButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigateButtonComponent { }
