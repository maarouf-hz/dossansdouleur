import { legalPagesMetadata } from "@/lib/seo";
import ContactForm from "./Contactform";

export const metadata = legalPagesMetadata.contact;

export default function ContactPage() {
  return <ContactForm />;
}