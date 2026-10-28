import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabasePublishableKey,
      {
        global: {
          fetch: this.fetchConTiempoLimite
        }
      }
    );
  }

  private fetchConTiempoLimite: typeof fetch = (input, init) => {
    const controlador = new AbortController();
    const signalOriginal = init?.signal;
    let agotoTiempo = false;

    const cancelarPorSolicitud = () => controlador.abort(signalOriginal?.reason);
    if (signalOriginal?.aborted) {
      cancelarPorSolicitud();
    } else {
      signalOriginal?.addEventListener('abort', cancelarPorSolicitud, { once: true });
    }

    const temporizador = setTimeout(() => {
      agotoTiempo = true;
      controlador.abort();
    }, 15000);

    return fetch(input, { ...init, signal: controlador.signal })
      .catch((error: unknown) => {
        if (agotoTiempo) {
          throw new Error('Supabase no respondió en 15 segundos. Revisa tu conexión y la URL del proyecto.');
        }
        throw error;
      })
      .finally(() => {
        clearTimeout(temporizador);
        signalOriginal?.removeEventListener('abort', cancelarPorSolicitud);
      });
  };

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
