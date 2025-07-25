import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white p-6 font-sans-serif text-black">
      <h1 className="text-3xl font-bold mb-6 text-green-500">Privacy Policy</h1>

      <p>Your privacy is important to us. This policy explains what information we collect and how we use it.</p>

      <h2 className="font-semibold mt-4 text-black">1. Information We Collect</h2>
      <p>
        In order to deliver and enhance our services, we gather personal data. We may gather personal information like your
        name, email address, phone number, shipping address, and payment details when you place an order, register, or use
        our website.
      </p>

      <h2 className="font-semibold mt-4 text-black">2. How We Use Your Information</h2>
      <p>
        If you consent, we will use your information to process your orders, send you updates, keep in contact, and enhance
        our offerings. Additionally, we use it to improve your shopping experience, make product recommendations you might
        like and protect our platform from fraud.
      </p>

      <h2 className="font-semibold mt-4 text-black">3. Data Security and Retention</h2>
      <p>
        Although we use secure servers and encryption to protect your data, no system is 100% safe. To stop unwanted access,
        we update our systems on a regular basis. Additionally, you are in charge of protecting the information associated
        with your account. We keep your data only as long as needed to complete your orders and meet legal requirements.
        After that, we securely delete or anonymize it.
      </p>

      <h2 className="font-semibold mt-4 text-black">4. Third-Party Services</h2>
      <p>
        We may use trusted third-party services like analytics tools, advertising partners, or customer support tools to
        enhance your experience. These third parties may collect certain information as needed to perform their functions
        but are not allowed to use your data for other purposes. We ensure they follow privacy and data protection standards.
      </p>

      <h2 className="font-semibold mt-4 text-black">5. Sharing Information</h2>
      <p>
        To fulfill your orders, we exchange information with trusted partners like shipping firms and payment processors.
        Your information is never sold to outside parties.
      </p>

      <h2 className="font-semibold mt-4 text-black">6. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information. You can also unsubscribe from marketing
        emails at any time. Please contact us if you have any requests.
      </p>

      <h2 className="font-semibold mt-4 text-black">7. Cookies</h2>
      <p>
        We use cookies to enhance your experience. You can disable cookies in your browser settings, but some features may
        not work properly. Cookies help us remember your preferences and show you relevant content. We also use them to
        analyze website traffic and performance.
      </p>

      <h2 className="font-semibold mt-4 text-black">8. Changes to This Policy</h2>
      <p>
        This policy may be updated periodically. We encourage you to check it from time to time as any changes will be posted
        here. You agree to the updated terms if you keep using our website.
      </p>

      {/* <p className="text-center font-semibold text-green-500">
        If you have questions, contact us at{" "}
        <a href="mailto:info@geckobasket.com">info@geckobasket.com</a>.
      </p> */}
    </div>
  );
};

export default PrivacyPolicy;
