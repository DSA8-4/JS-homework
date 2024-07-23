document.addEventListener("DOMContentLoaded", function () {
  // 여기에 초기화 코드를 작성합니다.
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = document.getElementById("search-id").value;

    fetch(`http://112.160.250.170/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          const { id, name, gender, birthday, email } = data;
          document.getElementById("id").value = id;
          document.getElementById("name").value = name;
          document.getElementById("gender").value = gender;
          document.getElementById("birthday").value = birthday;
          document.getElementById("email").value = email;
        } else {
          alert("해당하는 Id가 존재하지 않습니다");
        }
      })
      .catch((error) => console.error("Error: ", error));
  });

  document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const selectedGender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value;

    const edited = {
      id,
      name,
      selectedGender,
      birthday,
      email,
    };

    updateUser(edited);
  });

  document.getElementById("delete-member").addEventListener("click", (e) => {
    e.preventDefault();
    deleteUser(document.getElementById("search-id").value);
  });
});

function updateUser(user) {
  fetch(`http://112.160.250.170/api/v1/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      name: user.name,
      gender: user.selectedGender,
      birthday: user.birthday,
      email: user.email,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      else alert("수정 성공");
      return response.text();
    })
    .catch((error) => console.error("Error: ", error));
}

function deleteUser(userId) {
  fetch(`http://112.160.250.170/api/v1/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("response: ", response);
      alert("삭제 성공");
    })
    .catch((error) => console.error("Error: ", error));
}

function displayUserInfo(user) {
  const resultDiv = document.getElementById("search-result");
  resultDiv.innerHTML = `
  <h3>회원정보</h3>
  <p><strong>아이디:</strong> ${user.id}</p>
  <p><strong>이름:</strong> ${user.name}</p>
  <p><strong>성별:</strong> ${user.gender === "MALE" ? "남성" : "여성"}</p>
  <p><strong>생년월일:</strong> ${user.birthday}</p>
  <p><strong>이메일:</strong> ${user.email}</p>
  `;
}
