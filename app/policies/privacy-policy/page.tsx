export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>

      <section className="max-w-2xl mx-auto space-y-4">
        <p>
          We value your privacy and are committed to protecting your personal
          data.
        </p>

        <h2 className="text-xl font-bold mt-4">Data Collection:</h2>
        <p>
          We collect information you provide when making purchases or contacting
          support. This includes your name, email, and shipping address.
        </p>

        <h2 className="text-xl font-bold mt-4">Use of Data:</h2>
        <p>
          Your data is used to process orders, improve services, and communicate
          updates.
        </p>

        <h2 className="text-xl font-bold mt-4">Contact Us:</h2>
        <p>
          If you have concerns, visit our{" "}
          <a href="/policies/contact-us" className="text-green-400 underline">
            Contact Us
          </a>{" "}
          page.
        </p>
      </section>
    </main>
  );
}
