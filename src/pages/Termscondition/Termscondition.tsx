import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white p-6 font-sans-serif text-black">
      <h1 className="text-3xl font-bold mb-6 text-green-500">Terms and Conditions</h1>

      <p>
        The rules and regulations for using our website and buying locally produced goods are described in these terms and
        conditions.
      </p>

      <h2 className="font-semibold mt-4">1. User Agreement</h2>
      <p>
        By using Gecko Basket, you agree to follow these Terms and Conditions. These rules apply to your use of our website
        and any purchases you make. We may update these terms sometimes, and by continuing to use the site, you accept those
        changes.
      </p>

      <h2 className="font-semibold mt-4">2. User Responsibilities</h2>
      <p>
        Please give correct information and use our services legally and responsibly. Any illegal, harmful, or disruptive
        behavior is prohibited. Please respect other users and do not engage in harassment or impersonation.
      </p>

      <h2 className="font-semibold mt-4">3. Account Information</h2>
      <p>
        When you create an account on Gecko Basket, you are responsible for keeping your login details secure. Do not share
        your password with anyone. You are responsible for all activity that happens under your account. If you believe your
        account has been accessed without your permission, please contact us immediately.
      </p>

      <h2 className="font-semibold mt-4">4. Limitation of Liability</h2>
      <p>
        Any loss or damage resulting from using our site, including mistakes, disruptions, or third-party problems, is not our
        responsibility. You acknowledge that you are using our service at your own risk.
      </p>

      <h2 className="font-semibold mt-4">5. Shipping and Delivery</h2>
      <p>
        We deliver within specified areas. Delivery times may vary. Shipping charges may apply. We are not responsible for
        delays caused by the courier or other unforeseen events. A notification will be sent to you as soon as your order
        ships.
      </p>

      <h2 className="font-semibold mt-4">6. Returns</h2>
      <p>
        Please get in touch with us within seven days to set up a return if you receive defective or incorrect merchandise.
        We'll swap out the product. Items must be returned in their original packaging and condition. Please preserve your
        receipt as evidence of purchase.
      </p>

      <h2 className="font-semibold mt-4">7. Orders and Payment</h2>
      <p>
        Orders can be placed online. We accept various payment methods like cash on delivery and online payments. Payment
        security is a priority.
      </p>

      <h2 className="font-semibold mt-4">8. Changes to Terms</h2>
      <p>
        We may update these terms at any time. Please review them regularly. Changes will take effect as soon as they are
        posted on the website. By continuing to use the site, you accept the updated terms.
      </p>

      {/* <p className="text-center font-semibold text-green-500">
        If you have any questions, contact us at{" "}
        <a href="mailto:info@geckobasket.com">info@geckobasket.com</a>.
      </p> */}
    </div>
  );
};

export default TermsAndConditions;
