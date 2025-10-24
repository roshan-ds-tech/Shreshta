import { motion } from 'motion/react';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-white">
      {/* Hero Section */}
      <section className="bg-[#2C1810] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl text-[#FFF8E7] mb-4 font-serif"
          >
            Privacy Policy & Terms
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#C5A572]"
          >
            Last updated: October 24, 2025
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-[#C5A572]/30 p-8 md:p-12 space-y-8"
          >
            {/* Privacy Policy */}
            <div>
              <h2 className="text-2xl text-[#2C1810] mb-4 font-serif border-b-2 border-[#D4AF37] pb-2">
                Privacy Policy
              </h2>
              
              <div className="space-y-6 text-[#5C4033]">
                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">1. Information We Collect</h3>
                  <p>
                    We collect information that you provide directly to us, including your name, email address, phone number, shipping address, and payment information when you make a purchase. We also collect information about your browsing behavior on our website through cookies and similar technologies.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">2. How We Use Your Information</h3>
                  <p>
                    We use the information we collect to process your orders, communicate with you about your purchases, send promotional materials (with your consent), improve our products and services, and comply with legal obligations. We never sell your personal information to third parties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">3. Data Security</h3>
                  <p>
                    We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">4. Cookies</h3>
                  <p>
                    Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser, but disabling cookies may limit some functionality of our website.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">5. Third-Party Services</h3>
                  <p>
                    We may use third-party service providers to help us operate our business, such as payment processors and shipping companies. These third parties have access to your information only to perform specific tasks on our behalf and are obligated to maintain confidentiality.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">6. Your Rights</h3>
                  <p>
                    You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time. To exercise these rights, please contact us at privacy@puregur.com.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="pt-8 border-t border-[#C5A572]/30">
              <h2 className="text-2xl text-[#2C1810] mb-4 font-serif border-b-2 border-[#D4AF37] pb-2">
                Terms & Conditions
              </h2>
              
              <div className="space-y-6 text-[#5C4033]">
                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using our website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">2. Product Information</h3>
                  <p>
                    We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, images, or other content on our website are accurate, complete, or error-free. All products are subject to availability.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">3. Pricing</h3>
                  <p>
                    All prices are in Indian Rupees (₹) and are subject to change without notice. We reserve the right to modify prices at any time. The price charged will be the price displayed at the time of order placement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">4. Order Acceptance</h3>
                  <p>
                    We reserve the right to refuse or cancel any order for any reason, including product availability, errors in pricing or product information, or suspected fraudulent activity. If your order is cancelled, we will notify you and issue a full refund.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">5. Shipping & Delivery</h3>
                  <p>
                    We aim to deliver products within the estimated timeframe, but delivery times are not guaranteed. We are not responsible for delays caused by shipping carriers or circumstances beyond our control. Risk of loss passes to you upon delivery.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">6. Returns & Refunds</h3>
                  <p>
                    Please refer to our Return Policy for detailed information about returns and refunds. Products must be returned in original condition within 7 days of delivery to be eligible for a refund.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">7. Intellectual Property</h3>
                  <p>
                    All content on this website, including text, graphics, logos, images, and software, is the property of PureGur and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use any content without our written permission.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">8. Limitation of Liability</h3>
                  <p>
                    To the fullest extent permitted by law, PureGur shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">9. Governing Law</h3>
                  <p>
                    These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg text-[#2C1810] mb-2">10. Contact Information</h3>
                  <p>
                    If you have any questions about these Terms and Conditions or Privacy Policy, please contact us at:
                    <br />
                    Email: legal@puregur.com
                    <br />
                    Phone: +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
