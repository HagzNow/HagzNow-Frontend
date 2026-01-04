import axios from "axios";

export async function submitUser(values) {
  const { rePassword: _, ...payload } = values;
  const response = await axios.post(
    "http://localhost:3000/auth/register",
    payload
  );
  return response.data;
}

export async function submitOwner(values) {
  const formData = new FormData();
  formData.append("fName", values.fName);
  formData.append("lName", values.lName);
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("password", values.password);
  formData.append("role", values.role);

  formData.append("nationalIdFront", values.nationalIdFront);
  formData.append("nationalIdBack", values.nationalIdBack);
  formData.append("selfieWithId", values.selfieWithId);

  const response = await axios.post(
    "http://localhost:3000/auth/register/owner",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
}
