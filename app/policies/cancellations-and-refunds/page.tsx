export default function CancellationsAndRefunds() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cancellations and Refunds
      </h1>

      <section className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mt-4">Order Cancellations:</h2>
        <p>
          Orders can be canceled within 24 hours of purchase. To request a
          cancellation, contact our support team.
        </p>

        <h2 className="text-xl font-bold mt-4">Refund Policy:</h2>
        <p>
          If you are unsatisfied with your purchase, you can request a refund
          within 14 days of delivery. Items must be in their original condition.
        </p>

        <h2 className="text-xl font-bold mt-4">Contact Us:</h2>
        <p>
          For assistance, visit our{" "}
          <a href="/contact-us" className="text-green-400 underline">
            Contact Us
          </a>{" "}
          page.
        </p>
      </section>
    </main>
  );
}
