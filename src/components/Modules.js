import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "./Modal";
import "../styles/Modules.css";

import MI1 from "../assets/module_1.jpg";
import MI2 from "../assets/module_2.jpg";
import MI3 from "../assets/module_3.jpg";
import MI4 from "../assets/module_4.jpg";
import MI5 from "../assets/module_5.jpg";
import MI6 from "../assets/module_6.jpg";
import MI7 from "../assets/module_7.jpg";
import MI8 from "../assets/module_8.jpg";
import MI9 from "../assets/module_9.jpg";
import MI10 from "../assets/module_10.jpg";
import MI11 from "../assets/module_11.jpg";
import MI12 from "../assets/module_12.jpg";
import MI13 from "../assets/module_13.jpg";
import MI14 from "../assets/module_14.jpg";
import MI15 from "../assets/module_15.jpg";
import MI16 from "../assets/module_16.jpg";
import MI17 from "../assets/module_17.jpg";
import MI18 from "../assets/module_18.jpg";

const Modules = ({ standalone = false }) => {
  const [searchParams] = useSearchParams();
  const stageParam = searchParams.get("stage"); // Get stage from URL

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const stage1Modules = [
    {
      id: 1,
      title: "Taking My Talent Assessment & Naming My Talents",
      image: MI1,
      description:
        "Discover your dominant talents and begin your journey of deeper self-awareness.",
      bullets: [
        "Decide on an assessment that tells you what your talents are",
        "Understand and reflect on the reports you receive",
        "Identify your Dominant Talent Themes and explore why they resonate",
        "Begin building self awareness around how you naturally think, feel, and act",
      ],
    },
    {
      id: 2,
      title: "Organizing My Living Fulfilled® Archive",
      image: MI2,
      description:
        "Bring structure and clarity to your life by organizing what truly matters.",
      bullets: [
        "Identify key areas of your life that need clarity, structure or attention",
        "Create labeled folders reflecting your values, priorities and goals",
        "Plan immediate, short-term, and long-term focus areas",
        "Use your top talent themes to guide how you organize and grow",
      ],
    },
    {
      id: 3,
      title: "Optimizing My Strengths Journey",
      image: MI3,
      description:
        "Integrate your strengths into daily life and connect meaningfully with others.",
      bullets: [
        "Introduce you to your Life Planning & Gratitude Journal",
        "Integrate your strengths in your public and personal profiles",
        "Connect with others and learn through shared insights",
        "Reflect on the power of strengths in group or team dynamics",
      ],
    },
    {
      id: 4,
      title: "Diving Into My Strengths Worksheets",
      image: MI4,
      description:
        "Explore your strengths deeply across life contexts for greater self-awareness.",
      bullets: [
        "Deepen awareness of how your strengths show up across life contexts",
        "Reflect on empowered (balcony) and limiting (basement) expressions",
        "Explore how dominant and lesser themes shaped key life moments",
        "Identify patterns across personal, professional, and emotional experiences",
        "Build self-acceptance by recognizing your full spectrum of operation",
      ],
    },
    {
      id: 5,
      title: "Connecting My Strengths to My Past & Present",
      image: MI5,
      description:
        "Trace how your strengths have influenced your past and current life patterns.",
      bullets: [
        "Trace how your strengths have shaped past decisions, relationships and outcomes",
        "Identify recurring patterns linked to your talent themes",
        "Reflect on how your strengths show up in your current mindset and routines",
        "Increase self-awareness by examining emotional highs and energy drains",
      ],
    },
    {
      id: 6,
      title: "Defining What I Can Be the World’s Greatest At",
      image: MI6,
      description:
        "Clarify your purpose and begin envisioning the life you truly want to live.",
      bullets: [
        "Identify causes, activities, or dreams that give you purpose and energy",
        "Articulate what you could be the world’s greatest at",
        "Visualize the life you really want",
        "Capture the kind of impact you want to make through your strengths",
      ],
    },
  ];

  const stage2Modules = [
    {
      id: 7,
      title: "Messaging – Communicating with Clarity & Confidence",
      image: MI7,
      description:
        "Craft a confident personal message that reflects your strengths and values.",
      bullets: [
        "Define and articulate your core identity authentically",
        "Craft three powerful introductions for different settings",
        "Align your message with your strengths, values, and goals",
        "Develop a personal narrative that inspires trust and connection",
      ],
    },
    {
      id: 8,
      title: "Defining Your Personal Brand, Purpose, and Culture",
      image: MI8,
      description:
        "Create an authentic personal brand aligned with your purpose and values.",
      bullets: [
        "Clarify your personal brand",
        "Identify the deeper purpose behind your actions",
        "Define your personal culture and daily expression of values",
        "Align brand, purpose, and culture into one authentic statement",
      ],
    },
    {
      id: 9,
      title: "Curating Your Influences and Environment for Growth",
      image: MI9,
      description:
        "Shape your environment to support your focus, energy, and personal growth.",
      bullets: [
        "Explore how your environment affects your mindset and growth",
        "Align your influences with your values and long-term goals",
        "Design a supportive environment that nurtures clarity and purpose",
        "Make sustainable changes to enhance focus and reduce distractions",
      ],
    },
    {
      id: 10,
      title: "Fueling Your Life – Eating & Drinking with Intention",
      image: MI10,
      description:
        "Nourish your body and mind by eating and drinking with mindful intention.",
      bullets: [
        "Evaluate your current eating habits and food environment",
        "Understand how your diet affects energy and fulfillment",
        "Create a personalized food and beverage list to support well-being",
      ],
    },
    {
      id: 11,
      title: "Simplifying for Impact – Living with Purpose & Focus",
      image: MI11,
      description:
        "Simplify your life to focus on what truly matters and live with intention.",
      bullets: [
        "Reflect on what areas of life you need to simplify",
        "Connect mental clarity with physical organization",
        "Build minimalist habits for a purpose-driven life",
        "Learn to remove distractions and set healthy boundaries",
        "Take small, intentional steps toward living purposefully",
      ],
    },
    {
      id: 12,
      title:
        "Top-of-Mind – The People, Places & Influences That Shape Your Life",
      image: MI12,
      description:
        "Recognize the key people, places, and influences that enrich your journey.",
      bullets: [
        "Identify people who uplift and support your growth",
        "Clarify which thought leaders or mentors you want to follow",
        "Define spaces that inspire and rejuvenate you",
        "Prioritize celebrations and traditions that bring meaning",
      ],
    },
    {
      id: 13,
      title: "Your Life at 90 – A Life Well Lived",
      image: MI13,
      description:
        "Visualize a deeply fulfilling life at 90 and define what truly matters long-term.",
      bullets: [
        "Visualize with clarity the kind of life you want at age 90",
        "Clarify the people, places, and routines that matter most",
        "Identify markers of a meaningful, well-lived life",
      ],
    },
    {
      id: 14,
      title: "Milestones Chronology – Mapping the Key Markers of Your Journey",
      image: MI14,
      description:
        "Map your life milestones to align your vision with purposeful action steps.",
      bullets: [
        "Determine the non-negotiable parts of your long-term vision",
        "Create a timeline of major milestones that align with your purpose",
        "Dedicate energy and resources to achieving your milestones",
      ],
    },
    {
      id: 15,
      title: "Future Resume – Structuring Your Path to Success",
      image: MI15,
      description:
        "Visualize your future achievements and structure your journey toward success.",
      bullets: [
        "See your success story before it happens",
        "Define the impact you want to be remembered for",
        "Clarify achievements aligned with your life milestones",
      ],
    },
    {
      id: 16,
      title: "Structuring 1-Year & 4-Year Goals",
      image: MI16,
      description:
        "Turn your long-term vision into actionable 1-year and 4-year goals.",
      bullets: [
        "Break milestones into 1-year and 4-year goal timelines",
        "Plan actionable steps across major life categories",
        "Balance goals across physical, professional, and emotional areas",
      ],
    },
    {
      id: 17,
      title: "Using Strengths to Navigate Challenges – Staying Resilient",
      image: MI17,
      description:
        "Stay resilient through challenges by leveraging your unique strengths.",
      bullets: [
        "Identify potential roadblocks that could derail you",
        "Use your strengths to stay focused and motivated",
        "Develop proactive strategies to overcome obstacles",
      ],
    },
    {
      id: 18,
      title: "Your Life Blueprint – A One Page Guide to Your Best Life",
      image: MI18,
      description:
        "Summarize your Living Fulfilled™ journey into a clear, one-page life blueprint.",
      bullets: [
        "Distill the key takeaways from your Living Fulfilled™ journey",
        "Create a one-page blueprint for a purposeful, aligned life",
        "Affirm how it supports what you can be the world’s greatest at",
      ],
    },
  ];

  // Determine which modules to display based on stage parameter
  const getModulesToDisplay = () => {
    if (stageParam === "1") {
      return {
        modules: stage1Modules,
        title: "Stage 1: Name & Claim Your Strengths",
        showStage2: false,
      };
    } else if (stageParam === "2") {
      return {
        modules: stage2Modules,
        title: "Stage 2: Create Your Life Blueprint",
        showStage2: false,
      };
    } else {
      // Show all modules if no stage parameter
      return { modules: null, title: "18 Modules Programme", showBoth: true };
    }
  };

  const { modules, title, showBoth } = getModulesToDisplay();

  const openModule = (module) => {
    setSelectedModule({
      ...module,
      description: module.description,
      bullets: module.bullets,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <motion.section
      className={`modules-section ${standalone ? "standalone-mode" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="modules-container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            {stageParam === "1" &&
              "6 transformative modules to discover and claim your unique strengths"}
            {stageParam === "2" &&
              "12 comprehensive modules to design and implement your life blueprint"}
            {!stageParam &&
              "Comprehensive curriculum designed for your transformation"}
          </p>
        </div>

        {/* Show specific stage */}
        {modules && (
          <div className="stage-section">
            <div className="modules-grid">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  className="module-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModule(module)}
                >
                  <div className="module-image">
                    <img src={module.image} alt={module.title} />
                    <div className="module-number">Module {module.id}</div>
                  </div>
                  <div className="module-content">
                    <h4>{module.title}</h4>
                    <p className="module-preview">
                      {module.description.substring(0, 80)}...
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Show both stages if no parameter */}
        {showBoth && (
          <>
            <div className="stage-section">
              <motion.h3
                className="stage-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Part 1: Name & Claim Your Strengths
              </motion.h3>
              <div className="modules-grid">
                {stage1Modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    className="module-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModule(module)}
                  >
                    <div className="module-image">
                      <img src={module.image} alt={module.title} />
                      <div className="module-number">Module {module.id}</div>
                    </div>
                    <div className="module-content">
                      <h4>{module.title}</h4>
                      <p className="module-preview">
                        {module.description.substring(0, 80)}...
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="stage-section">
              <motion.h3
                className="stage-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Part 2: Create Your Life Blueprint
              </motion.h3>
              <div className="modules-grid">
                {stage2Modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    className="module-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModule(module)}
                  >
                    <div className="module-image">
                      <img src={module.image} alt={module.title} />
                      <div className="module-number">Module {module.id}</div>
                    </div>
                    <div className="module-content">
                      <h4>{module.title}</h4>
                      <p className="module-preview">
                        {module.description.substring(0, 80)}...
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={selectedModule?.title}
      >
        {selectedModule && (
          <div className="module-details">
            <motion.img
              src={selectedModule.image}
              alt={selectedModule.title}
              className="module-detail-image"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="module-detail-content">
              <p className="module-description">{selectedModule.description}</p>
              <h4>What You'll Learn:</h4>
              <ul className="module-bullets">
                {selectedModule.bullets.map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </motion.section>
  );
};

export default Modules;
