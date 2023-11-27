export const login = async (username, password) => {
  const response = await fetch("https://localhost:7044/api/Usuario/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //"Authorization": "Bearer " + localStorage.getItem("token"),
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGlhc0BnbWFzZGFzLmNvbSIsIm5iZiI6MTcwMTA0ODcyMywiZXhwIjoxNzAxMDUyMzIzLCJpYXQiOjE3MDEwNDg3MjMsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaGF0dGVheXVkbyIsImF1ZCI6ImNoYXR0ZWF5dWRvIn0.VhiiB_AKlYw2YzoSozOKI4rQ6Vyc1ZC4fFFirnODJyk",
    },
    body: JSON.stringify({
      nombreUsuario: username,
      contrasena: password,
    }),
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  console.log(data);
  return data;
};

export const traerUsers = async () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBnbWFpbC5jb20iLCJuYmYiOjE3MDEwNTQyNDQsImV4cCI6MTcwMTA1Nzg0NCwiaWF0IjoxNzAxMDU0MjQ0LCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2hhdHRlYXl1ZG8iLCJhdWQiOiJjaGF0dGVheXVkbyJ9.xZoxF3NF9M1TUV9THnM555ADWzFYHqsvCm_tSKyXvBc";
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch("https://localhost:7174/api/Usuario", config);
  const data = await response.json();
  console.log(data);
  return data;
};

export default { login, traerUsers };
