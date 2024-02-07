import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DownloadBtnComponent } from '@components/buttons/download/downloadBtn/downloadBtn.component';
import { NavigateButtonComponent } from '@components/buttons/navigate/navigateButton/navigateButton.component';
import ChatComponent from '@components/chat/chat.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChatComponent,
    DownloadBtnComponent,
    NavigateButtonComponent
  ],
  templateUrl: './dashboardLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {




 }
