(function () {
  const resultsEl = document.getElementById("results");
  const drawBtn = document.getElementById("draw");
  if (!resultsEl || !drawBtn) return;

  const GAME_COUNT = 5;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatStamp(date) {
    return (
      date.getFullYear() +
      "." +
      pad(date.getMonth() + 1) +
      "." +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  }

  function colorClass(n) {
    if (n <= 10) return "range-1";
    if (n <= 20) return "range-2";
    if (n <= 30) return "range-3";
    if (n <= 40) return "range-4";
    return "range-5";
  }

  function pickNumbers() {
    const pool = Array.from({ length: 45 }, function (_, i) { return i + 1; });
    const picked = [];
    while (picked.length < 7) {
      const i = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(i, 1)[0]);
    }
    const bonus = picked.pop();
    picked.sort(function (a, b) { return a - b; });
    return { numbers: picked, bonus: bonus };
  }

  function ballHtml(n, bonus) {
    return (
      '<span class="ball ' +
      colorClass(n) +
      (bonus ? " bonus" : "") +
      '">' +
      n +
      "</span>"
    );
  }

  function gameHtml(index, stamp) {
    const result = pickNumbers();
    const balls =
      result.numbers.map(function (n) { return ballHtml(n, false); }).join("") +
      '<span class="plus">+</span>' +
      ballHtml(result.bonus, true);
    return (
      '<article class="game"><span class="game-label">' +
      index +
      '게임</span><div class="balls">' +
      balls +
      '</div><p class="stamp">' +
      stamp +
      "</p></article>"
    );
  }

  function render() {
    const stamp = formatStamp(new Date());
    let html = "";
    for (let i = 1; i <= GAME_COUNT; i += 1) html += gameHtml(i, stamp);
    resultsEl.innerHTML = html;
  }

  drawBtn.addEventListener("click", render);
  render();
})();
