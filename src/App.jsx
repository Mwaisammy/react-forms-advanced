import { useState } from "react";
import Swal from "sweetalert2";

const App = () => {
  // const [formData , setFormData]

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.username.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      Swal.fire({
        title: "FORM SUBMISSION ERROR",
        icon: "error",
        text: "Fill all fields",
        confirmButtonText: "OK",
      });
    } else {
      var users = [];

      users.push(formData);

      const isLocalStorageEmpty = !!localStorage.getItem("users");

      if (!isLocalStorageEmpty) {
        //if local storage is empty
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        // check other users in storage
        users = JSON.parse(localStorage.getItem("users"));

        ///convert data to an array for readerbility

        users.push(formData);
        //push the new user and append them in the data storage

        //after pushing convert back their data to json format
        localStorage.setItem("users", JSON.stringify(users));

        Swal.fire({
          title: "REGISTERED",
          icon: "success",
          text: "User registered successfully",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(value);
  };

  return (
    <div className="h-screen flex w-full justify-center items-center bg-neutral-300">
      <form
        action="#"
        className="p-4 shadow-lg max-w-[800px] w-[90%] bg-white"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl my-4 text-center text-blue-500 font-semibold">
          SIGNUP TO AGRIBIX
        </p>
        <div>
          <p>Username</p>
          <input
            type="text"
            name="username"
            onChange={onChange}
            className="h-[40px] p-[10px]  w-full rounded-md"
            placeholder="Enter username"
            style={{
              border: "1px solid #333",
            }}
          />
        </div>
        <div className="mt-4">
          <p>Email</p>
          <input
            type="email"
            name="email"
            onChange={onChange}
            className="h-[40px] p-[10px]  w-full rounded-md"
            placeholder="Enter email"
            style={{
              border: "1px solid #333",
            }}
          />
        </div>

        <div className="mt-4">
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="h-[40px] p-[10px]  w-full rounded-md "
            placeholder="Enter your password"
            style={{
              border: "1px solid #333",
            }}
          />
        </div>
        <button
          type="submit"
          className="rounded-md p-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 w-full mt-4"
        >
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default App;
