import JWT from 'jsonwebtoken'
import { User } from '@prisma/client';
import { JWTUser } from '../interface';

const JWT_SECRET="$ancjs2039Aeen345"

class JWTService{
    public static  generateTokenForUser(user:User){
        const payload:JWTUser={
            id:user?.id,
            email:user?.email,
        };

        const token=JWT.sign(payload,JWT_SECRET);
        return token;

    }
    public static decodeToken(token:string){
        // console.log(token)
        try{
            return JWT.verify(token,JWT_SECRET) as JWTUser;
        }
        catch(e){
            // console.log(e)
            return null
        }
    }
}

export default JWTService;