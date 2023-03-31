import jwt from 'jsonwebtoken'


 const verify = async (req, res, next) => {
    try {
        const token = await req.cookies['secret'];

        if(token==undefined){
            res.redirect("/auth/login");
        }

        else{
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            req.user = payload.user;
            next();
        }

    } catch (error) {
        res.status(500).json({
            message: "User not authorized, internal server error",
            error: error
        });
    }
}

export default verify;
