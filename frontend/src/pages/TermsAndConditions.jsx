import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h1 className="text-primary mb-3">Terms and Conditions</h1>
        <p className="text-muted">Last updated: April 20, 2025</p>

        <section className="mb-4">
          <h4>1. Acceptance of Terms</h4>
          <p>
            By accessing or using our Microsoft Store app, you agree to be bound by these terms. If you disagree with any part of the terms, you may not use the app.
          </p>
        </section>

        <section className="mb-4">
          <h4>2. Use of the App</h4>
          <p>
            You agree to use the app only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the app.
          </p>
        </section>

        <section className="mb-4">
          <h4>3. Intellectual Property</h4>
          <p>
            All content, trademarks, and data on this app are the property of the app owner or its licensors and are protected by copyright and intellectual property laws.
          </p>
        </section>

        <section className="mb-4">
          <h4>4. Termination</h4>
          <p>
            We reserve the right to suspend or terminate your access to the app if you violate these Terms and Conditions.
          </p>
        </section>

        <section className="mb-4">
          <h4>5. Limitation of Liability</h4>
          <p>
            We are not liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the app.
          </p>
        </section>

        <section className="mb-4">
          <h4>6. Changes to These Terms</h4>
          <p>
            We may update these terms at any time. Continued use of the app after changes means you accept the new terms.
          </p>
        </section>

        <section className="mb-2">
          <h4>7. Contact Us</h4>
          <p>
            If you have any questions about these Terms and Conditions, contact us at <a href="mailto:support@example.com">support@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
