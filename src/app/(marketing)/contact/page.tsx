"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const inquiryTypes = ["", "Request a Demo", "Sales Inquiry", "Partnership Opportunity", "Media Inquiry", "Career Inquiry", "Other"];
const industries = ["", "Defense & National Security", "Law Enforcement & Public Safety", "Critical Infrastructure & Energy", "Stadiums, Campuses & Events", "Aviation & Emergency Response", "Other"];

const steps = [
  { number: "01", title: "Quick Response", description: "We'll respond within 24 hours to schedule a call." },
  { number: "02", title: "Platform Walkthrough", description: "See the Intelligence Platform in action with your use case." },
  { number: "03", title: "Custom Configuration", description: "Discuss sensor deployment and integration for your requirements." },
];

const inputClasses =
  "w-full bg-transparent border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder:text-gray-700";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="py-24 pt-32">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <AnimatedSection>
            <SectionLabel>Contact</SectionLabel>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Get in touch
            </h1>

            <p className="text-base text-gray-400 mt-4 mb-10">
              Tell us about your mission requirements.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                    Full Name
                  </label>
                  <input id="fullName" type="text" required placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                    Work Email
                  </label>
                  <input id="email" type="email" required placeholder="you@organization.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organization" className="text-xs text-gray-400 mb-2 block font-mono uppercase tracking-wider">
                    Organization
                  </label>
                  <input id="organization" type="text" required placeholder="Your organization" value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClasses} />
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

              <button
                type="submit"
                className="bg-white text-black font-medium rounded-md px-6 py-3 text-sm hover:bg-gray-100 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection delay={0.15}>
            <div className="lg:pl-12 lg:border-l lg:border-gray-800">
              <h3 className="text-lg font-medium text-white mb-8">
                What to expect
              </h3>

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
