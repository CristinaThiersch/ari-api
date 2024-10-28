const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt'); 
const jwtConfig = require('../../configs/jwtConfig'); 

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwtConfig.generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.', details: error.message });
  }
};

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  try {
    const user = jwtConfig.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}

const logout = async (req, res) => {
  try {
  const token = req.headers['authorization'].split(' ')[1];
  jwtConfig.blacklistToken(token);
  res.status(200).json({ message: 'Logout realizado com sucesso'
  });
  } catch (error) {
  res.status(500).json({ error: 'Erro ao realizar logout.' });
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const {email} = req.body;
    const comparativo = email.split('@')[1];
    if (comparativo === 'admin.com.br'){
      res.status(200).json({email});
      next();
    }
  } catch (error) {
    res.status(401).json({error: "Você não tem permissão para acessar esse recurso.", details: error.message});
  }
}
  
module.exports = {autenticarToken, login, logout, isAdmin};
