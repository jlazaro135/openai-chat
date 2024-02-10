import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
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
import { ScrollService } from 'app/presentation/services/scroll.service';

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
  styles: ['.thinking {width: 5px; height: 10px; margin: 5px 0;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatComponent implements OnInit {
  @ViewChild('messagesContainer') public messageContainer!: ElementRef;

  public messages = signal<Message[]>([]);
  public thread = signal<MessageThread[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public abortSignal = new AbortController();
  public firstMessage: string = '';
  public firstMessageIsLoaded: boolean = false;
  public windowWidth?: number

  constructor(public scrollService: ScrollService) {}

  public recommendedMessages: any = [
    'Quiero conocer tu experiencia profesional',
    '¿Tienes página personal?',
    '¿Qué haces en tu tiempo libre?',
    '¿Has hecho algún proyecto o desarrollo interesante?',
  ];

  public initMessageSplitted: string[] = [
    '¡Hola! Soy',
    ' un asistente de ',
    'inteligencia artificial creado ',
    'para representar',
    ' a Jesús Lázaro. ',
    'Aunque soy una IA, ',
    'hablaré como ',
    'si fuera él ',
    'mismo para hacer ',
    'esta conversación más',
    ' cercana y personal.',
  ];

  ngOnInit(): void {
    this.windowWidth = window.innerWidth
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: true,
        text: `<div class="thinking"></div>`,
      },
    ]);

    setTimeout(() => {
      this.sumarCadenasConIntervalo(this.initMessageSplitted, 100);
    }, 1000);

  }

  sumarCadenasConIntervalo(arrayChunks: string[], intervalo: number) {
    let index = 0;
    let cadenaSumada = '';

    const intervalId = setInterval(() => {
      if (index < arrayChunks.length) {
        cadenaSumada += arrayChunks[index];
        this.handleStreamResponse(cadenaSumada); // Puedes cambiar console.log por la acción que desees con la cadena sumada
        index++;
      } else {
        this.firstMessageIsLoaded = true;
        clearInterval(intervalId);
      }
    }, intervalo);
  }

  sendRecommendedMessage(message: string) {
    this.handleMessage(message);
    this.recommendedMessages = [];
  }

  async handleMessage(prompt: string) {
    this.scrollWindowToBottom();
    this.recommendedMessages = [];
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

    setTimeout(() => this.scrollToBottom(), 0);
    let finalMessage: string = '';

    for await (const text of stream) {
      finalMessage = text;
      this.handleStreamResponse(text);
      this.scrollWindowToBottom()
    }
    this.scrollWindowToBottom()
    this.thread.update((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: finalMessage,
      },
    ]);
  }

  scrollToBottom(): void {
    if (this.messageContainer) {
      try {
        this.messageContainer.nativeElement.scrollTop =
          this.messageContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();
    this.messages.set([...messages, { isGpt: true, text: message }]);
    this.scrollToBottom();
  }

  scrollWindowToBottom(){
    if(this.windowWidth && this.windowWidth <= 1024){
      this.scrollService.sendScrollEvent();
    }
  }
}
