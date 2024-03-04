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
const users_1 = __importDefault(require("./users"));
const dummySet = [
    { username: "John", password: "123" },
    { username: "test", password: "abcdef" },
    { username: "yay", password: "fffff" },
    { username: "rabbit", password: "djklajf" }
];
const DummyDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // testing to check 
    // wheter model is synchronized with mysql
    try {
        yield users_1.default.sync({ force: false });
        console.log("----- Succeed for table sync -----");
    }
    catch (error) {
        console.log("----- Failed for table sync -----");
    }
    ;
    // create the table with the dummy data
    dummySet.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Test = yield users_1.default.create(data);
            // console.log(Test.dataValues);
        }
        catch (error) {
            // console.log("----- Data EXISTANT -----");
        }
    }));
});
exports.default = DummyDB;
