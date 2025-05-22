
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const WholesaleForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    additionalInfo: "",
    existingRetailer: false,
    newsletter: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Wholesale Application Received!",
        description: "We'll review your application and get back to you shortly.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Your Business Name"
          required
          className="bg-black/5 border-gray-700 focus:border-lucky-green"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Business Website</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourbusiness.com"
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Business St."
          className="bg-black/5 border-gray-700 focus:border-lucky-green"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="New York"
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="NY"
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP/Postal Code</Label>
          <Input
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="10001"
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
            className="bg-black/5 border-gray-700 focus:border-lucky-green"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Tell us about your business, your customers, or ask any questions you may have."
          className="min-h-[100px] bg-black/5 border-gray-700 focus:border-lucky-green"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="existingRetailer" 
          checked={formData.existingRetailer}
          onCheckedChange={(checked) => 
            handleCheckboxChange("existingRetailer", checked as boolean)
          }
        />
        <Label htmlFor="existingRetailer" className="text-sm">
          I currently sell disc golf products at my store/online
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="newsletter" 
          checked={formData.newsletter}
          onCheckedChange={(checked) => 
            handleCheckboxChange("newsletter", checked as boolean)
          }
        />
        <Label htmlFor="newsletter" className="text-sm">
          Subscribe to our wholesale newsletter for product updates and special offers
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full md:w-auto bg-lucky-green text-black hover:bg-white hover:text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default WholesaleForm;
