import jwt from "jsonwebtoken";

export const SECRET = 'my-secret-key';

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, admin) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.admin = admin;
            next();
        });
    } else {
        res.status(401).send();
    }
};

export default authenticateJwt;


