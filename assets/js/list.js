const base =
  "https://docs.google.com/spreadsheets/d/1Y_vs0s1qJJaBX6YVAhjakXFzoR3crkxK169WBJj1ev8/gviz/tq?";
const output = document.querySelector(".output2");
const query = encodeURIComponent("Select B,C ORDER BY C DESC OFFSET 1");
const url = base + "&tq=" + query;

fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    const jsonData = JSON.parse(rep.substr(47).slice(0, -2));

    if (!jsonData.table || !jsonData.table.rows) {
      console.error("유효한 데이터가 없습니다.");
      return;
    }

    jsonData.table.rows.forEach((rowData) => {
      const comment = rowData.c[0]?.v || "";
      const formattedDate = rowData.c[1]?.f || rowData.c[1]?.v || "";

      const col = document.createElement("div");
      col.className = "col";

      const row = document.createElement("div");
      row.className = "row";

      const span = document.createElement("span");
      span.textContent = formattedDate;
      row.appendChild(span);

      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";

      const p = document.createElement("p");
      p.textContent = comment;
      commentDiv.appendChild(p);

      col.appendChild(row);
      col.appendChild(commentDiv);
      output.appendChild(col);
    });
  })
  .catch((error) => {
    console.error("Fetch 오류:", error);
  });