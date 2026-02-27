"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { AnimatedBorder } from "@/components/ui/AnimatedBorder";
import { HUDElement } from "@/components/visuals/HUDElement";
import { GridBackground } from "@/components/visuals/GridBackground";

const inquiryTypes = ["", "Schedule Capability Demonstration", "Sales Inquiry", "Partnership Opportunity", "Media Inquiry", "Career Inquiry", "Other"];
const industries = ["", "Defense & National Security", "Law Enforcement & Public Safety", "Critical Infrastructure & Energy", "Stadiums, Campuses & Events", "Aviation & Emergency Response", "Other"];

const steps = [
  { number: "01", title: "Initial Response", description: "Response within one business day." },
  { number: "02", title: "Capability Demonstration", description: "Platform demonstration tailored to your operational environment." },
  { number: "03", title: "Deployment Planning", description: "Sensor configuration, integration requirements, and deployment timeline." },
];

const inputClasses =
  "w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:border-accent focus:shadow-[0_0_12px_rgba(0,255,148,0.08)] focus:outline-none transition-all placeholder:text-gray-700";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!fullName.trim()) newErrors.fullName = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;
    if (!organization.trim()) newErrors.organization = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      if (!formId) {
        toast.error("Contact form is temporarily unavailable. Please email contact@guardianrf.com directly.");
        return;
      }
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ fullName, email, organization, title, inquiryType, industry, message }),
      });
      if (res.ok) {
        toast.success("Message sent. We'll respond within 24 hours.");
        setFullName(""); setEmail(""); setOrganization(""); setTitle("");
        setInquiryType(""); setIndustry(""); setMessage("");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast.error("Failed to send. Please email contact@guardianrf.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-12 pb-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Form */}
          <AnimatedSection>
            <SectionLabel>Contact</SectionLabel>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em]">
              Get in touch
            </h1>

            <p className="text-lg text-gray-400 mt-3 mb-8">
              Tell us about your mission requirements.
            </p>

            <AnimatedBorder>
            <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                    Full Name
                  </label>
                  <input id="fullName" type="text" required placeholder="Your full name" value={fullName} onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: false })); }} className={`${inputClasses} ${errors.fullName ? "!border-danger" : ""}`} />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                    Work Email
                  </label>
                  <input id="email" type="email" required placeholder="you@organization.com" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: false })); }} className={`${inputClasses} ${errors.email ? "!border-danger" : ""}`} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organization" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                    Organization
                  </label>
                  <input id="organization" type="text" required placeholder="Your organization" value={organization} onChange={(e) => { setOrganization(e.target.value); setErrors((p) => ({ ...p, organization: false })); }} className={`${inputClasses} ${errors.organization ? "!border-danger" : ""}`} />
                </div>
                <div>
                  <label htmlFor="title" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                    Title
                  </label>
                  <input id="title" type="text" placeholder="Your role" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClasses} />
                </div>
              </div>

              <div>
                <label htmlFor="inquiryType" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                  Inquiry Type
                </label>
                <select id="inquiryType" value={inquiryType} onChange={(e) => setInquiryType(e.target.value)} className={`${inputClasses} appearance-none`}>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>{type || "Select an inquiry type"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="industry" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                  Industry
                </label>
                <select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className={`${inputClasses} appearance-none`}>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind || "Select your industry"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                  Message
                </label>
                <textarea id="message" rows={4} placeholder="Tell us about your requirements..." value={message} onChange={(e) => setMessage(e.target.value)} className={inputClasses} />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
            </AnimatedBorder>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection delay={0.15}>
            <div className="lg:pl-12 lg:border-l lg:border-gray-800 relative">
              <HUDElement corner="top-right" />
              <div className="relative overflow-hidden rounded-lg p-6 mb-8">
                <GridBackground />
                <h3 className="text-lg font-medium text-white mb-0 relative z-10">
                  What to expect
                </h3>
              </div>

              <div className="space-y-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-xs font-mono text-accent shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <p className="font-medium text-white">{step.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 my-10" />

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-600 mb-1">Email</p>
                  <p className="text-gray-400">contact@guardianrf.com</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-600 mb-1">Phone</p>
                  <p className="text-gray-400">(202) 937-9821</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-8">
                For career inquiries, visit our{" "}
                <a
                  href="https://www.ycombinator.com/companies/guardian-rf/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  YC jobs page
                </a>
                .
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
