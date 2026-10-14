import { Injectable } from '@angular/core';
import {addDoc,collection,deleteDoc,doc,getDocs,query,serverTimestamp,where} from 'firebase/firestore';

import { db } from './firebase.config';
import { ArbolNario } from '../models/arbol-nario';
import { DatosElemento, TipoElemento } from '../models/nodo';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  private coleccion = collection(db, 'elementos');

  async getAll(uid: string): Promise<DatosElemento[]> {
    const consulta = query(
      this.coleccion,
      where('ownerUid', '==', uid)
    );

    const resultado = await getDocs(consulta);

    return resultado.docs.map(documento => ({
      id: documento.id,
      ...documento.data()
    } as DatosElemento));
  }

  async cargarArbol(
    uid: string,
    email: string
  ): Promise<ArbolNario> {
    let elementos = await this.getAll(uid);

    const tieneRaiz = elementos.some(
      elemento => elemento.parentId === null
    );

    if (!tieneRaiz) {
      await addDoc(this.coleccion, {
        nombre: 'Mi unidad',
        tipo: 'carpeta',
        parentId: null,
        ownerUid: uid,
        ownerEmail: email,
        createdAt: serverTimestamp()
      });

      elementos = await this.getAll(uid);
    }

    return new ArbolNario(elementos);
  }

  async crearElemento(
    nombre: string,
    tipo: TipoElemento,
    padre: DatosElemento,
    uid: string,
    email: string
  ): Promise<void> {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      throw new Error('Debes escribir un nombre.');
    }

    if (padre.tipo !== 'carpeta') {
      throw new Error('Solo se puede crear dentro de una carpeta.');
    }

    if (padre.ownerUid !== uid) {
      throw new Error('No puedes modificar esta carpeta.');
    }

    await addDoc(this.coleccion, {
      nombre: nombreLimpio,
      tipo,
      parentId: padre.id,
      ownerUid: uid,
      ownerEmail: email,
      createdAt: serverTimestamp()
    });
  }

  async eliminarElemento(
    elemento: DatosElemento,
    uid: string
  ): Promise<void> {
    if (elemento.ownerUid !== uid) {
      throw new Error('No puedes eliminar este elemento.');
    }

    if (elemento.parentId === null) {
      throw new Error('No puedes eliminar la raíz.');
    }

    const elementos = await this.getAll(uid);
    const tieneHijos = elementos.some(
      item => item.parentId === elemento.id
    );

    if (tieneHijos) {
      throw new Error(
        'La carpeta no está vacía. Elimina primero su contenido.'
      );
    }
    await deleteDoc(doc(db, 'elementos', elemento.id));
  }
}
