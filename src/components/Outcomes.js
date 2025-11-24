// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import * as XLSX from "xlsx";
// // import Modal from "./Modal";
// // import "../styles/Outcomes.css";

// // const Outcomes = ({ standalone = false }) => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [modalContent, setModalContent] = useState({
// //     title: "",
// //     type: "",
// //     url: "",
// //   });
// //   const [excelData, setExcelData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [selectedSheet, setSelectedSheet] = useState(0);

// //   const outcomes = [
// //     {
// //       title: "Life Plan Excel",
// //       icon: "📊",
// //       color: "#4CAF50",
// //       url: require("../assets/Living-Fulfilled-Life-Plan-Spreadsheet.xlsx"),
// //       type: "excel",
// //       description:
// //         "Comprehensive spreadsheet to plan and track your life goals",
// //     },
// //     {
// //       title: "One Day Blueprint",
// //       icon: "📝",
// //       color: "#2196F3",
// //       url: "https://livinfulfilled.com/wp-content/uploads/2025/09/One-Page-Living-Fulfilled-Life-Blueprint.pdf",
// //       type: "pdf",
// //       description: "Your complete life blueprint on a single page",
// //     },
// //     {
// //       title: "Vision Board",
// //       icon: "🎨",
// //       color: "#FF9800",
// //       url: "https://livinfulfilled.com/wp-content/uploads/2025/09/Living-Fulfilled-Transformation-in-Visuals.pdf",
// //       type: "pdf",
// //       description: "Visual representation of your transformation journey",
// //     },
// //   ];

// //   const loadExcelFile = async (url) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(url);
// //       const arrayBuffer = await response.arrayBuffer();
// //       const workbook = XLSX.read(arrayBuffer, {
// //         cellStyles: true,
// //         cellDates: true,
// //         cellNF: true,
// //         sheetStubs: true,
// //       });

// //       // Convert all sheets to HTML
// //       const sheets = workbook.SheetNames.map((sheetName, index) => {
// //         const worksheet = workbook.Sheets[sheetName];
// //         const htmlString = XLSX.utils.sheet_to_html(worksheet, {
// //           id: `sheet-${index}`,
// //           editable: false,
// //           header: "",
// //           footer: "",
// //         });
// //         return {
// //           name: sheetName,
// //           html: htmlString,
// //           data: XLSX.utils.sheet_to_json(worksheet, { header: 1 }),
// //         };
// //       });

// //       setExcelData(sheets);
// //       setSelectedSheet(0);
// //     } catch (error) {
// //       console.error("Error loading Excel file:", error);
// //       alert("Failed to load Excel file. Please try downloading instead.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const openModal = (outcome) => {
// //     setModalContent(outcome);
// //     setModalOpen(true);

// //     if (outcome.type === "excel") {
// //       loadExcelFile(outcome.url);
// //     }
// //   };

// //   const closeModal = () => {
// //     setModalOpen(false);
// //     setExcelData(null);
// //     setSelectedSheet(0);
// //   };

// //   return (
// //     <motion.section
// //       className="outcomes-section"
// //       initial={{ opacity: 0, y: 50 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, margin: "-100px" }}
// //       transition={{ duration: 0.6 }}
// //     >
// //       <div className="outcomes-container">
// //         <div className="section-header">
// //           <h2 className="section-title">Your Outcomes</h2>
// //           <div className="title-underline"></div>
// //           <p className="section-subtitle">
// //             Tangible results you'll achieve through this programme
// //           </p>
// //         </div>

// //         <div className="outcomes-grid">
// //           {outcomes.map((outcome, index) => (
// //             <motion.div
// //               key={index}
// //               className="outcome-card"
// //               initial={{ opacity: 0, scale: 0.8 }}
// //               whileInView={{ opacity: 1, scale: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ delay: index * 0.2, duration: 0.5 }}
// //               whileHover={{ y: -10, scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //               onClick={() => openModal(outcome)}
// //             >
// //               <motion.div
// //                 className="outcome-icon"
// //                 style={{ backgroundColor: outcome.color }}
// //                 whileHover={{ rotate: 360 }}
// //                 transition={{ duration: 0.6 }}
// //               >
// //                 {outcome.icon}
// //               </motion.div>
// //               <h3>{outcome.title}</h3>
// //               <p>{outcome.description}</p>
// //               <span className="click-hint">Click to view</span>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>

// //       <Modal isOpen={modalOpen} onClose={closeModal} title={modalContent.title}>
// //         {modalContent.type === "pdf" && (
// //           <div className="pdf-viewer">
// //             <iframe
// //               src={`${modalContent.url}#toolbar=1&navpanes=1&scrollbar=1`}
// //               className="modal-iframe"
// //               title={modalContent.title}
// //             />
// //           </div>
// //         )}

