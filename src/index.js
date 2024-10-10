const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../configs/swaggerConfig');
const userRoutes = require('./routes/user'); 
const medicationRoutes = require('./routes/medication');
const prescriptionRoutes = require('./routes/prescription');
const historyRoutes = require('./routes/history');
const loginRoutes = require('./routes/login');
const env = require('dotenv').config();
;

app.use(express.json());

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usa as rotas de usuários
app.use(userRoutes);
app.use(medicationRoutes);
app.use(prescriptionRoutes);
app.use(historyRoutes);
app.use(loginRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
