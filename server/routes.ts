import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const savedContact = await storage.createContactMessage(contactData);
      res.status(201).json({ success: true, message: "Contact message submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: fromZodError(error) });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit contact message" });
    }
  });
  
  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscription = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterByEmail(subscription.email);
      
      if (existingSubscription) {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      
      const savedSubscription = await storage.createNewsletterSubscription(subscription);
      res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email", details: fromZodError(error) });
      }
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });
  
  // Get all contact messages (admin feature)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve contact messages" });
    }
  });
  
  // Get all newsletter subscriptions (admin feature)
  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve newsletter subscriptions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
