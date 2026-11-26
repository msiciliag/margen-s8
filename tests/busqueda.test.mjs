import test from 'node:test';
import assert from 'node:assert/strict';

import { buscarNotas } from '../src/notas.mjs';

const notas = [
  { id: 'lisboa', titulo: 'Viaje a Lisboa', cuerpo: 'Antes de salir', archivada: false, fecha: '2026-06-08' },
  { id: 'lisboa24', titulo: 'Lisboa 2024', cuerpo: 'Apuntes de la visita anterior', archivada: true, fecha: '2024-05-10' },
];

test('buscar "Lisboa" en la vista Notas devuelve solo la nota activa', () => {
  const titulos = buscarNotas(notas, 'notas', 'Lisboa').map(nota => nota.titulo);
  assert.deepStrictEqual(titulos, ['Viaje a Lisboa']);
});

test('buscar "Lisboa" en la vista Archivo devuelve solo la nota archivada', () => {
  const titulos = buscarNotas(notas, 'archivo', 'Lisboa').map(nota => nota.titulo);
  assert.deepStrictEqual(titulos, ['Lisboa 2024']);
});
