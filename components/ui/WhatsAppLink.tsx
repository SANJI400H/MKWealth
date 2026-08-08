import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/site-config";

interface WhatsAppLinkProps {
  message: string;
  className?: string;
  children: ReactNode;
}

export default function WhatsAppLink({ message, className = "", children }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cta="whatsapp"
    >
      {children}
    </a>
  );
}
