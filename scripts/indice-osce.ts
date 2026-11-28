/* Gera src/data/osce/indice.json (público) a partir de stations.json (protegido no servidor). */
import fs from 'fs';
import data from '../src/data/osce/stations.json';
import type { Estacao } from '../src/osce/engine';
import { gerarIndice } from '../src/osce/indice';

fs.writeFileSync('src/data/osce/indice.json', JSON.stringify(gerarIndice(data as unknown as Estacao[])));
console.log('indice.json atualizado');
