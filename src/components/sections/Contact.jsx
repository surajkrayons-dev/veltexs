import React, { useRef } from 'react';
import { useContactAnimation } from '../../hooks/useScrollAnimations';

export default function Contact() {
  const sectionRef = useRef(null);

  useContactAnimation({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ffffff] text-[#0f172a] py-14 px-[6vw] overflow-hidden "
      id="contact"
      aria-label="Contact Veltex"
    >
      <div className="grid grid-cols-1 gap-16 items-start">
        <div>
          <p className="contact-label font-sans text-[1rem] tracking-[0.3em] font-bold uppercase text-[#666] py-4">
            (Get in touch)
          </p>

          <h2 className="contact-heading font-serif text-[clamp(2.5rem,4.5vw,6rem)] font-medium leading-[1.05] tracking-[-0.025em] mb-12 mt-4 text-[#0f172a]">
            For project enquiries,
            {" "}
            <em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] drop-shadow-sm pr-2 py-1">collaborations,</em>

            or joining the studio.
          </h2>

          <div className="contact-actions flex items-center gap-4 flex-wrap">
            <a
              href="mailto:Hello@veltexs.com"
              className="contact-submit-btn inline-flex items-center gap-2 font-sans text-[0.9rem] font-medium text-white bg-gradient-to-r from-[#0066cc] to-[#00aaff] px-9 py-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:from-[#00aaff] hover:to-[#8cc63f] hover:-translate-y-[2px] tracking-wide outline-none shadow-[0_4px_16px_rgba(0,170,255,0.3)] hover:shadow-[0_8px_24px_rgba(140,198,63,0.4)]"
              aria-label="Send an enquiry email to Veltex"
              id="contact-enquiry-btn"
            >
              Send an enquiry
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="https://wa.me/919485628238?text=hi"
              className="contact-submit-btn inline-flex items-center gap-2 font-sans text-[0.9rem] font-medium text-white bg-[#8cc63f] px-9 py-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#a3d858] hover:-translate-y-[2px] tracking-wide outline-none shadow-[0_4px_16px_rgba(109,198,67,0.3)]"
              aria-label="Book a discovery call with Veltex"
              id="contact-call-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Subtle info row */}
          <div className="contact-info-row mt-16 pt-8 border-t border-black/10 flex gap-12 flex-col gap-6">

            {/* Open To */}
            <div className="contact-info-item">
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mb-1.5">
                Open to
              </p>
              <p className="font-sans text-[0.9rem] font-normal text-[#0f172a]">
                Across India &amp; Global Creative Projects
              </p>
            </div>

            {/* Email */}
            <div className="contact-info-item">
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mb-1.5">
                Email
              </p>
              <p className="font-sans text-[0.9rem] font-normal text-[#0f172a]">
                hello@veltexs.com
              </p>
            </div>

            {/* Business Chat */}
            {/* <div className="contact-info-item">
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mb-1.5">
                Business Chat
              </p>
              <p className="font-sans text-[0.9rem] font-normal text-[#0f172a]">
                We are available 24x7 on chat support,{' '}
                <a
                  href="https://wa.me/919212108750?text=hi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative inline-block font-semibold text-[#0066cc] hover:text-[#004fa3] transition-colors duration-300 cursor-pointer"
                >
                  click to start chat.
                  <span className="absolute bottom-[-2px] left-0 w-full h-[1.5px] bg-[#0066cc] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </p>
            </div> */}

          </div>
        </div>
      </div>
    </section>
  );
}

