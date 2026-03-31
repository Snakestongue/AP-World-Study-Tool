
import {Router} from "express";
import {register} from "../Controllers/user.controller.js"; 
import {login} from "../Controllers/user.controller.login.js"; 
import {summerizeNotes} from "../Controllers/summerize.js"
import {saveNote,getNotes } from "../Controllers/save.notes.js";
import {flashcardGenerator} from "../Controllers/flashcard.js"
import {questionGenerator} from "../Controllers/MCQ.js"
const router = Router();

router.route("/login").post(login);
router.route("/question").post(questionGenerator)
router.route("/flashcard").post(flashcardGenerator);
router.route("/generate").post(summerizeNotes);
router.route("/register").post(register);
router.route("/notes").post(saveNote).get(getNotes);
export default router;