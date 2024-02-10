import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { DownloadBtnComponent } from '@components/buttons/download/downloadBtn/downloadBtn.component';
import { NavigateButtonComponent } from '@components/buttons/navigate/navigateButton/navigateButton.component';
import ChatComponent from '@components/chat/chat.component';
import { ScrollService } from 'app/presentation/services/scroll.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChatComponent,
    DownloadBtnComponent,
    NavigateButtonComponent,
  ],
  templateUrl: './dashboardLayout.component.html',
  styles: [
    `
      .heading {
        background: #a477f7;
        background: linear-gradient(280deg, #00b6ab 40%, #a477f7 80%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }

      .heading:hover {
        animation: textShine 0.5s ease-in forwards;
      }

      chat {
        width: 100%;
      }

      @keyframes textShine {
        0% {
          background: linear-gradient(280deg, #00b6ab 40%, #a477f7 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        100% {
          background: linear-gradient(280deg, #a477f7 40%, #00b6ab 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private scrollService: ScrollService) {}

  goToChat() {
    this.chatContainer.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  ngOnInit() {
    // Suscribirse al evento de scroll
    this.scrollService.getScrollEvent().subscribe(() => {
      // Realizar acción de scroll
      this.scrollToBottom();
    });

  }

  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
}
