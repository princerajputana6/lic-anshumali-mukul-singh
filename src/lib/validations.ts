import { z } from "zod"

export const applicationFormSchema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  
  mobile: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  
  city: z.string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),
  
  occupation: z.enum([
    "employed",
    "self-employed", 
    "homemaker",
    "student",
    "retired"
  ]).refine((val) => val !== undefined, {
    message: "Please select your current occupation"
  }),
  
  reason: z.string()
    .min(10, "Please provide at least 10 characters")
    .max(500, "Reason must be less than 500 characters"),
  
  education: z.enum([
    "10th",
    "12th", 
    "graduate",
    "post-graduate"
  ]).refine((val) => val !== undefined, {
    message: "Please select your educational qualification"
  }),
  
  salesExperience: z.enum(["yes", "no"]).refine((val) => val !== undefined, {
    message: "Please select if you have sales experience"
  })
})

export type ApplicationFormData = z.infer<typeof applicationFormSchema>

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  
  email: z.string()
    .email("Please enter a valid email address"),
  
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .optional(),
  
  subject: z.string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
})

export type ContactFormData = z.infer<typeof contactFormSchema>
