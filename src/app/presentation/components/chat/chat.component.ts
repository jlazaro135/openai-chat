import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { MessageThread } from '@interfaces/messageThread.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'chat',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxComponent,
  ],
  templateUrl: './chat.component.html',
  styles: ['.thinking {width: 5px; height: 10px; background-color: white}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatComponent {
  public messages = signal<Message[]>([]);
  public thread = signal<MessageThread[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public abortSignal = new AbortController();

  async handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.thread.update((prev) => [
      ...prev,
      {
        role: 'user',
        content: prompt,
      },
    ]);

    const stream = this.openAiService.question(
      this.thread(),
      this.abortSignal.signal
    );

    this.isLoading.set(false);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
      {
        isGpt: true,
        text: `<div class="thinking"></div>`,
      },
    ]);

    let finalMessage: string = '';

    for await (const text of stream) {
      finalMessage = text;
      this.handleStreamResponse(text);
    }

    this.thread.update((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: finalMessage,
      },
    ]);
  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();
    this.messages.set([...messages, { isGpt: true, text: message }]);
  }
}
