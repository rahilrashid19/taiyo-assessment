import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  addContact,
  deleteContact,
  editContact,
} from "../utils/slices/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store/store";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
}

interface FormValues {
  firstname: string;
  lastname: string;
  status: "active" | "inactive";
}

const ContactPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContactId, setCurrentContactId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      firstname: "",
      lastname: "",
      status: "inactive",
    },
  });

  const dispatch = useDispatch();

  const contactData = useSelector(
    (state: RootState) => state.contactSlice.contacts
  );

  const showContactForm = () => {
    setShowForm(true);
    setIsEditing(false);
    reset(); // Clear the form when opening
  };

  const submitForm: SubmitHandler<FormValues> = (data) => {
    if (isEditing && currentContactId !== null) {
      // If editing, dispatch the editContact action
      dispatch(
        editContact({
          id: currentContactId,
          firstName: data.firstname,
          lastName: data.lastname,
          status: data.status,
        })
      );
    } else {
      // If creating a new contact, dispatch the addContact action
      const newContact: Contact = {
        id: Date.now(),
        firstName: data.firstname,
        lastName: data.lastname,
        status: data.status,
      };

      dispatch(addContact(newContact));
    }

    setShowForm(false);
    reset();
  };

  const handleEdit = (contact: Contact) => {
    setCurrentContactId(contact.id);
    setValue("firstname", contact.firstName);
    setValue("lastname", contact.lastName);
    setValue("status", contact.status);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl flex justify-center items-center flex-col px-4 sm:px-6 lg:px-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-6 w-full sm:w-auto"
            onClick={showContactForm}
          >
            {"Create Contact"}
          </button>
          {showForm && (
            <form
              onSubmit={handleSubmit(submitForm)}
              noValidate
              className="bg-white p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name:
                </label>
                <input
                  type="text"
                  {...register("firstname", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name:
                </label>
                <input
                  type="text"
                  {...register("lastname", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status:
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="active"
                      {...register("status")}
                      className="mr-2"
                    />
                    Active
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="inactive"
                      {...register("status")}
                      className="mr-2"
                    />
                    Inactive
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-4 w-full"
              >
                {isEditing ? "Update Contact" : "Save Contact"}
              </button>
            </form>
          )}
          {!showForm && contactData.length === 0 && (
            <div className="p-4 mb-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md shadow-md w-full">
              <h3 className="font-semibold text-lg">No Contact Found</h3>
              <p>Please add a contact using the "Create Contact" button.</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-4">
            {contactData.map((contact) => (
              <div
                key={contact.id}
                className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center items-center h-20 bg-gray-200 rounded-md mb-4">
                  <span className="text-gray-700 font-bold text-lg text-center">
                    {contact.firstName} {contact.lastName}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
