function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const tokenValidater = function (req, res, next) {
    const token = req.header('x-jwt-assertion');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = parseJwt(token);

        req.auth = {};
        req.auth.userId = decoded.sub;
        req.auth.name = decoded.name;
        req.auth.email = decoded.username;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = tokenValidater;