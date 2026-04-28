export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full">
      <h1 className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-12">
        Privacy <span className="text-purple-500">Policy</span>
      </h1>
      
      <div className="font-mono text-neutral-800 dark:text-neutral-300 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">1. Information Collection</h2>
          <p>
            When you interact with the E118 Elements catalog, we may collect basic authentication data (if you choose to register an account). This authentication is handled securely through Firebase Authentication. We do not store or process real credit card information or physical addresses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">2. Use of Information</h2>
          <p>
            Any information collected is used solely to maintain your active cart state and simulate the e-commerce checkout flow. Your data will never be sold, rented, or distributed to third parties under any circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">3. Local Storage & Cookies</h2>
          <p>
            E118 Elements uses local storage mechanisms (via Zustand) to persist your shopping cart across sessions and browser reloads. We do not deploy tracking cookies or third-party analytics pixels.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">4. Data Security</h2>
          <p>
            While we implement a variety of security measures to maintain the safety of your personal information, remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure.
          </p>
        </section>

        <section className="pt-8 mt-12 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500">
            Last Updated: April 2026. For inquiries, contact <a href="mailto:tusakovskyj@gmail.com" className="text-purple-500 hover:underline">tusakovskyj@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
