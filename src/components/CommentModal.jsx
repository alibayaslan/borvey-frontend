import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { commentCreate } from "../redux/slices/commentSlice";
import Swal from "sweetalert2";
import star1 from "../assets/images/star1.png";
import star2 from "../assets/images/star2.png";
const CommentModal = ({ isOpen, setIsOpen, id, demandId }) => {
  const modalVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "-100%" },
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleStarClick = (value) => {
    setRating(value);
  };
  const handleComment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        point: rating,
        comment,
      };
      const response = await dispatch(commentCreate({ id, data, demandId }));
      if (response.payload && response.payload !== 0) {
        Swal.fire({
          title: "Tebrikler!",
          html: "Başarılı bir şekilde yorum bildirdiniz",
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
        title: "Lütfen tekrar deneyin",
        text: "Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin!",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
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
              <h3 className="text-[20px]">Aldığınız Hizmeti Değerlendirin</h3>
              <button
                className="text-gray-500"
                onClick={() => setIsOpen(false)}
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
                <h3 className="text-center">Lütfen Puanınızı Verin</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} onClick={() => handleStarClick(value)}>
                      <img
                        src={value <= rating ? star1 : star2} // Use star1 for filled stars and star2 for empty stars
                        alt={`Star ${value}`}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
                <textarea
                  placeholder="Yorumunuzu girin"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full mt-4 p-2 border border-gray-300 rounded-md"
                />
                <button
                  className={`w-[100%] rounded-md px-4 py-2 bg-[#006EDF] text-center text-white mt-4 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Yükleniyor..." : "Şimdi oyla"}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentModal;
