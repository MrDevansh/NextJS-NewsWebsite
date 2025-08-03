"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BackToHomeButton from "@/components/BackToHomeButton";

const AboutMe = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#111] px-4 py-10 relative">
      <BackToHomeButton />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-[#1c1c1c] shadow-2xl rounded-2xl overflow-hidden max-w-3xl w-full p-6 sm:p-10 relative"
      >
        {/* Director Info */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/director.jpg"
              alt="Director"
              width={120}
              height={120}
              className="rounded-full border-4 border-indigo-600 shadow-lg mb-4"
            />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            सूर्य प्रकाश पांडेय
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            संस्थापक, आवाज़-ए-पूर्वांचल
          </p>
        </div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-800 dark:text-gray-300 text-[17px] space-y-5 leading-relaxed"
        >
          <p>
            <strong>आवाज़-ए-पूर्वांचल</strong> एक स्वतंत्र और निष्पक्ष समाचार
            प्लेटफ़ॉर्म है जिसका उद्देश्य पूर्वांचल क्षेत्र की ज़मीनी सच्चाइयों
            को जन-जन तक पहुँचाना है।
          </p>

          <p>
            संस्थापक <strong>सूर्य प्रकाश पांडेय</strong> को पत्रकारिता में 20
            वर्षों से अधिक का अनुभव है। उन्होंने अपनी यात्रा की शुरुआत ग्रामीण
            रिपोर्टिंग से की थी और आज वे मीडिया की दुनिया में एक भरोसेमंद नाम
            हैं। उनकी दृष्टि और नेतृत्व में "आवाज़-ए-पूर्वांचल" एक जनसरोकार से
            जुड़ा और विश्वसनीय मंच बना है।
          </p>

          <p>
            हमारे कंटेंट में गहराई, निष्पक्षता और संवेदनशीलता है। राजनीति, समाज,
            संस्कृति, अपराध और विकास जैसे मुद्दों को हम पूरी गंभीरता से प्रस्तुत
            करते हैं — <em>"सत्य को उसकी पूरी गहराई के साथ।"</em>
          </p>

          <p>
            हम तकनीक और परंपरा का संतुलन बनाए रखते हुए समाचार प्रस्तुति को और
            प्रभावशाली बना रहे हैं। यह मंच केवल सूचना नहीं देता, बल्कि समाज की
            सोच और दिशा को भी प्रभावित करता है।
          </p>

          <p>
            आपके सुझाव, विश्वास और समर्थन ने हमें इस मुकाम तक पहुँचाया है। हम
            आशा करते हैं कि यह विश्वास भविष्य में और भी मजबूत होगा।
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-center text-gray-400 dark:text-gray-500"
        >
          &copy; {new Date().getFullYear()} आवाज़-ए-पूर्वांचल • सभी अधिकार
          सुरक्षित
        </motion.div>
      </motion.div>
    </main>
  );
};

export default AboutMe;
