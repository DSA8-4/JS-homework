document.addEventListener("DOMContentLoaded", function () {
  // 여기에 초기화 코드를 작성합니다.
  //   API 구조 (http://112.160.250.170/api/v1)
  // 등록 : /users - post
  // 전체보기 : /users - get
  // 조회 : /users/{id} - get
  // 수정 : /users/{id} - patch, put
  // 삭제 : /users/{id} - delete

  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value;

    fetch(`http://112.160.250.170/api/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        gender,
        birthday,
        email,
      }),
    }).then((res) => {
      alert("등록 성공");
      console.log(res);
    });
  });
});
