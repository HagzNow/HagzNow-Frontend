
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Calendar, User, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";



import FieldSelect from "../../components/OwnerComponents/ManualBookingComponents/FieldSelect";
import FieldInput from "../../components/OwnerComponents/ManualBookingComponents/FieldInput";
import FieldTextarea from "../../components/OwnerComponents/ManualBookingComponents/FieldTextarea";
import Section from "../../components/OwnerComponents/ManualBookingComponents/Section";

const ManualBookingForm = () => {
  const { t, i18n } = useTranslation();


  const validationSchema = Yup.object({
    venue: Yup.string().required(t("venue") + " مطلوب"),
    date: Yup.date().required(t("date") + " مطلوب"),
    time: Yup.string().required(t("time") + " مطلوب"),
    sport: Yup.string().required(t("sport") + " مطلوبة"),
    name: Yup.string().required(t("customerName") + " مطلوب"),
    email: Yup.string()
      .email("بريد غير صالح")
      .required(t("email") + " مطلوب"),
    phone: Yup.string().required(t("phone") + " مطلوب"),
    price: Yup.string().required(t("price") + " مطلوب"),
    paymentStatus: Yup.string().required(t("paymentStatus") + " مطلوبة"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    alert("✅ " + t("saveBooking") + " بنجاح");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300" dir="rtl">
     
      <div className="flex">

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <button
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
            >
              {i18n.language === "en" ? "العربية" : "English"}
            </button>
          </div>

          {/* Page Title */}
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            {t("manualBookingTitle")}
          </h2>

          {/* Formik Form */}
          <Formik
            initialValues={{
              venue: "",
              date: "",
              time: "",
              sport: "",
              name: "",
              email: "",
              phone: "",
              price: "",
              paymentStatus: "",
              notes: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                {/* Booking Details */}
                <Section
                  title={t("bookingDetails")}
                  icon={<Calendar size={22} />}
                  color="green"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldSelect
                      name="venue"
                      label={t("venue")}
                      options={[
                        { value: "", label: t("selectVenue") },
                        { value: "ملعب كرة قدم 1", label: t("footballField1") },
                        { value: "ملعب كرة قدم 2", label: t("footballField2") },
                      ]}
                    />
                    <FieldInput type="date" name="date" label={t("date")} />
                    <FieldSelect
                      name="time"
                      label={t("time")}
                      options={[
                        { value: "", label: t("selectTime") },
                        {
                          value: "10:00 - 11:00 صباحاً",
                          label: t("tenToEleven"),
                        },
                        {
                          value: "11:00 - 12:00 صباحاً",
                          label: t("elevenToTwelve"),
                        },
                      ]}
                    />
                    <FieldSelect
                      name="sport"
                      label={t("sport")}
                      options={[
                        { value: "", label: t("selectSport") },
                        { value: "كرة قدم", label: t("football") },
                        { value: "كرة سلة", label: t("basketball") },
                      ]}
                    />
                  </div>
                </Section>

                {/* Customer Info */}
                <Section
                  title={t("customerInfo")}
                  icon={<User size={22} />}
                  color="green"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldInput name="name" label={t("customerName")} />
                    <FieldInput type="email" name="email" label={t("email")} />
                    <FieldInput
                      name="phone"
                      label={t("phone")}
                      className="md:col-span-2"
                    />
                  </div>
                </Section>

                {/* Payment & Notes */}
                <Section
                  title={t("paymentNotes")}
                  icon={<CreditCard size={22} />}
                  color="green"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldInput name="price" label={t("price")} />
                    <FieldSelect
                      name="paymentStatus"
                      label={t("paymentStatus")}
                      options={[
                        { value: "", label: t("selectPayment") },
                        { value: "مدفوع", label: t("paid") },
                        { value: "لم يُدفع", label: t("unpaid") },
                      ]}
                    />
                  </div>
                  <FieldTextarea name="notes" label={t("notes")} rows={3} />
                </Section>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 dark:bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition disabled:opacity-50"
                >
                  {t("saveBooking")}
                </button>
              </Form>
            )}
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default ManualBookingForm;
