const express = require('express');
const db = require('./models');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// ============================================
// CRUD DE AUTORES (AUTHORS)
// ============================================

// CREATE - Crear un nuevo autor
app.post('/api/authors', async (req, res) => {
  const { name } = req.body;
  const author = await db.Author.create({ name });
  res.status(201).json(author);
});

// READ - Obtener todos los autores
app.get('/api/authors', async (req, res) => {
  const authors = await db.Author.findAll();
  res.json(authors);
});

// READ - Obtener un autor por ID
app.get('/api/authors/:id', async (req, res) => {
  const { id } = req.params;
  const author = await db.Author.findByPk(id);

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  res.json(author);
});

// UPDATE - Actualizar un autor por ID
app.patch('/api/authors/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const author = await db.Author.findByPk(id);

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  author.name = name;
  await author.save();
  res.json(author);
});

// DELETE - Eliminar un autor por ID
app.delete('/api/authors/:id', async (req, res) => {
  const { id } = req.params;
  const author = await db.Author.findByPk(id);

  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }

  await author.destroy();
  res.json({ message: 'Autor eliminado correctamente' });
});

// ============================================
// CRUD DE PUBLICACIONES (POSTS)
// ============================================

// CREATE - Crear una nueva publicación
app.post('/api/posts', async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await db.Post.create({ title, content, authorId });
  res.status(201).json(post);
});

// READ - Obtener todas las publicaciones
app.get('/api/posts', async (req, res) => {
  const posts = await db.Post.findAll();
  res.json(posts);
});

// READ - Obtener una publicación por ID
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const post = await db.Post.findByPk(id);

  if (!post) {
    return res.status(404).json({ error: 'Publicación no encontrada' });
  }

  res.json(post);
});

// UPDATE - Actualizar una publicación por ID
app.patch('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await db.Post.findByPk(id);

  if (!post) {
    return res.status(404).json({ error: 'Publicación no encontrada' });
  }

  post.title = title;
  post.content = content;
  await post.save();
  res.json(post);
});

// DELETE - Eliminar una publicación por ID
app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const post = await db.Post.findByPk(id);

  if (!post) {
    return res.status(404).json({ error: 'Publicación no encontrada' });
  }

  await post.destroy();
  res.json({ message: 'Publicación eliminada correctamente' });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
