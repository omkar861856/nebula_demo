// api/index.js
import express from 'express';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Fallback route to serve the index.html
app.use('*', (req, res) => {
    try {
      // Path to index.html in the public directory
      const indexPath = path.join(__dirname, '../dist/public/index.html');
      console.log('Serving index.html from:', indexPath);
      
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        // Fallback if file doesn't exist
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Your Application</title>
            </head>
            <body>
              <h1>Your Application</h1>
              <p>Frontend build not found. Please check the deployment logs.</p>
            </body>
          </html>
        `);
      }
    } catch (error) {
      console.error('Error serving frontend:', error);
      res.status(500).send('Server Error');
    }
  });

export default app;