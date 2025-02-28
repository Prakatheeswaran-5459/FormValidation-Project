import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty.";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age cannot be empty.";
    } else if (isNaN(formData.age) || formData.age < 1) {
      newErrors.age = "Enter a valid age.";
    }

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be empty.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be empty.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Registration Successful!");
      setFormData({
        name: "",
        age: "",
        email: "",
        password: "",
        gender: "",
      });
      setErrors({});
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className="App">
      <h2>Registration Form</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-border" : ""}
          />
          <p className="error-text">{errors.name}</p>
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? "error-border" : ""}
          />
          <p className="error-text">{errors.age}</p>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-border" : ""}
          />
          <p className="error-text">{errors.email}</p>
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-border" : ""}
          />
          <p className="error-text">{errors.password}</p>
        </div>


        <div>
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
          <p className="error-text">{errors.gender}</p>
        </div>


        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
