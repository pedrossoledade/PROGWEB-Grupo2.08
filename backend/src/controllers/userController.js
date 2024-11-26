const userService = require('../services/userService');

class UserController {

    async register(req, res){
        try {
            const result = await userService.register(req.body);
            req.session.userId = result.user.id; // Salvar o ID do usuário na sessão
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(error.message.includes('já existe') ? 400 : 500)
               .json({ message: error.message || 'Internal server error' });
        }
    }

    async login(req, res){
        try {
            const result = await userService.login(req.body);
            req.session.userId = result.user.id; // Salvar o ID do usuário na sessão
            res.status(200).json({ message: 'Login realizado com sucesso' });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(error.message.includes('obrigatório') ? 400 : 401)
               .json({ message: error.message || 'Internal server error' });
        }
    }

    async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao fazer logout' });
            }
            res.status(200).json({ message: 'Logout realizado com sucesso' });
        });
    }
}

module.exports = new UserController();
