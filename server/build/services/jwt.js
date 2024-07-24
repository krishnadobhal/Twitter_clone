"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "$ancjs2039Aeen345";
class JWTService {
    static generateTokenForUser(user) {
        const payload = {
            id: user === null || user === void 0 ? void 0 : user.id,
            email: user === null || user === void 0 ? void 0 : user.email,
            createdAt: user === null || user === void 0 ? void 0 : user.createdAt
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET);
        return token;
    }
    static decodeToken(token) {
        // console.log(token)
        try {
            return jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (e) {
            // console.log(e)
            return null;
        }
    }
}
exports.default = JWTService;
