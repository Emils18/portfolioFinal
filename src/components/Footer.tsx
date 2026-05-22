import ContactForm from "./ContactForm";

export default function Footer() {
  return (
    <footer id="contact" className="section-padding border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <a
            href="mailto:mondares@example.com"
            className="text-2xl font-light text-white/60 transition-colors hover:text-white sm:text-3xl"
          >
            mondares@example.com
          </a>
          <div className="flex gap-6 text-sm text-white/30">
            <a
              href="https://github.com/Emils18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <span>Cebu, Philippines</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </footer>
  );
}