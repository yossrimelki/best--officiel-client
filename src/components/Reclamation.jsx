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
        <h1 className="text-lg lg:text-base md:text-sm uppercase text-white font-semibold mb-4">
          Contact Us!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="from_name" className="text-white mb-1 block">Name</label>
              <input
                id="from_name"
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                placeholder="Your name"
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="from_email" className="text-white mb-1 block">Email</label>
              <input
                id="from_email"
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                placeholder="Your email"
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="num" className="text-white mb-1 block">Phone Number</label>
              <input
                id="num"
                type="text"
                name="num"
                value={formData.num}
                onChange={handleChange}
                placeholder="Your phone number"
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="subject" className="text-white mb-1 block">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="text-white mb-1 block">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="p-2 border border-gray-300 rounded-md w-full"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 text-base font-bold text-gray-900 transition-all duration-200 bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-opacity-90 rounded-xl"
            >
              Contact Us Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reclamation;
