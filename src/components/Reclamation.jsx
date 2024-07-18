import React, { useState } from "react";
import emailjs from "emailjs-com";
import { createReclamation } from "../api"; // Adjust the path as necessary

const Reclamation = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    num: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { from_name, from_email, num, subject, message } = formData;
    const templateParams = {
      to_name: "BestOfficial",
      from_name,
      from_email,
      subject,
      message,
    };

    try {
      // Send email
      await emailjs.send(
        "service_upneb3e",
        "template_y7i0wpg",
        templateParams,
        "YdXLNqq8kBSgulaMS"
      );

      // Save reclamation to database
      const reclamationData = {
        fullname: from_name,
        email: from_email,
        num,
        subject,
        message,
      };
      await createReclamation(reclamationData);

      alert("Reclamation sent successfully");
    } catch (error) {
      console.error("Failed to send reclamation.", error);
      alert("Failed to send reclamation");
    }
  };

  return (
    <div className="relative overflow-hidden bg-gray-900 rounded-2xl mx-4 my-8 sm:mx-8 lg:mx-16">
      <div className="px-8 py-8 sm:px-12 lg:px-16 lg:py-14">
      <h1 className='text-lg lg:text-base md:text-sm uppercase text-white font-semibold mb-4'>Contact US!</h1>
        <div className="md:flex md:items-center md:space-x-12 lg:space-x-24">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-6 xl:gap-x-12 w-full">
            {[
              { label: "from_email", placeholder: "write your email here ..." },
              { label: "from_name", placeholder: "write your name here ..." },
              { label: "num" , placeholder:"write your phone number here ..." },
              { label: "subject", placeholder:"write your subject here ..."  },
            ].map((field) => (
              <input
                key={field.label}
                type={field.label === "from_email" ? "email" : "text"}
                name={field.label}
                value={formData[field.label]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            ))}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="p-2 border border-gray-300 rounded-md w-full col-span-2"
            />
          </div>
          <div className="hidden lg:flex items-center justify-center lg:block lg:ml-12">
            <svg
              className="w-4 h-auto text-gray-600"
              viewBox="0 0 16 123"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 11)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 46)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 81)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 116)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 18)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 53)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 88)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 123)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 25)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 60)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 95)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 32)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 67)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 102)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 39)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 74)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 109)"
              ></line>
            </svg>
          </div>
          <div className="mt-10 md:mt-0 md:flex md:items-center md:justify-center">
            <a
              title="Get quote now"
              className="inline-flex items-center justify-center px-6 py-3 mt-5 text-base font-bold text-gray-900 transition-all duration-200 bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-opacity-90 rounded-xl"
              href="#support"
              onClick={handleSubmit}
            >
              Contact Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reclamation;
