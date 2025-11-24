import express from 'express';
import { usuarioRoutes } from './routes/usuario_routes';
import { insertLivro, getAllLivros, getLivroById, updateLivro, deleteLivro } from './models/livro';
import { insertFilme, getAllFilmes, getFilmeById, updateFilme, deleteFilme } from './models/filme';
import { insertSerie, getAllSeries, getSerieById, updateSerie, deleteSerie } from './models/serie';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.urlencoded({ extended: false }));

// Rota: página principal (catálogo)
app.get('/', async (req, res) => {
  try {
    const qRaw = (req.query.q || '').toString().trim().toLowerCase();
    const typeFilter = (req.query.type || '').toString();

    const [livros, filmes, series] = await Promise.all([
      getAllLivros().catch(() => []),
      getAllFilmes().catch(() => []),
      getAllSeries().catch(() => [])
    ]);

    // Unificar
    let items: any[] = [
      ...livros.map(l => ({ id: l.id, titulo: l.titulo, subtitle: l.autor, type: 'BOOK', disponivel: l.disponivel, capa: l.capa })),
      ...filmes.map(f => ({ id: f.id, titulo: f.titulo, subtitle: f.diretor, type: 'MOVIE', disponivel: f.disponivel, ano: f.ano, capa: f.capa })),
      ...series.map(s => ({ id: s.id, titulo: s.titulo, subtitle: s.criador, type: 'SERIES', disponivel: s.disponivel, temporadas: s.temporadas, capa: s.capa }))
    ];

    // Filtrar texto
    if (qRaw) {
      items = items.filter(i =>
        (i.titulo || '').toString().toLowerCase().includes(qRaw) ||
        (i.subtitle || '').toString().toLowerCase().includes(qRaw)
      );
    }

    // Filtrar tipo
    if (typeFilter) {
      items = items.filter(i => i.type === typeFilter);
    }

    // Ordenar (mais novo primeiro)
    items.sort((a, b) => (b.id || 0) - (a.id || 0));

    res.render('index', {
      message: null,
      items,
      q: req.query.q ?? '',
<<<<<<< HEAD
      type: req.query.type ?? ''
=======
      type: req.query.type ?? '',
      user: null

>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
    });
  } catch (err) {
    console.error(err);
    res.render('index', { message: { type: 'error', value: 'Erro ao carregar catálogo.' }, items: [], q: '', type: '' });
  }
});

// Rotas de usuário
app.use(usuarioRoutes);

// Contato
app.get('/contato', (req, res) => {
  res.render('contato');
});

// Livros
app.get('/livros', async (req, res) => {
  try {
    const livros = await getAllLivros();
    res.render('livros', { livros, message: null });
  } catch (err) {
    console.error(err);
    res.render('livros', { livros: [], message: { type: 'error', value: 'Erro ao carregar livros.' } });
  }
});

app.post('/livros/add', async (req, res) => {
  const { titulo, autor, capa } = req.body; // <--- adicionada
  if (!titulo || !autor) {
    const livros = await getAllLivros().catch(() => []);
    return res.render('livros', {
      livros,
      message: { type: 'error', value: 'Preencha título e autor.' }
    });
  }

  try {
    await insertLivro({ titulo: titulo.trim(), autor: autor.trim(), capa: capa?.trim() || null, id_usuario: 1 }); // <--- passa capa
    return res.redirect('/livros');
  } catch (err) {
    console.error(err);
    const livros = await getAllLivros().catch(() => []);
    return res.render('livros', {
      livros,
      message: { type: 'error', value: 'Erro ao salvar no banco.' }
    });
  }
});

// Filmes
app.get('/filmes', async (req, res) => {
  try {
    const filmes = await getAllFilmes();
    res.render('filmes', { filmes, message: null });
  } catch (err) {
    console.error(err);
    res.render('filmes', { filmes: [], message: { type: 'error', value: 'Erro ao carregar filmes.' } });
  }
});

