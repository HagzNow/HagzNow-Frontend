import toast from "react-hot-toast";
import i18n from "../i18n";

export function handleError(error) {
  const backendMsg = error.response?.data?.error?.code || "Unknown error";
  const lang = i18n.language;

  const translatedMsg = i18n.t(`errors.${backendMsg}`, {
    defaultValue: backendMsg,
    lng: lang,
  });

  toast.error(translatedMsg);
}
