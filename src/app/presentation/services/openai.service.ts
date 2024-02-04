import { Injectable } from '@angular/core';
import { MessageThread } from '@interfaces/messageThread.interface';
import { questionUseCase } from '@use-cases/question/question.use-case';



@Injectable({providedIn: 'root'})
export class OpenAiService {

  question(messagesThread: MessageThread[], abortSignal: AbortSignal){
    return questionUseCase(messagesThread, abortSignal);
  }


}
