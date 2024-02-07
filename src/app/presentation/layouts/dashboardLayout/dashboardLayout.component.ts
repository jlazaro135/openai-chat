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
  styles: [`
  .heading {
    background: #A477F7;
    background: linear-gradient(to bottom right, #00B6AB 0%, #A477F7 60%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {




 }
