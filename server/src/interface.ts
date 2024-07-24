export interface JWTUser{
    id:string,
    email:string,
    createdAt:Date
}
export interface GraphqlContext{
    user?:JWTUser;
}