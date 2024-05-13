"use client";
import Image from "next/image";
import Logo from "@/app/assets/logoPic.png";
import AllPic from "@/app/assets/Screenshot 2024-05-02 at 11.37.12.png";
import Rond from "@/app/assets/rond.png";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetName = (e) => setName(e.target.value);
  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetLanguage = (e) => setLanguage(e.target.value);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("Processing your subscription...");
    try {
      const response = await axios.post('/api/subscribe', { email,name,language });
      setIsSubmitting(true);  
      setStatusMessage("Thank you for subscribing!");
      setName("");
      setEmail("");
      setLanguage("");
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setStatusMessage("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <main className="bg-green-100">
      <div className="flex justify-center md:justify-start">
        <Image src={Logo} alt="aloevera Logo" width={250} />
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex-1 order-1 md:order-1 ml-2 my-4 md:my-1">
          <Image src={AllPic} alt="pictures" width={600} />
        </div>
        <div className="flex-1 flex flex-col order-2 md:order-2 mx-3 ">
          <h2 className="text-3xl font-poppins md:text-5xl font-bold text-white mb-4">
            RECEIVE YOUR GIFT !
          </h2>
          <p className="text-xl text-white font-poppins custom-text-stroke mb-6 md:mr-24">
            Sign up for our newsletter and receive immediately your first gift !
          </p>
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-sm">
              <input
                onChange={handleSetName}
                value={name}
                className="mb-4 w-full px-4 py-2 text-lg bg-transparent border-b-2 border-black focus:border-white outline-none placeholder-white"
                type="text"
                placeholder="Firstname"
              />
              <label className=" text-white mb-4 w-full px-4 py-2 text-lg bg-transparent  ">
                {" "}
                Select a language
              </label>
              <select
                value={language}
                onChange={handleSetLanguage}
                className="text-white  mb-4 w-full px-4 py-2 text-lg bg-transparent border-b-2 border-black focus:border-white outline-none placeholder-white"
              >
                <option value="english">English</option>
                <option value="French">French</option>
                <option value="Portugues">Portugues</option>
              </select>
              <input
                onChange={handleSetEmail}
                value={email}
                className="w-full px-4 py-2 text-lg bg-transparent border-b-2 border-black focus:border-white outline-none placeholder-white"
                type="email"
                placeholder="E-mail"
              />
            </div>
            {!isSubmitting ? (
              <button
              type="submit"
              className="mt-6 bg-white text-2xl font-extrabold text-green-100 py-4 px-8 rounded-3xl md:w-96 transition-colors"
            >
              SUBSCRIBE
            </button>
            ) : (
              <p
              className="mt-6  bg-white text-2xl font-extrabold text-green-100 py-4 px-8 rounded-3xl md:w-96 transition-colors"
            >
            {statusMessage}
            </p>
            )}
          </form>
        </div>
        <div className="flex flex-row-reverse order-3 md:order-3 ">
          <Image
            src={Rond}
            alt="product"
            priority
            className="border-none md:mt-24"
          />
        </div>
      </div>
    </main>
  );
}
