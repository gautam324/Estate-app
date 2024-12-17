import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, TextInput, Textarea } from '@mantine/core';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to an API
    // For now, let's just log the data and show a success toast
    console.log(formData);
    toast.success('Message sent successfully!', { position: 'bottom-right' });
    setFormData({ name: '', email: '', message: '' }); // Clear form after submission
  };

  return (
    <section className="contact-section max-padd-container my-[99px]">
      <div className="flexCenter flex-col">
        <h2 className="bold-24 text-center mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <div className="space-y-4">
            <TextInput
              label="Your Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              required
            />
            <TextInput
              label="Your Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              required
            />
            <Textarea
              label="Your Message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              name="message"
              required
            />
          </div>

          <Button type="submit" className="w-full" color="blue">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
