import React, { useEffect, useState } from 'react';
import {createRoot} from 'react-dom/client';
import {semillas, buscarNotas} from './notas.mjs';
import capa from './lisboa.webp';
import './styles.css';

const clave='uah.margen.notas.v1';
function cargar() {
  const guardadas=localStorage.getItem(clave);
  return guardadas ? JSON.parse(guardadas) : semillas;
}
const dia=() => new Date().toISOString().slice(0,10);
const fechaCorta=valor => new Intl.DateTimeFormat('es',{day:'numeric',month:'short', timeZone:'UTC'}).format(new Date(valor));
function App() {
  const [notas,setNotas]=useState(cargar);
  const [vista,setVista]=useState('notas');
  const [consulta,setConsulta]=useState('');
  const [seleccion,seleccionar]=useState('lisboa');
  const [error,setError]=useState(false);
  const visibles=buscarNotas(notas,vista,consulta);
  const nota=visibles.find(n=>n.id===seleccion) || visibles[0];
  useEffect(()=>{try {localStorage.setItem(clave,JSON.stringify(notas));setError(false);} catch {setError(true);}},[notas]);
  function editar(campos) {setNotas(prev=>prev.map(n=>n.id===nota.id ? {...n,...campos,fecha:dia()} : n));}
  function abrir(v) {setVista(v);setConsulta('');seleccionar(null);}
  function nueva() {
    const id=crypto.randomUUID();
    setNotas(prev=>[{id,titulo:'Sin título',cuerpo:'',archivada:false,fecha:dia()},...prev]);
    setVista('notas');setConsulta('');seleccionar(id);
  }
  return <div className="app">
    <header className="barra">
      <div className="marca"><i aria-hidden="true"/>Margen</div>
      <nav aria-label="Vistas">{[['notas','Notas'],['archivo','Archivo']].map(([v,nombre])=><button aria-pressed={vista===v} key={v} onClick={()=>abrir(v)}>{nombre}<small>{notas.filter(n=>n.archivada===(v==='archivo')).length}</small></button>)}</nav>
      <button className="crear" onClick={nueva}>＋ Nueva nota</button>
    </header>
    <div className="mesa"><section className="indice">
      <header><h1>{vista==='archivo'?'Archivo':'Cuaderno'}</h1></header>
      <label className="buscar"><i aria-hidden="true"/><input type="search" aria-label="Buscar notas" placeholder="Buscar en esta vista…" value={consulta} onChange={e=>setConsulta(e.target.value)}/></label>
      <div className="lista">{visibles.map(n=><button key={n.id} aria-pressed={nota?.id===n.id} onClick={()=>seleccionar(n.id)}>
        <small>{fechaCorta(n.fecha)}{n.archivada?' · Archivada':''}</small><strong>{n.titulo||'Sin título'}</strong><span>{n.cuerpo.split('\n')[0]||'Nota vacía'}</span>
      </button>)}{!visibles.length&&<p>Sin notas en esta vista.</p>}</div>
    </section>
    <main>{nota ? <><header className="herramientas"><span>{nota.archivada?'Archivo':'Notas'}　/　Editor</span><button onClick={()=>editar({archivada:!nota.archivada})}>{nota.archivada?'Restaurar':'Archivar'}</button></header>
      <article>{nota.id==='lisboa' && <figure><img src={capa} alt="Portada ilustrada del viaje a Lisboa"/><b aria-hidden="true">LIS</b><figcaption>38°43′ N　09°08′ O</figcaption></figure>}
      <div className="papel"><p className="fecha">{fechaCorta(nota.fecha)} {nota.fecha.slice(0,4)}</p><input className="titulo" aria-label="Título" value={nota.titulo} onChange={e=>editar({titulo:e.target.value})}/>
      <textarea aria-label="Contenido" placeholder="Empieza a escribir…" value={nota.cuerpo} onChange={e=>editar({cuerpo:e.target.value})}/></div></article>
      <footer role="status"><i/>{error?'No se ha podido guardar en este dispositivo':'Guardado en este dispositivo'}</footer></> : <p className="vacio">Selecciona o crea una nota.</p>}</main>
    </div></div>;
}
createRoot(document.getElementById('root')).render(<App/>);
