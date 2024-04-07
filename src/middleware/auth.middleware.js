function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

function getTokenFromRequest(req){
    if(req.header('x-jwt-assertion')){
        return req.header('x-jwt-assertion');
    }else if(typeof req.header('Authorization') === 'string'){
        return req.header('Authorization').split(" ")[1];
    }
    return null;
}

const tokenValidater = function (req, res, next) {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: 'Access denied', headers: JSON.stringify(req.headers, null, 2) });
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