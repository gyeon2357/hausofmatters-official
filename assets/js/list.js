const base =
  "https://docs.google.com/spreadsheets/d/1Y_vs0s1qJJaBX6YVAhjakXFzoR3crkxK169WBJj1ev8/gviz/tq?";
const output = document.querySelector(".output2");
const query = encodeURIComponent("Select A,B,C ORDER BY C DESC OFFSET 1");
const url = base + "&tq=" + query;

fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    const data = JSON.parse(rep.substr(47).slice(0, -2));

    // 헤더 행 추가
    // const row = document.createElement("tr");
    // output2.append(row);
    // data.table.cols.forEach((heading) => {
    //   const cell = document.createElement("td");
    //   cell.textContent = heading.label;
    //   row.append(cell);
    // });

    data.table.rows.forEach((main) => {
      const name = main.c[0]?.v || "";
      const comment = main.c[1]?.v || "";
      const formattedDate = main.c[2]?.v || "";

      // <div class="col">
      const col = document.createElement("div");
      col.className = "col";

      // <div class="row"><h1>이름</h1><span>날짜</span></div>
      const row = document.createElement("div");
      row.className = "row";

      const h1 = document.createElement("h1");
      h1.textContent = name;

      const span = document.createElement("span");
      span.textContent = formattedDate;

      row.appendChild(h1);
      row.appendChild(span);

      // <div class="comment"><p>내용</p></div>
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";

      const p = document.createElement("p");
      p.textContent = comment;

      commentDiv.appendChild(p);

      // 조합
      col.appendChild(row);
      col.appendChild(commentDiv);
      output.appendChild(col);
    });
  });
