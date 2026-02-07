import { z } from "zod"

export const applicationFormSchema = z.object({
  fullName: z.string()
    .min(2, "Please enter your full name (at least 2 characters)")
    .max(50, "Name is too long (maximum 50 characters)")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
  
  mobile: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number starting with 6-9"),
  
  email: z.string()
    .email("Please enter a valid email address (e.g., name@example.com)")
    .max(100, "Email is too long (maximum 100 characters)"),
  
  city: z.string()
    .min(2, "Please enter your city (at least 2 characters)")
    .max(50, "City name is too long (maximum 50 characters)"),
  
  occupation: z.enum([
    "employed",
    "self-employed", 
    "homemaker",
    "student",
    "retired"
  ], { message: "Please select your current occupation from the dropdown" }),
  
  reason: z.string()
    .min(10, "Please tell us more about your motivation (at least 10 characters)")
    .max(500, "Your response is too long (maximum 500 characters)"),
  
  education: z.enum([
    "10th",
    "12th", 
    "graduate",
    "post-graduate"
  ], { message: "Please select your educational qualification from the dropdown" }),
  
  salesExperience: z.enum(["yes", "no"], { message: "Please select whether you have sales experience" })
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
