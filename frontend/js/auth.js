async function registerStudent() {
  const res = await fetch("http://localhost:5000/api/auth/register/student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: studentId.value,
      name: name.value,
      password: password.value
    })
  });

  const data = await res.json();
  alert(data.success ? "Registered!" : data.message);
}

async function login() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role,
      studentId,
      username,
      password
    })
  });

  const data = await res.json();

  if (!data.success) return alert(data.message);

  if (data.role === "student") location.href = "student-dashboard.html";
  if (data.role === "teacher") location.href = "teacher-dashboard.html";
}