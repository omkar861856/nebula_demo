import { 
  users, 
  type User, 
  type InsertUser,
  contactMessages,
  type Contact,
  type InsertContact,
  newsletterSubscriptions,
  type Newsletter,
  type InsertNewsletter
} from "@shared/schema";

// Modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContactMessage(message: InsertContact): Promise<Contact>;
  getContactMessages(): Promise<Contact[]>;
  
  // Newsletter methods
  createNewsletterSubscription(subscription: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, Contact>;
  private newsletterSubscriptions: Map<number, Newsletter>;
  currentId: number;
  contactId: number;
  newsletterId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscriptions = new Map();
    this.currentId = 1;
    this.contactId = 1;
    this.newsletterId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form methods
  async createContactMessage(message: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const contactMessage: Contact = { ...message, id };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<Contact[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Newsletter methods
  async createNewsletterSubscription(subscription: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterId++;
    const newsletterSubscription: Newsletter = { ...subscription, id };
    this.newsletterSubscriptions.set(id, newsletterSubscription);
    return newsletterSubscription;
  }
  
  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }
  
  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }
}

export const storage = new MemStorage();
