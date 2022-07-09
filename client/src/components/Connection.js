import axios from "axios";

export const register = newUser => {
  return axios.post("http://localhost:8080/customer/register", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      phone: newUser.phone,
      selectedOption: newUser.selectedOption
    })
    .then(response => {
      console.log("Registered");
    });
};

export const login = user => {
  return axios.post("http://localhost:8080/customer/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = user => {
  return axios.get("http://localhost:8080/customer/profile", {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateProfile = user => {
  return axios
    .put("customer/update", {
      email:user.email,
      name:user.name,
      phone:user.phone,
      selectedOption:user.selectedOption,
      token:user.token
    })
    .then(res => {
      // localStorage.removeItem('usertoken')
      window.location = '/login'
    })
    .catch(err => {
      console.log(err);
    });
};