// //         {modalContent.type === "excel" && (
// //           <div className="excel-viewer">
// //             {loading ? (
// //               <div className="excel-loading">
// //                 <div className="spinner"></div>
// //                 <p>Loading Excel file...</p>
// //               </div>
// //             ) : excelData ? (
// //               <>
// //                 {/* Sheet Tabs */}
// //                 {excelData.length > 1 && (
// //                   <div className="sheet-tabs">
// //                     {excelData.map((sheet, index) => (
// //                       <button
// //                         key={index}
// //                         className={`sheet-tab ${
// //                           selectedSheet === index ? "active" : ""
// //                         }`}
// //                         onClick={() => setSelectedSheet(index)}
// //                       >
// //                         {sheet.name}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {/* Download Button */}
// //                 <div className="excel-actions">
// //                   <a
// //                     href={modalContent.url}
// //                     download
// //                     className="download-btn-small"
// //                   >
// //                     📥 Download File
// //                   </a>
// //                 </div>

// //                 {/* Excel Content */}
// //                 <div className="excel-content">
// //                   <div
// //                     className="excel-table-wrapper"
// //                     dangerouslySetInnerHTML={{
// //                       __html: excelData[selectedSheet].html,
// //                     }}
// //                   />
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="excel-error">
// //                 <p>Unable to display Excel file.</p>
// //                 <a href={modalContent.url} download className="download-btn">
// //                   📥 Download Excel File
// //                 </a>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </Modal>
// //     </motion.section>
// //   );
// // };

// // export default Outcomes;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Modal from "./Modal";
// import "../styles/Outcomes.css";

// const Outcomes = ({ standalone = false }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState({
//     title: "",
//     type: "",
//     url: "",
//   });

//   const outcomes = [
//     {
//       title: "Life Plan Excel",
//       icon: "📊",
//       color: "#4CAF50",
//       url: require("../assets/Living-Fulfilled-Life-Plan-Spreadsheet.xlsx"),
//       type: "excel",
//       description:
//         "Comprehensive spreadsheet to plan and track your life goals",
//     },
//     {
//       title: "One Day Blueprint",
//       icon: "📝",
//       color: "#2196F3",
//       url: "https://livinfulfilled.com/wp-content/uploads/2025/09/One-Page-Living-Fulfilled-Life-Blueprint.pdf",
//       type: "pdf",
//       description: "Your complete life blueprint on a single page",
//     },
//     {
//       title: "Vision Board",
//       icon: "🎨",
//       color: "#FF9800",
//       url: "https://livinfulfilled.com/wp-content/uploads/2025/09/Living-Fulfilled-Transformation-in-Visuals.pdf",
//       type: "pdf",
//       description: "Visual representation of your transformation journey",
//     },
//     {
//       title: "Balconies and Basements",
//       icon: "📝",
//       color: "#c131ceff",
//       url: "https://livinfulfilled.com/wp-content/uploads/2025/09/Balconies-and-Basements.pdf",
//       type: "pdf",
//       description:
//         "See your strengths clearly — elevate the balcony, manage the basement.",
//     },
//     {
//       title: "5 Day Program Workbook",
//       icon: "📖",
//       color: "#9C27B0",
//       url: "https://livinfulfilled.com/wp-content/uploads/2025/09/5-Day-Version-Program-Compressed.pdf",
//       type: "pdf",
//       description: "Comprehensive 5-day workbook for guided transformation",
//     },
//     {
//       title: "Explainer Video",
//       icon: "🎬",
//       color: "#E91E63",
//       url: "https://video.gumlet.io/688f392c0f894537edc335ad/68f384106b5c1015ac07b428/download.mp4",
//       type: "video",
//       description: "Introduction video explaining the programme structure",
//     },
//   ];

//   const openModal = (outcome) => {
//     setModalContent(outcome);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <motion.section
//       className={`outcomes-section ${standalone ? "standalone-mode" : ""}`}
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="outcomes-container">
//         <div className="section-header">
//           <h2 className="section-title">Your Outcomes</h2>
//           <div className="title-underline"></div>
//           <p className="section-subtitle">
//             Tangible results you'll achieve through this programme
//           </p>
//         </div>

//         <div className="outcomes-grid">
//           {outcomes.map((outcome, index) => (
//             <motion.div
//               key={index}
//               className="outcome-card"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.15, duration: 0.5 }}
//               whileHover={{ y: -10, scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => openModal(outcome)}
//             >
//               <motion.div
//                 className="outcome-icon"
//                 style={{ backgroundColor: outcome.color }}
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 {outcome.icon}
//               </motion.div>
//               <h3>{outcome.title}</h3>
//               <p>{outcome.description}</p>
//               <span className="click-hint">Click to view</span>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <Modal isOpen={modalOpen} onClose={closeModal} title={modalContent.title}>
//         {/* PDF Viewer */}
//         {modalContent.type === "pdf" && (
//           <div className="pdf-viewer">
//             <iframe
//               src={`${modalContent.url}#toolbar=1&navpanes=1&scrollbar=1`}
//               className="modal-iframe"
//               title={modalContent.title}
//             />
//           </div>
//         )}

