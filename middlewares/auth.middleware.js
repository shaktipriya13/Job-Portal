// The auth.middleware.js file contains middleware that protects your routes by ensuring that only authenticated users can access them.
//we would be comparing the client token and server token,if both are same then only the protected routes are shown to user
//header-token, payload-data,sign= jwt key

// when application loads, we hv 2 things, body and header, body contains our page data to be displayed and header contains the metadata which also inclueds jwt token in it
// we are going to get token from the header part, header section is needed behind the scene by the webpage and even the search engine needs it
// when we write routes, first url is written and at last controller that needs to be excuted in that route is written and b/w the 2 we can write any no. of middlewares
// login/register time jo token we got whi  use krna ha userAuth time
// when we do a login/register a token is automatically created, in time of frontend we are going to store the token received in the local storage
// iska mtlb jo pehle token create hua aur jo humne headers me bheja agar wo match hua to user is authroiszed

import JWT from "jsonwebtoken";

// now this userAuth can be used in  any of the routes to protect it
const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next(new Error("Auth Failed, didn't received any token"));
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId }
        next();
    } catch (err) {
        return next(new Error("Auth Failed, didn't received any token"));
    }
}

export default userAuth;
