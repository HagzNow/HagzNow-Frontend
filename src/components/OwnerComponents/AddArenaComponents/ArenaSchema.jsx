import * as Yup from "yup";

const ArenaSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  //sportType: Yup.string().required("Required"),
  categoryId: Yup.string().required("Required"),

  price: Yup.number().required("Required").positive("Must be positive"),
  description: Yup.string().required("Required"),
  extras: Yup.array().required("Required"),
  governorate: Yup.string().required("Required"),
  city: Yup.string().required("Required"),

  
});

export default ArenaSchema;
