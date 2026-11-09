/** A lead reached Morgan only if it was stored or the notification email was accepted. */
export function leadWasDelivered(saved: boolean, emailed: boolean): boolean {
  return saved || emailed;
}

export const LEAD_NOT_DELIVERED_ERROR = "Your details could not be saved. Try again.";
