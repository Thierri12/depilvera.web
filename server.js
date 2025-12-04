const express = require('express');
const app = express();

// Servir página inicial
app.get('/', (req, res) => {
  res.send('Servidor funcionando no localhost!');
});

// Porta padrão
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
