export default function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shipping Policy</h1>

      <section className="max-w-2xl mx-auto space-y-4">
        <p>
          We ensure timely delivery of your orders. Orders are typically
          processed within 1-2 business days and shipped via our trusted
          partners.
        </p>
        <h2 className="text-xl font-bold mt-4">Shipping Rates:</h2>
        <p>
          Shipping costs are calculated at checkout based on your location and
          order size.
        </p>

        <h2 className="text-xl font-bold mt-4">International Shipping:</h2>
        <p>
          We currently do not ship internationally. Stay tuned for future
          updates!
        </p>

        <h2 className="text-xl font-bold mt-4">Contact Us:</h2>
        <p>
          If you have any questions, please visit our{" "}
          <a href="/contact-us" className="text-green-400 underline">
            Contact Us
          </a>{" "}
          page.
        </p>
      </section>
    </main>
  );
}
