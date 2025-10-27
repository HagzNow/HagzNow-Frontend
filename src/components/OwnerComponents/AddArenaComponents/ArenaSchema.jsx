import * as Yup from "yup";

const ArenaSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  sportType: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  price: Yup.number().required("Required").positive("Must be positive"),
  description: Yup.string().required("Required"),
  features: Yup.array().required("Required"),
  status: Yup.string().required("Required"),
});

export default ArenaSchema;
