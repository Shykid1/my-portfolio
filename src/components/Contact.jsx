import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from "../utils/motion"

// 
// 
// 

const Contact = () => {
  const formRef =useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'service_p534n58',
      'template_1sscweh',
      {
        from_name: form.name,
        to_name: 'Yussif',
        from_email: form.email,
        to_email: 'yussifyahuza12@gmail.com',
        phone_number: form.number,
        message: form.message
      },
      'tSlCI6xGSyvVxw4Sq'
    )
    .then(() => {
      setLoading(false);
      alert('Thank you for contacting me. I will get back to you as soon as possible.');

      setForm({
        name: '',
        email: '',
        number: '',
        message: '',
      })
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong, refresh your page and try again!')
    })
  }
  

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get intouch</p>
        <h1 className={styles.sectionHeadText}>Contact.</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input 
              type="text" 
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name here"
              className="bg-tertiary py-4  px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"  
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input 
              type="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email here"
              className="bg-tertiary py-4  px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"  
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Phone Number</span>
            <input 
              type="text" 
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Your phone number here"
              className="bg-tertiary py-4  px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"  
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea 
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message here"
              className="bg-tertiary py-4  px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"  
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-2xl"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")