import { toast } from "react-toastify";

export const toastSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000,
    style: {
      background: "#2E333A",
      color: "#f2f2f2",
    },
  });
};

export const toastError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    style: {
      background: "#2E333A",
      color: "#f2f2f2",
    },
  });
};
