import express from "express"

const router = express.Router();
import { getContacts, getContact, updateContact, createContact, deleteContact } from "../controllers/contactController.js";
import validateUser from "../middleware/validateUserHandler.js";

router.use(validateUser)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router