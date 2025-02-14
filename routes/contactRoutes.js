const express = require("express");

const router = express.Router()
const { getContacts, getContact, updateContact, createContact, deleteContact } = require("../controllers/contactController");
const validateUser = require("../middleware/validateUserHandler");

router.use(validateUser)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router