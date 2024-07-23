document.addEventListener("DOMContentLoaded", function () {
  // 여기에 초기화 코드를 작성합니다.
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = document.getElementById("search-id").value;
    searchUser(userId);
  });
});

function searchUser(userId) {
  fetch(`http://112.160.250.170/api/v1/users/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      if (data) {
        displayUserInfo(JSON.parse(data));
      } else {
        document.getElementById(
          "search-result"
        ).innerHTML = `<p style='text-align: center'>조회된 데이터가 없습니다.</p>`;
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
