import { MessageThread } from '@interfaces/messageThread.interface';
import { environment } from 'environments/environment.development';

export async function* questionUseCase(
  messageThread: MessageThread[],
  abortSignal: AbortSignal
) {
  try {
    const resp = await fetch(`${environment.backendApi}/send-question`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(messageThread),
      signal: abortSignal,
    });

    if (!resp.ok) throw new Error('No se puedo analizar la pregunta  ');

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log('no se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      const decodenChunk = decoder.decode(value, { stream: true });
      text += decodenChunk;
      yield text;
    }

    return text;
  } catch (error) {
    return null;
  }
}
