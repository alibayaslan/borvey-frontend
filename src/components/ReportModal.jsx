import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { reportCreate } from "../redux/slices/commentSlice";
import Swal from "sweetalert2";
const ReportModal = ({ isOpenReport, setIsOpenReport, id }) => {
  const modalVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "-100%" },
  };

  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        description,
      };
      const response = await dispatch(reportCreate({ id, data }));
      if (response.payload && response.payload !== 0) {
        Swal.fire({
          title: "Tebrikler!",
          html: "Başarılı bir şekilde bildirdiniz",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            window.location.assign("/myservices/active"); // Replace with your desired URL
          },
        });
      } else {
        Swal.fire("Hata!", "Lütfen tekrar deneyin!", "error");
      }
    } catch (error) {
      Swal.fire({
        title: "Hata",
        text: "Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin!",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpenReport && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-[95%] lg:w-[40%] mx-auto p-6 relative"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[20px]">Teklifi Bildir</h3>
              <button
                className="text-gray-500"
                onClick={() => setIsOpenReport(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 54 54"
                  fill="none"
                >
                  <rect width="30" height="30"></rect>
                  <path
                    d="M36.5994 17.3984L17.3994 36.5984"
                    stroke="#092256"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M17.3994 17.3984L36.5994 36.5984"
                    stroke="#092256"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center flex-col my-6">
              <form onSubmit={handleComment}>
                <h3 className="text-center">
                  Lütfen teklif ile ilgili sorununuzu yazın. Kısa sürede çözüm
                  sunacağız.
                </h3>
                <textarea
                required
                  placeholder="Sorununuzu bize yazın"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-4 p-2 border border-gray-300 rounded-md"
                />
                <button
                  className={`w-[100%] rounded-md px-4 py-2 outline-none bg-[#E21743] text-center text-white mt-4 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Yükleniyor..." : "Teklifi Bildir"}
                </button>
                <p
                  className="text-center pt-2 text-[#383E42]"
                  onClick={() => setIsOpenReport(false)}
                >
                  Vazgeç
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
