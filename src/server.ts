import app from './app'

const PORT = process.env.PORT || 3000

console.log(
  'Layered API Starter 🚀 - Um projeto robusto para acelerar seu backend.'
)

// Inicia o servidor 🌐
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀 - http://localhost:${PORT}`)
})
