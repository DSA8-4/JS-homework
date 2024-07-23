document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://112.160.250.170/api/v1/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async function (response) {
    if (!response.ok) throw new Error("Network response was not ok");
    const users = await response.json();
    for (const user of users) {
      console.log(user);
      const { name, gender, birthday, email } = user;
      document.getElementById("member-list").innerHTML += `
      <div>
        <p>${name}</p>
        <p>${gender}</p>
        <p>${birthday}</p>
        <p>${email}</p>
      </div>`;
    }
  });
});
