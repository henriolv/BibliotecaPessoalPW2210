import { connection } from "../infra/connection";

export type Livro = {
  titulo: string;
  autor: string;
  editora?: string | null;
  ano_publicacao?: number | null;
  status_leitura?: string;
  id_usuario?: number;
  id_categoria?: number | null;
  capa?: string | null;
};

// Insere um livro usando a estrutura do seu banco
export async function insertLivro(livro: Livro) {
  const id_usuario = livro.id_usuario ?? 1;
  await connection.query(
    `INSERT INTO livro
      (titulo, autor, editora, ano_publicacao, status_leitura, id_usuario, id_categoria, capa)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      livro.titulo,
      livro.autor,
      livro.editora ?? null,
      livro.ano_publicacao ?? null,
      livro.status_leitura ?? 'não_lido',
      id_usuario,
      livro.id_categoria ?? null,
      livro.capa ?? null
    ]
  );
}

export async function getAllLivros() {
  const { rows } = await connection.query(
    `SELECT
       id_livro AS id,
       titulo,
       autor,
       editora,
       ano_publicacao,
       status_leitura,
       data_adicao,
       id_usuario,
       id_categoria,
       capa
     FROM livro
     ORDER BY id_livro DESC`
  );

  return rows
}

export async function getLivroById(id: number) {
  const { rows } = await connection.query(
    `SELECT id_livro AS id, titulo, autor, editora, ano_publicacao, status_leitura, data_adicao, id_usuario, id_categoria, capa
     FROM livro WHERE id_livro = $1 LIMIT 1`, [id]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    titulo: r.titulo,
    autor: r.autor,
    editora: r.editora,
    ano_publicacao: r.ano_publicacao,
    status_leitura: r.status_leitura,
    data_adicao: r.data_adicao,
    id_usuario: r.id_usuario,
    id_categoria: r.id_categoria,
    capa: r.capa,
    disponivel: true
  };
}

export async function updateLivro(id: number, data: Partial<{ titulo: string; autor: string; editora?: string | null; ano_publicacao?: number | null; capa?: string | null }>) {
  await connection.query(
    `UPDATE livro SET titulo=$1, autor=$2, editora=$3, ano_publicacao=$4, capa=$5 WHERE id_livro=$6`,
    [data.titulo, data.autor ?? data.autor, data.editora ?? null, data.ano_publicacao ?? null, data.capa ?? null, id]
  );
}

export async function deleteLivro(id: number) {
  await connection.query(`DELETE FROM livro WHERE id_livro = $1`, [id]);
}