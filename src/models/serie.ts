<<<<<<< HEAD
import { connection } from "../infra/connection";

export type Serie = {
  titulo: string;
  criador: string;
  temporadas?: number | null;
  ano_inicio?: number | null;
  id_usuario?: number;
  data_adicao?: string;
  capa?: string | null;
};

export async function insertSerie(s: Serie) {
  const id_usuario = s.id_usuario ?? 1;
  await connection.query(
    `INSERT INTO serie (titulo, criador, temporadas, ano_inicio, id_usuario, capa)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [s.titulo, s.criador, s.temporadas ?? null, s.ano_inicio ?? null, id_usuario, s.capa ?? null]
  );
}

export async function getAllSeries() {
  const { rows } = await connection.query(
    `SELECT id_serie AS id, titulo, criador, temporadas, ano_inicio, data_adicao, id_usuario, capa
     FROM serie
     ORDER BY id_serie DESC`
  );

  return rows.map((r: any) => ({
    id: r.id,
    titulo: r.titulo,
    criador: r.criador,
    temporadas: r.temporadas,
    ano_inicio: r.ano_inicio,
    data_adicao: r.data_adicao,
    id_usuario: r.id_usuario,
    capa: r.capa,
    disponivel: true
  }));
}

export async function getSerieById(id: number) {
  const { rows } = await connection.query(
    `SELECT id_serie AS id, titulo, criador, temporadas, ano_inicio, data_adicao, id_usuario, capa
     FROM serie WHERE id_serie = $1 LIMIT 1`, [id]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    titulo: r.titulo,
    criador: r.criador,
    temporadas: r.temporadas,
    ano_inicio: r.ano_inicio,
    data_adicao: r.data_adicao,
    id_usuario: r.id_usuario,
    capa: r.capa,
    disponivel: true
  };
}

export async function updateSerie(id: number, data: Partial<{ titulo: string; criador: string; temporadas?: number | null; ano_inicio?: number | null; capa?: string | null }>) {
  await connection.query(
    `UPDATE serie SET titulo=$1, criador=$2, temporadas=$3, ano_inicio=$4, capa=$5 WHERE id_serie=$6`,
    [data.titulo, data.criador, data.temporadas ?? null, data.ano_inicio ?? null, data.capa ?? null, id]
  );
}

export async function deleteSerie(id: number) {
  await connection.query(`DELETE FROM serie WHERE id_serie = $1`, [id]);
=======
import { connection } from "../infra/connection";

export type Serie = {
  titulo: string;
  criador: string;
  temporadas?: number | null;
  ano_inicio?: number | null;
  id_usuario?: number;
  data_adicao?: string;
  capa?: string | null;
};

export async function insertSerie(s: Serie) {
  const id_usuario = s.id_usuario ?? 1;
  await connection.query(
    `INSERT INTO serie (titulo, criador, temporadas, ano_inicio, id_usuario, capa)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [s.titulo, s.criador, s.temporadas ?? null, s.ano_inicio ?? null, id_usuario, s.capa ?? null]
  );
}

export async function getAllSeries() {
  const { rows } = await connection.query(
    `SELECT id_serie AS id, titulo, criador, temporadas, ano_inicio, data_adicao, id_usuario, capa
     FROM serie
     ORDER BY id_serie DESC`
  );

  return rows.map((r: any) => ({
    id: r.id,
    titulo: r.titulo,
    criador: r.criador,
    temporadas: r.temporadas,
    ano_inicio: r.ano_inicio,
    data_adicao: r.data_adicao,
    id_usuario: r.id_usuario,
    capa: r.capa,
    disponivel: true
  }));
}

export async function getSerieById(id: number) {
  const { rows } = await connection.query(
    `SELECT id_serie AS id, titulo, criador, temporadas, ano_inicio, data_adicao, id_usuario, capa
     FROM serie WHERE id_serie = $1 LIMIT 1`, [id]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    titulo: r.titulo,
    criador: r.criador,
    temporadas: r.temporadas,
    ano_inicio: r.ano_inicio,
    data_adicao: r.data_adicao,
    id_usuario: r.id_usuario,
    capa: r.capa,
    disponivel: true
  };
}

export async function updateSerie(id: number, data: Partial<{ titulo: string; criador: string; temporadas?: number | null; ano_inicio?: number | null; capa?: string | null }>) {
  await connection.query(
    `UPDATE serie SET titulo=$1, criador=$2, temporadas=$3, ano_inicio=$4, capa=$5 WHERE id_serie=$6`,
    [data.titulo, data.criador, data.temporadas ?? null, data.ano_inicio ?? null, data.capa ?? null, id]
  );
}

export async function deleteSerie(id: number) {
  await connection.query(`DELETE FROM serie WHERE id_serie = $1`, [id]);
>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
}