import axios from "axios";


class AuthenticationService {
  signin = (email, password) => {
    return axios.post("/api/auth/signin", { email, password})
      .then(response => {
        if (response.data.accessToken) {
          //console.log(JSON.stringify(response.data));
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  signOut() {
    localStorage.removeItem("user");
  }

  register = async (email, password) => {
    return axios.post("/api/auth/signup", {
      email,
      password
    });
  }

  getCurrentUser() {

    return JSON.parse(localStorage.getItem('user'));

  }

}

export default new AuthenticationService();