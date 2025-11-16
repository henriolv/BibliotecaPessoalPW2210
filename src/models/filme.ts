import { connection } from "../infra/connection";

export type Filme = {
  titulo: string;
  diretor: string;
  ano?: number | null;
  id_usuario?: number;
  data_adicao?: string;
  capa?: string | null;
};

export async function insertFilme(f: Filme) {
  const id_usuario = f.id_usuario ?? 1;
  await connection.query(
    `INSERT INTO filme (titulo, diretor, ano, id_usuario, capa)
     VALUES ($1, $2, $3, $4, $5)`,
    [f.titulo, f.diretor, f.ano ?? null, id_usuario, f.capa ?? null]
  );
}

export async function getAllFilmes() {
  const { rows } = await connection.query(
    `SELECT id_filme AS id, titulo, diretor, ano, data_adicao, id_usuario, capa
     FROM filme
     ORDER BY id_filme DESC`
  );

  return rows.map((r: any) => ({
    id: r.id,
    titulo: r.titulo,
    diretor: r.diretor,
    ano: r.ano,
    data_adicao: r.data_adicao,
    id_usuario: r.id_usuario,
    capa: r.capa,
    disponivel: true
  }));
}

export async function getFilmeById(id: number) {
  const { rows } = await connection.query(
    `SELECT id_filme AS id, titulo, diretor, ano, data_adicao, id_usuario, capa
     FROM filme WHERE id_filme = $1 LIMIT 1`, [id]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    titulo: r.titulo,
    diretor: r.diretor,
    ano: r.ano,
    data_adicao: r.data_adicao,
    id_usuario: r.id_usuario,
    capa: r.capa,
    disponivel: true
  };
}

export async function updateFilme(id: number, data: Partial<{ titulo: string; diretor: string; ano?: number | null; capa?: string | null }>) {
  await connection.query(
    `UPDATE filme SET titulo=$1, diretor=$2, ano=$3, capa=$4 WHERE id_filme=$5`,
    [data.titulo, data.diretor, data.ano ?? null, data.capa ?? null, id]
  );
}

export async function deleteFilme(id: number) {
  await connection.query(`DELETE FROM filme WHERE id_filme = $1`, [id]);
}