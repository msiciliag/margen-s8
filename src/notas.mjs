export const semillas = [
  {id:'lisboa', titulo:'Viaje a Lisboa', cuerpo:'Antes de salir\n\nVolver a la librería de la Rua do Século. El cuaderno de tapa azul se quedó a medias en la mesa del fondo.\n\nReservar una tarde para cruzar el río y dibujar desde la otra orilla.', archivada:false, fecha:'2026-06-08'},
  {id:'taller', titulo:'Conversación en el taller', cuerpo:'Una pregunta que quedó abierta en la reunión: ¿cómo sabemos que una idea merece una segunda visita?', archivada:false, fecha:'2026-06-07'},
  {id:'lecturas', titulo:'Lecturas de junio', cuerpo:'Reunir aquí los pasajes que quiero releer durante el verano.', archivada:false, fecha:'2026-06-06'},
  {id:'lisboa24', titulo:'Lisboa 2024', cuerpo:'Apuntes de la visita anterior. El itinerario ya se completó.', archivada:true, fecha:'2024-05-10'}
];
export function buscarNotas(notas, vista, consulta = '') {
  const termino = consulta.trim().toLocaleLowerCase('es');
  const enVista = notas.filter(nota => nota.archivada === (vista === 'archivo'));
  if (!termino) return enVista;
  return notas.filter(nota => (nota.titulo + ' ' + nota.cuerpo).toLocaleLowerCase('es').includes(termino));
}
