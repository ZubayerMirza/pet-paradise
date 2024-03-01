"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../models/users"));
const router = express_1.default.Router();
// post method for login  
router.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const testcase = {
        username: request.body.username,
        password: request.body.password
    };
    // find the username and password 
    yield users_1.default.findOne({ where: { username: testcase.username } })
        .then(res => {
        if (testcase.password == (res === null || res === void 0 ? void 0 : res.dataValues.password)) {
            response.json('yes');
            return;
        }
        response.json('no');
    });
}));
// post method for creating  
router.post('/signup', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // var id: number = 10;
    const testcase = {
        username: request.body.username,
        password: request.body.password
    };
    // enable for find or create the username 
    const [newUser, create] = yield users_1.default.findOrCreate({
        where: { username: testcase.username, password: testcase.password },
    });
    // console.log(newUser.dataValues.username);
    // console.log(create); // return as boolean 
    // if created,
    if (create) {
        response.json('Created');
        return;
    } // if username exists
    response.json('Username already exist');
}));
exports.default = router;
