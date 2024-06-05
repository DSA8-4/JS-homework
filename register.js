document.addEventListener("DOMContentLoaded", function () {
  // 여기에 초기화 코드를 작성합니다.
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = document.getElementById("search-id").value;
    console.log("userId: ", userId);
    searchUser(userId);
  });
});
