const API = "https://698491fa885008c00db1a70b.mockapi.io/api/v1/sinhvien";
const tbody = document.getElementById("data");

function loadData() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      data.forEach(sv => {
        tbody.innerHTML += `
          <tr>
            <td>${sv.id}</td>
            <td><img src="${sv.avatar}" width="40"></td>
            <td>${sv.name}</td>
            <td>${sv.phone}</td>
            <td>
              <button onclick="edit(${sv.id})">✏️</button>
              <button onclick="remove(${sv.id})">🗑</button>
            </td>
          </tr>
        `;
      });
    });
}
loadData();

function showForm() {
  document.getElementById("form").style.display = "block";
}
function hideForm() {
  document.getElementById("form").style.display = "none";
}

function save() {
  const id = document.getElementById("id").value;
  const sv = {
    name: name.value,
    phone: phone.value,
    avatar: avatar.value
  };

  if (id) {
    fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sv)
    }).then(loadData);
  } else {
    fetch(API, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sv)
    }).then(loadData);
  }

  hideForm();
}

function edit(id) {
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(sv => {
      document.getElementById("id").value = sv.id;
      name.value = sv.name;
      phone.value = sv.phone;
      avatar.value = sv.avatar;
      showForm();
    });
}

function remove(id) {
  if (confirm("Xóa sinh viên này?")) {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(loadData);
  }
}
