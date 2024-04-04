import express, { Router}  from "express";
import login from "./login";
import pet from "./pet";
import items from "./items";
// to organize as different usage, router used  
export const router: Router = express.Router();

router.use('/', login);
router.use('/', pet);
router.use('/', items);

export default router;