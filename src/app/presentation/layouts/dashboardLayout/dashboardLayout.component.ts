import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import ChatComponent from '@components/chat/chat.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChatComponent
  ],
  templateUrl: './dashboardLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {




 }
