if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

let users = [];

function initializeCode() {
  initializeUserTable();
  const submitDataButton = document.getElementById("submit-data");
  const emptyTableButton = document.getElementById("empty-table");
  submitDataButton.addEventListener("click", userFormSubmit);
  emptyTableButton.addEventListener("click", resetUsers);
  users = [];
  users.push({
    username: "matti",
    email: "matti@emt.fi",
    address: "hehkatu 1",
    admin: "X",
  });
  users.push({
    username: "make",
    email: "make@emt.fi",
    address: "hehkatu 2",
    admin: "-",
  });
  users.push({
    username: "meira",
    email: "meira@emt.fi",
    address: "hehkatu 3",
    admin: "X",
  });
  reloadUserTable();
}

function userFormSubmit(event) {
  event.preventDefault();
  let formData = new FormData(document.getElementById("user-form"));
  let isAdmin;
  if (formData.get("admin") == null) {
    isAdmin = "-";
  } else {
    isAdmin = "X";
  }
  let newUser = {
    username: formData.get("username"),
    email: formData.get("email"),
    address: formData.get("address"),
    admin: isAdmin,
  };
  users.push(newUser);
  reloadUserTable();
}

function reloadUserTable() {
  initializeUserTable();
  for (const newUser of users) {
    addEntryToTable(newUser);
  }
}

function resetUsers() {
  users = [];
  reloadUserTable();
}

function addEntryToTable(newUser) {
  const userTable = document.getElementById("user-table");
  const newUserRow = document.createElement("tr");
  for (const key in newUser) {
    const newData = document.createElement("td");
    newData.innerHTML = newUser[key];
    newUserRow.appendChild(newData);
  }
  userTable.appendChild(newUserRow);
}

function initializeUserTable() {
  document.getElementById("user-table").innerHTML = `
<tr>
  <th>Username</th>
  <th>Email</th>
  <th>Address</th>
  <th>Admin</th>
</tr>
`;
}
