(function () {
  const KEY = "lotto-theme";
  const btn = document.getElementById("themeToggle");

  function preferred() {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
    if (btn) btn.textContent = theme === "dark" ? "화이트 모드" : "다크 모드";
  }

  apply(preferred());
  if (btn) {
    btn.addEventListener("click", function () {
      apply(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
})();
