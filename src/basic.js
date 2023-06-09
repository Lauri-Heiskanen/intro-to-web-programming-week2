let users = [];

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const submitDataButton = document.getElementById("submit-data");
  const emptyTableButton = document.getElementById("empty-table");
  submitDataButton.addEventListener("click", userFormSubmit);
  emptyTableButton.addEventListener("click", resetUsers);
  users = [
    {
      username: "matti",
      email: "matti@emt.fi",
      address: "hehkatu 1",
      admin: "X",
    },
    {
      username: "make",
      email: "make@emt.fi",
      address: "hehkatu 2",
      admin: "-",
    },
    {
      username: "meira",
      email: "meira@emt.fi",
      address: "hehkatu 3",
      admin: "X",
    },
  ];
  initializeUserTable();
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
  let newUser;
  if (document.getElementById("input-image").files.length) {
    newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      address: formData.get("address"),
      admin: isAdmin,
      image: URL.createObjectURL(
        document.getElementById("input-image").files[0]
      ),
    };
  } else {
    newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      address: formData.get("address"),
      admin: isAdmin,
    };
  }

  let userExisted = false;
  for (const user of users) {
    if (newUser["username"] === user["username"]) {
      userExisted = true;
      for (const key in newUser) {
        user[key] = newUser[key];
      }
    }
  }
  if (userExisted === false) {
    users.push(newUser);
  }
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
    if (key === "image") {
      const newData = document.createElement("td");
      const img = document.createElement("img");
      img.src = newUser["image"];
      img.height = 64;
      img.width = 64;
      newUserRow.appendChild(newData.appendChild(img));
    } else {
      const newData = document.createElement("td");
      newData.innerHTML = newUser[key];
      newUserRow.appendChild(newData);
    }
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
