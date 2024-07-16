let editID = -1;
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          const { id, name, gender, birthday, email } = JSON.parse(data);
          document.getElementById("name").value = name;
          document.getElementById("gender").value = gender;
          document.getElementById("birthday").value = birthday;
          document.getElementById("email").value = email;
          editID = id;
        } else {
          alert("해당하는 Id가 존재하지 않습니다");
        }
      })
      .catch((error) => console.error("Error: ", error));
  });

  document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const selectedGender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value;

    const edited = {
      name,
      selectedGender,
      birthday,
      email,
    };

    updateUser(edited);
  });

  document.getElementById("delete-member").addEventListener("click", (e) => {
    e.preventDefault();
  });
});

function updateUser(user) {
  if (editID === -1) {
    alert("수정할 사용자의 ID를 조회하세요");
    return;
  }

  fetch(`http://112.160.250.170/api/v1/users/${editID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: editID,
      name: user.name,
      gender: user.selectedGender,
      birthday: user.birthday,
      email: user.email,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("response: ", response);
      return response.text();
    })
    .then((data) => {
      console.log(data);
      // if (data) {
      //   displayUserInfo(JSON.parse(data));
      // } else {
      //   const resultDiv = document.getElementById("search-result");
      //   resultDiv.innerHTML = `<p style='text-align: center'>조회된 데이터가 없습니다.</p>`;
      // }
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
      return response.text();
    })
    .then((data) => {
      if (data) {
        displayUserInfo(JSON.parse(data));
      } else {
        const resultDiv = document.getElementById("search-result");
        resultDiv.innerHTML = `<p style='text-align: center'>조회된 데이터가 없습니다.</p>`;
      }
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
