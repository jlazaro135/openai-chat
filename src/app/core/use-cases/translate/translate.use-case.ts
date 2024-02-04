import type { TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment.development"

export const translateUseCase = async ( prompt:string, lang: string ) => {

  try{

    const resp = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({prompt, lang})
    })

    if( !resp.ok ) throw new Error('No se puedo realizar la traducción');

    const { message } = await resp.json() as TranslateResponse;

    return {
      ok: true,
      message
    }

  }catch(error){
    console.log(error)
    return {
      ok: false,
      message: 'No se ha podido realizar la traducción'
    }
  }


}
