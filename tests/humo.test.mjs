import {test} from 'node:test';
import assert from 'node:assert/strict';
import {semillas, buscarNotas} from '../src/notas.mjs';
test('el cuaderno abre con tres notas activas', () => assert.equal(buscarNotas(semillas, 'notas').length, 3));
test('el archivo inicial contiene Lisboa 2024', () => assert.deepEqual(buscarNotas(semillas,'archivo').map(n => n.titulo), ['Lisboa 2024']));
