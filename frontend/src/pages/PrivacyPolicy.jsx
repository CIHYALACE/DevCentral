import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h1 className="text-primary mb-3">Privacy Policy</h1>
        <p className="text-muted">Last updated: April 20, 2025</p>

        <section className="mb-4">
          <h4>1. Introduction</h4>
          <p>
            Welcome to our Microsoft Store App. We are committed to protecting your privacy and ensuring a safe user experience. This Privacy Policy explains how we collect and use your personal information.
          </p>
        </section>

        <section className="mb-4">
          <h4>2. Data We Collect</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Personal identification (name, email, etc.)</li>
            <li className="list-group-item">Device information and usage stats</li>
            <li className="list-group-item">Purchase history and preferences</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>3. How We Use Your Data</h4>
          <p>
            We use your data to enhance your experience, provide customer support, analyze app usage, and comply with legal obligations.
          </p>
        </section>

        <section className="mb-4">
          <h4>4. Sharing Information</h4>
          <p>
            Your data may be shared with trusted third parties (e.g., payment providers, analytics services) strictly to support app functionality.
          </p>
        </section>

        <section className="mb-4">
          <h4>5. Your Rights</h4>
          <p>
            You have the right to access, update, or delete your personal information. Contact our support team to make a request.
          </p>
        </section>

        <section className="mb-4">
          <h4>6. Changes to This Policy</h4>
          <p>
            We may update this Privacy Policy occasionally. We'll notify you of any major changes.
          </p>
        </section>

        <section className="mb-2">
          <h4>7. Contact Us</h4>
          <p>
            For questions about this policy, email us at <a href="mailto:support@gmail.com">support@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;