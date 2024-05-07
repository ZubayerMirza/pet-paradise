import express, { Router}  from "express";
import login from "./login";
import pet from "./pet";
import items from "./items";
import friends from "./friends";
import myLevel from "./level";
// to organize as different usage, router used  
export const router: Router = express.Router();

router.use('/', login);
router.use('/', pet);
router.use('/', items);
router.use('/', friends);
router.use('/', myLevel);

export default router;
   