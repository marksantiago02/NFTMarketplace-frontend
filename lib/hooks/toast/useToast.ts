import { toast } from "react-toastify";

export default function useToast() {
  const customToast = (type: "success" | "failed", message: string) => {
    if (type === "success") {
      return toast.success(message, {
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "dark",
      });
    } else {
      return toast.error(message, {
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "dark",
      });
    }
  };

  return customToast;
}