//         {/* Excel Viewer */}
//         {modalContent.type === "excel" && (
//           <div className="excel-preview">
//             <div className="excel-icon">📊</div>
//             <h3>Excel Spreadsheet</h3>
//             <p className="excel-description">
//               Download the Life Plan Excel spreadsheet to start planning your
//               journey.
//             </p>
//             <a href={modalContent.url} download className="download-btn">
//               📥 Download Excel File
//             </a>
//             <p className="excel-note">
//               The file will be downloaded to your device. Open it with Microsoft
//               Excel or Google Sheets.
//             </p>
//           </div>
//         )}

//         {/* Video Player */}
//         {modalContent.type === "video" && (
//           <div className="video-viewer">
//             <video
//               className="modal-video"
//               controls
//               controlsList="nodownload"
//               autoPlay
//               preload="metadata"
//             >
//               <source src={modalContent.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <div className="video-info">
//               <p className="video-description">{modalContent.description}</p>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </motion.section>
//   );
// };

// export default Outcomes;

import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import "../styles/Outcomes.css";

const Outcomes = ({ standalone = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    type: "",
    url: "",
  });

  const outcomes = [
    {
      title: "Life Plan Excel",
      icon: "📊",
      color: "#4CAF50",
      // Google Sheets embed link (read-only preview)
      url: "https://docs.google.com/spreadsheets/d/1qsUo8mEiYq4umWT2PH09XWThj3gb3KuX2tMMnxtj8YA/preview",
      type: "excel",
      description:
        "Comprehensive spreadsheet to plan and track your life goals",
    },
    {
      title: "One Day Blueprint",
      icon: "📝",
      color: "#2196F3",
      url: "https://livinfulfilled.com/wp-content/uploads/2025/09/One-Page-Living-Fulfilled-Life-Blueprint.pdf",
      type: "pdf",
      description: "Your complete life blueprint on a single page",
    },
    {
      title: "Vision Board",
      icon: "🎨",
      color: "#FF9800",
      url: "https://livinfulfilled.com/wp-content/uploads/2025/09/Living-Fulfilled-Transformation-in-Visuals.pdf",
      type: "pdf",
      description: "Visual representation of your transformation journey",
    },
    {
      title: "Balconies and Basements",
      icon: "📝",
      color: "#c131ceff",
      url: "https://livinfulfilled.com/wp-content/uploads/2025/09/Balconies-and-Basements.pdf",
      type: "pdf",
      description:
        "See your strengths clearly — elevate the balcony, manage the basement.",
    },
    {
      title: "5 Day Program Workbook",
      icon: "📖",
      color: "#9C27B0",
      url: "https://livinfulfilled.com/wp-content/uploads/2025/09/5-Day-Version-Program-Compressed.pdf",
      type: "pdf",
      description: "Comprehensive 5-day workbook for guided transformation",
    },
    {
      title: "Explainer Video",
      icon: "🎬",
      color: "#E91E63",
      url: "https://video.gumlet.io/688f392c0f894537edc335ad/68f384106b5c1015ac07b428/download.mp4",
      type: "video",
      description: "Introduction video explaining the programme structure",
    },
  ];

  const openModal = (outcome) => {
    setModalContent(outcome);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <motion.section
      className={`outcomes-section ${standalone ? "standalone-mode" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="outcomes-container">
        <div className="section-header">
          <h2 className="section-title">Your Outcomes</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Tangible results you'll achieve through this programme
          </p>
        </div>

        <div className="outcomes-grid">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              className="outcome-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(outcome)}
            >
              <motion.div
                className="outcome-icon"
                style={{ backgroundColor: outcome.color }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {outcome.icon}
              </motion.div>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
              <span className="click-hint">Click to view</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal content */}
      <Modal isOpen={modalOpen} onClose={closeModal} title={modalContent.title}>
        {/* PDF Viewer */}
        {modalContent.type === "pdf" && (
          <div className="pdf-viewer">
            <iframe
              src={`${modalContent.url}#toolbar=1&navpanes=1&scrollbar=1`}
              className="modal-iframe"
              title={modalContent.title}
            />
          </div>
        )}

        {/* Embedded Google Sheet Viewer (for Excel type) */}
        {modalContent.type === "excel" && (
          <div className="excel-embed-container">
            <iframe
              src={modalContent.url}
              title="Life Plan Excel"
              className="excel-iframe"
              allowFullScreen
            ></iframe>
            <div className="excel-actions">
              <a
                href="https://docs.google.com/spreadsheets/d/1qsUo8mEiYq4umWT2PH09XWThj3gb3KuX2tMMnxtj8YA/export?format=xlsx"
                className="download-btn-small"
                target="_blank"
                rel="noopener noreferrer"
              >
                📥 Download Excel File
              </a>
            </div>
          </div>
        )}

        {/* Video Viewer */}
        {modalContent.type === "video" && (
          <div className="video-viewer">
            <video
              className="modal-video"
              controls
              controlsList="nodownload"
              autoPlay
              preload="metadata"
            >
              <source src={modalContent.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-info">
              <p className="video-description">{modalContent.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </motion.section>
  );
};

export default Outcomes;
