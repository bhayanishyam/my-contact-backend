import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";


//@des Get all contacts
//@route Get /api/contact
//@access private
const getContacts = asyncHandler(async (req, res) => {
    //get all contact of current user
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts)
});


//@des Get Contact
//@route Get /api/contact/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    //get contact using id
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }

    // check the contact user_id is same as current user_id
    if (contact.user_id.toString() !== req.user.id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to access this contact");
    }

    res.status(200).json(contact)
});

//@des Create New Contact
//@route Post /api/contact
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All data are required");
    }

    // create new contact and with user_id
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone
    });

    if (!contact) {
        throw new Error("Contact not created");
    } else {
        res.status(201).json({ message: `New Contact created.` })
    }

});


//@des Update Contact
//@route Put /api/contact/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const user = req.user;
    // get the contact using id
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    // check the contact is user_id is same as current user_id
    if (contact.user_id.toString() !== req.user.id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to access this contact");
    }

    // Finally Update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { user_id: user.id, ...req.body },
        { new: true }
    );

    if (!updatedContact) {
        res.status(401);
        throw new Error("Not able to Update the contact.")
    } else {

        res.status(201).json({ message: `Contact Updated Successfully` });
    }

});


//@des delete Contact
//@route Delete /api/contact/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    // get the contact using id
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // check the user_id of contact is same as current user_id
    if (contact.user_id.toString() !== req.user.id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to access this contact");
    }

    // Finally delete the contact
    await contact.deleteOne();

    res.status(200).json(contact)
});



export { getContacts, getContact, createContact, updateContact, deleteContact };