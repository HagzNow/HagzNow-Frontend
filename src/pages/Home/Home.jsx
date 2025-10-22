import React from "react";
import LanguageSelector from "../../components/LanguageSelector";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {t("detail.line1")}
      <LanguageSelector />
    </div>
  );
}
