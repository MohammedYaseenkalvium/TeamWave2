import React, { useContext, useState } from "react";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/UploadImage"

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState("");

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImage = ''

    if (!fullName.trim()) return setError("Enter your full name.");
    if (!validateEmail(email)) return setError("Enter a valid email.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");

    setError("");

    //SignUp API Call
    try{

      //Upload image if present
      if (profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImage = imgUploadRes.imageUrl || "";
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImage,
        adminInviteToken
      });

      const { token, user } = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);

        //Redirect based on role
        if (user.role === "admin"){
          navigate("/admin/dashboard");
        }else{
          navigate("/user/dashboard");
        }
      }
    }catch (error){
      if (error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.")
      }
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT FORM SIDE */}
      <div className="flex items-center justify-center bg-white px-6 lg:px-20">
        <div className="max-w-xl w-full">

          <h2 className="text-3xl font-semibold mb-1">Create an Account</h2>
          <p className="text-slate-600 mb-6">
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">

            <div className="flex justify-center mb-2">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />
            </div>

            {/* TWO COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="John"
                type="text"
              />

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />

              <Input
                value={adminInviteToken}
                onChange={(e) => setAdminInviteToken(e.target.value)}
                label="Admin Invite Token"
                placeholder="6 Digit Code"
                type="text"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90"
            >
              SIGN UP
            </button>

            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Sign In
              </Link>
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div
        className="hidden lg:flex bg-cover bg-center"
        style={{
          backgroundImage: "url('/signUp.png')",
        }}
      ></div>

    </div>
  );
};

export default SignUp;