import type { Testimonial } from "@/types/testimonial";
import testimonialsData from "@/content/testimonials.json";

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}
