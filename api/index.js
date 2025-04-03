// api/index.js
import express from 'express';
import { z } from 'zod';

// Simple in-memory storage
const storage = {
  contactMessages: [],
  newsletterSubscriptions: [],
  
  async createContactMessage(message) {
    const id = this.contactMessages.length + 1;
    const newMessage = { ...message, id };
    this.contactMessages.push(newMessage);
    return newMessage;
  },
  
  async getContactMessages() {
    return this.contactMessages;
  },
  
  async createNewsletterSubscription(subscription) {
    const id = this.newsletterSubscriptions.length + 1;
    const newSubscription = { ...subscription, id };
    this.newsletterSubscriptions.push(newSubscription);
    return newSubscription;
  },
  
  async getNewsletterByEmail(email) {
    return this.newsletterSubscriptions.find(sub => sub.email === email);
  },
  
  async getNewsletterSubscriptions() {
    return this.newsletterSubscriptions;
  }
};

// Create a simple contact schema
const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string()
});

// Create a simple newsletter schema
const newsletterSchema = z.object({
  email: z.string().email()
});

const app = express();
app.use(express.json());

// API routes
app.post('/api/contact', async (req, res) => {
  try {
    const contactData = contactSchema.parse(req.body);
    await storage.createContactMessage(contactData);
    res.status(201).json({ success: true, message: "Contact message submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid form data" });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    const subscription = newsletterSchema.parse(req.body);
    const existing = await storage.getNewsletterByEmail(subscription.email);
    if (existing) {
      return res.status(409).json({ error: "Email already subscribed" });
    }
    await storage.createNewsletterSubscription(subscription);
    res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
  } catch (error) {
    res.status(400).json({ error: "Invalid email" });
  }
});

// Fallback route to serve static frontend
app.use('*', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Your Application</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <h1>Your Application</h1>
        <p>The app is working! This is a simple fallback page.</p>
        <p>For development, please run the app locally.</p>
      </body>
    </html>
  `);
});

export default app;