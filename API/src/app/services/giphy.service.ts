import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private http = inject(HttpClient);

  private url = 'https://api.giphy.com/v1/gifs/search';

  async buscarGifs(texto: string) {

    const params = new URLSearchParams({
      api_key: environment.giphyApiKey,
      q: texto,
      limit: '25',
      offset: '0',
      rating: 'g',
      lang: 'en'
    });

    const respuesta = await firstValueFrom(
      this.http.get<any>(`${this.url}?${params}`)
    );

    return respuesta.data;
  }
}
