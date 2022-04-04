import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  userName: String,
  passWord: String,
  name: String,
});

const AdminDetails = mongoose.model("Admindetails", adminSchema);

export default AdminDetails;
