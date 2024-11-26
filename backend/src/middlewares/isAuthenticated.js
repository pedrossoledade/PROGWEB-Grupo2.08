function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        req.user = { id: req.session.userId };
        return next();
    }
    res.status(401).json({ message: 'Não autorizado' });
}

module.exports = isAuthenticated;