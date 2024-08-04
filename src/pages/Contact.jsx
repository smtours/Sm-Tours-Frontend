import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";

const Contact = () => {
  const [email,setemail]=useState("")
  const [subject,setsubject]=useState("")
    const [message,setmessage]=useState("")
    const isvalid=()=>{
      return email.trim()!=="" || subject.trim()!=="" || message.trim()!==""
    }
  const handlesubmit=async(e)=>{
    e.preventDefault()
    if(!isvalid()){
      return toast.error("All fields are required")
    }

   const {data}=await axios.post(`${BASE_URL}/sendmail`,{email,subject,message})
   if(data){
    toast.success("Email has benn sent")
    setemail("")
    setmessage("")
    setsubject("")
    
   }else{
    toast.error("Email has not been send")
   }
  }
  return (
    <section className="md:min-h-screen">
      <div className="px-4 py-8 md:py-2 m-auto max-w-screen-md">
        <h2 className="heading text-center ">Contact Us</h2>
        <p className="mb-16 lg:mb-10 font-light text-center paragraph">
          Got any issue? Want to reach us? Let us know.
        </p>

        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="form_label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={((e)=>setemail(e.target.value))}
              placeholder="example@tmail.com"
              className="form_input mt-1"
            />
          </div>
          <div>
            <label htmlFor="subject" className="form_label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know about how can we help you?"
              className="form_input mt-1"
              name="subject"
              value={subject}
              onChange={((e)=>setsubject(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="message" className="form_label">
              Your Message
            </label>
            <textarea
              type="text"
              id="message"
              rows="2"
              placeholder="Leave a Message..."
              className="form_input mt-1"
              value={message}
              name="message"
              onChange={((e)=>setmessage(e.target.value))}
            ></textarea>
          </div>

          <button  type="submit" className="btn w-full my-4">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
