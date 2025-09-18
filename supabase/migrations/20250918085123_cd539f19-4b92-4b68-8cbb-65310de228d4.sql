-- Add SELECT policies to restrict access to sensitive data
-- These policies ensure only authenticated administrators can read the data

-- Contact inquiries: Restrict SELECT access
CREATE POLICY "Only authenticated users can view contact inquiries"
ON public.contact_inquiries
FOR SELECT
USING (false); -- No one can read without explicit permission

-- Newsletter subscriptions: Restrict SELECT access  
CREATE POLICY "Only authenticated users can view newsletter subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
USING (false); -- No one can read without explicit permission

-- Wholesale inquiries: Restrict SELECT access
CREATE POLICY "Only authenticated users can view wholesale inquiries" 
ON public.wholesale_inquiries
FOR SELECT
USING (false); -- No one can read without explicit permission