app.post('/filmes/add', async (req, res) => {
  const { titulo, diretor, ano, capa } = req.body; // <--- adicionada
  if (!titulo || !diretor) {
    const filmes = await getAllFilmes().catch(() => []);
    return res.render('filmes', { filmes, message: { type: 'error', value: 'Preencha título e diretor.' } });
  }

  try {
    await insertFilme({ titulo: titulo.trim(), diretor: diretor.trim(), ano: ano ? Number(ano) : null, capa: capa?.trim() || null, id_usuario: 1 }); // <--- passa capa
    return res.redirect('/filmes');
  } catch (err) {
    console.error(err);
    const filmes = await getAllFilmes().catch(() => []);
    return res.render('filmes', { filmes, message: { type: 'error', value: 'Erro ao salvar no banco.' } });
  }
});

// Séries
app.get('/series', async (req, res) => {
  try {
    const series = await getAllSeries();
    res.render('series', { series, message: null });
  } catch (err) {
    console.error(err);
    res.render('series', { series: [], message: { type: 'error', value: 'Erro ao carregar séries.' } });
  }
});

app.post('/series/add', async (req, res) => {
  const { titulo, criador, temporadas, ano_inicio, capa } = req.body; 
  if (!titulo || !criador) {
    const series = await getAllSeries().catch(() => []);
    return res.render('series', { series, message: { type: 'error', value: 'Preencha título e criador.' } });
  }

  try {
    await insertSerie({
      titulo: titulo.trim(),
      criador: criador.trim(),
      temporadas: temporadas ? Number(temporadas) : null,
      ano_inicio: ano_inicio ? Number(ano_inicio) : null,
      capa: capa?.trim() || null, // <--- passa capa
      id_usuario: 1
    });
    return res.redirect('/series');
  } catch (err) {
    console.error(err);
    const series = await getAllSeries().catch(() => []);
    return res.render('series', { series, message: { type: 'error', value: 'Erro ao salvar no banco.' } });
  }
});

// Detalhes / edição / exclusão
app.get('/item/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    let item = null;
    if (type === 'BOOK') item = await getLivroById(Number(id));
    else if (type === 'MOVIE') item = await getFilmeById(Number(id));
    else if (type === 'SERIES') item = await getSerieById(Number(id));

    if (!item) return res.status(404).render('item', { item: null, type, message: { type: 'error', value: 'Item não encontrado.' } });

    res.render('item', { item, type, message: null });
  } catch (err) {
    console.error(err);
    res.render('item', { item: null, type: req.params.type, message: { type: 'error', value: 'Erro ao carregar item.' } });
  }
});

app.post('/item/:type/:id/edit', async (req, res) => {
  try {
    const { type, id } = req.params;
    if (type === 'BOOK') {
      const { titulo, autor, editora, ano_publicacao, capa } = req.body;
      await updateLivro(Number(id), { titulo, autor, editora, ano_publicacao: ano_publicacao ? Number(ano_publicacao) : null, capa: capa?.trim() || null });
      return res.redirect('/livros');
    }
    if (type === 'MOVIE') {
      const { titulo, diretor, ano, capa } = req.body;
      await updateFilme(Number(id), { titulo, diretor, ano: ano ? Number(ano) : null, capa: capa?.trim() || null });
      return res.redirect('/filmes');
    }
    if (type === 'SERIES') {
      const { titulo, criador, temporadas, ano_inicio, capa } = req.body;
      await updateSerie(Number(id), { titulo, criador, temporadas: temporadas ? Number(temporadas) : null, ano_inicio: ano_inicio ? Number(ano_inicio) : null, capa: capa?.trim() || null });
      return res.redirect('/series');
    }
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

app.post('/item/:type/:id/delete', async (req, res) => {
  try {
    const { type, id } = req.params;
    if (type === 'BOOK') await deleteLivro(Number(id));
    else if (type === 'MOVIE') await deleteFilme(Number(id));
    else if (type === 'SERIES') await deleteSerie(Number(id));
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.redirect('/');
  }
});

app.listen(3333, () => {
  console.log('Servidor rodando no endereço http://localhost:3333');
});