import { useState } from "react";
import Title from "../components/Title";

function Contact() {
  Title("Contact with us!");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [email, setEmail] = useState("selennurkarakayaa@gmail.com");

  const onChange = (e) => setMessage(e.target.value);
  const onChangeSubject = (e) => setSubject(e.target.value);

  return (
    <div className="flex flex-col justify-center items-center mx-autor">
      <header className="border-b border-dotted border-mediumOrange w-1/2">
        <p className="text-2xl mt-2 text-center ">Contact With Us!</p>
      </header>
      <form className="md:w-3/4 flex flex-col justify-center items-center my-6 space-y-4">
        <div className="col-span-full">
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Subject
          </label>

          <textarea
            name="subject"
            id="subject"
            rows="1"
            cols="70"
            className="textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={subject}
            onChange={onChangeSubject}
          ></textarea>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Message
          </label>
          <textarea
            placeholder="Write a few sentences about your opinion and suggestion or problems."
            name="message"
            id="message"
            rows="8"
            cols="70"
            className="textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={message}
            onChange={onChange}
          ></textarea>
        </div>

        <a href={`mailto:${email}?Subject=${subject}&body=${message}`}>
          <button
            type="button"
            className="bg-mediumOrange p-2 rounded-lg text-indigo-100 hover:bg-indigo-100 hover:text-mediumOrange hover:scale-110"
          >
            Send Message
          </button>
        </a>
      </form>
    </div>
  );
}

export default Contact;
