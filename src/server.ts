import app from './app'

const PORT = process.env.PORT || 3000

// Inicia o servidor 🌐
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀 - http://localhost:${PORT}`)
})
