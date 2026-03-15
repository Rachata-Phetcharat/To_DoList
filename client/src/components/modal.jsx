import { useState } from "react";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
    setTitle("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">เพิ่มรายการ</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ชื่อรายการ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 rounded-lg p-2 mb-4 focus:outline-none focus:border-indigo-500"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
