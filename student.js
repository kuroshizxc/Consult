async function loadAppointments() {
  const res = await fetch("http://localhost:5000/api/appointments/my", {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });

  const data = await res.json();
  if (!data.success) return alert("Failed to load consultations");

  const tbody = document.getElementById("appointmentsTable");
  tbody.innerHTML = "";

  data.appointments.forEach(a => {
    tbody.innerHTML += `
      <tr>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${a.subject.name}</td>
        <td>${a.teacher.name}</td>
        <td>${a.status}</td>
      </tr>
    `;
  });
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

loadAppointments();
