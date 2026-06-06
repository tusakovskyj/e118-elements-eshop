export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 w-full">
      <h1 className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-tighter mb-12">
        Terms of <span className="text-purple-500">Service</span>
      </h1>
      
      <div className="font-mono text-neutral-800 dark:text-neutral-300 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the E118 Elements catalog, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">2. The Elements Catalog</h2>
          <p>
            E118 Elements provides a highly synthesized, aesthetic catalog of the 118 fundamental elements of the universe. All products listed (from Hydrogen to Oganesson) are conceptual representations and are strictly for demonstrative and portfolio purposes. We do not actually ship weapons-grade Plutonium or liquid Mercury to your physical address.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">3. Pricing & Credits</h2>
          <p>
            Prices are listed in "Credits (c)" and are scaled based on real-world elemental rarity, extraction difficulty, and market value. All transactions executed through this platform are simulated and processed using test credentials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">4. Intellectual Property</h2>
          <p>
            The E118 brand, visual design, custom element imagery, and minimalist copy are the intellectual property of the developer. The underlying periodic table and the universe itself remain strictly open-source.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-4">5. Limitation of Liability</h2>
          <p>
            Under no circumstances shall E118 Elements be liable for any direct, indirect, special, incidental, or consequential damages resulting from the use of, or the inability to use, our simulated atomic marketplace. Handling radioactive materials in reality is dangerous; please consult your local regulatory body.
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
