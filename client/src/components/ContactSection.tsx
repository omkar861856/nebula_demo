import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { insertContactSchema, insertNewsletterSchema } from '@shared/schema';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  
  // Contact form schema with validation
  const contactFormSchema = insertContactSchema.extend({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    message: z.string().min(10, "Message must be at least 10 characters")
  });
  
  // Newsletter schema with validation
  const newsletterSchema = insertNewsletterSchema.extend({
    email: z.string().email("Please enter a valid email address")
  });
  
  // Contact form submission
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "PRODUCT INQUIRY",
      message: ""
    }
  });
  
  // Newsletter form submission
  const newsletterForm = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: ""
    }
  });
  
  // Contact mutation
  const contactMutation = useMutation({
    mutationFn: (data: z.infer<typeof contactFormSchema>) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Transmitted",
        description: "Your message has been sent successfully.",
        variant: "default",
      });
      contactForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  });
  
  // Newsletter mutation
  const newsletterMutation = useMutation({
    mutationFn: (data: z.infer<typeof newsletterSchema>) => {
      return apiRequest('POST', '/api/newsletter', data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription Confirmed",
        description: "You have successfully joined our network.",
        variant: "default",
      });
      newsletterForm.reset();
    },
    onError: (error: any) => {
      if (error.message.includes("409")) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our network.",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
      console.error(error);
    }
  });
  
  // Form submit handlers
  const onContactSubmit = (data: z.infer<typeof contactFormSchema>) => {
    contactMutation.mutate(data);
  };
  
  const onNewsletterSubmit = (data: z.infer<typeof newsletterSchema>) => {
    newsletterMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[#080808] bg-opacity-80"></div>
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f" 
          alt="Digital background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-digital text-4xl font-bold text-[#00FF41] mb-4 animate-flicker tracking-wider">CONTACT THE OPERATOR</h2>
            <p className="font-matrix text-[#4AFF83] max-w-2xl mx-auto">HAVE QUESTIONS? NEED ASSISTANCE? SEND A MESSAGE THROUGH THE DIGITAL NETWORK.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-black bg-opacity-80 p-8 rounded neon-border"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="font-digital text-2xl text-[#00FF41] mb-6">SEND A MESSAGE</h3>
              
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-matrix text-[#4AFF83]">YOUR NAME</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full bg-transparent border border-[#00FF41] text-[#4AFF83] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF41] font-matrix"
                            placeholder="ENTER YOUR NAME"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-matrix text-[#4AFF83]">YOUR EMAIL</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="w-full bg-transparent border border-[#00FF41] text-[#4AFF83] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF41] font-matrix"
                            placeholder="ENTER YOUR EMAIL"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-matrix text-[#4AFF83]">SUBJECT</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-transparent border border-[#00FF41] text-[#4AFF83] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF41] font-matrix">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black border border-[#00FF41]">
                            <SelectItem value="PRODUCT INQUIRY" className="font-matrix text-[#4AFF83]">PRODUCT INQUIRY</SelectItem>
                            <SelectItem value="ORDER STATUS" className="font-matrix text-[#4AFF83]">ORDER STATUS</SelectItem>
                            <SelectItem value="TECHNICAL SUPPORT" className="font-matrix text-[#4AFF83]">TECHNICAL SUPPORT</SelectItem>
                            <SelectItem value="OTHER" className="font-matrix text-[#4AFF83]">OTHER</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-matrix text-[#4AFF83]">MESSAGE</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={4}
                            className="w-full bg-transparent border border-[#00FF41] text-[#4AFF83] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF41] font-matrix"
                            placeholder="ENTER YOUR MESSAGE"
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF0000]" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="matrix-button w-full bg-[#00FF41] text-black font-matrix py-3 rounded tracking-wide hover:bg-opacity-90 text-lg neon-border"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                  </Button>
                </form>
              </Form>
            </motion.div>
            
            <div>
              <motion.div 
                className="bg-black bg-opacity-80 p-8 rounded neon-border mb-10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="font-digital text-2xl text-[#00FF41] mb-6">JOIN THE NETWORK</h3>
                <p className="font-matrix text-[#4AFF83] mb-6">SUBSCRIBE TO OUR NEWSLETTER TO RECEIVE EXCLUSIVE OFFERS, NEW RELEASE NOTIFICATIONS, AND SPECIAL ACCESS CODES.</p>
                
                <Form {...newsletterForm}>
                  <form onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)} className="flex flex-col sm:flex-row">
                    <FormField
                      control={newsletterForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-grow mb-2 sm:mb-0">
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="w-full bg-transparent border border-[#00FF41] text-[#4AFF83] p-3 rounded-l focus:outline-none focus:ring-2 focus:ring-[#00FF41] font-matrix"
                              placeholder="ENTER YOUR EMAIL"
                            />
                          </FormControl>
                          <FormMessage className="text-[#FF0000] mt-1" />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit"
                      className="matrix-button bg-[#00FF41] text-black font-matrix py-3 px-6 rounded-r tracking-wide hover:bg-opacity-90 sm:ml-0"
                      disabled={newsletterMutation.isPending}
                    >
                      {newsletterMutation.isPending ? "JOINING..." : "SUBSCRIBE"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
              
              <motion.div 
                className="bg-black bg-opacity-80 p-8 rounded neon-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-digital text-2xl text-[#00FF41] mb-6">FIND US</h3>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-[#00FF41] mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <p className="font-matrix text-[#4AFF83]">101 DIGITAL AVENUE</p>
                      <p className="font-matrix text-[#4AFF83]">ZION DISTRICT, MATRIX CITY</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-[#00FF41] mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <p className="font-matrix text-[#4AFF83]">+1 (555) NEBULA-01</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-[#00FF41] mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <p className="font-matrix text-[#4AFF83]">INFO@NEBULARECORDS.COM</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-matrix text-[#00FF41] mb-4">FOLLOW THE WHITE RABBIT</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-[#00FF41] hover:text-[#4AFF83] transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-[#00FF41] hover:text-[#4AFF83] transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-[#00FF41] hover:text-[#4AFF83] transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-[#00FF41] hover:text-[#4AFF83] transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
