// $(document).ready(function() {

const base2 =
  "https://docs.google.com/spreadsheets/d/1Y_vs0s1qJJaBX6YVAhjakXFzoR3crkxK169WBJj1ev8/gviz/tq?";
const output2 = document.querySelector(".output2");
const query2 = encodeURIComponent("Select A,B,C");
const url2 = base2 + "&tq=" + query2;

fetch(url2)
  .then((res) => res.text())
  .then((rep) => {
    const data = JSON.parse(rep.substr(47).slice(0, -2));

    // 헤더 행 추가
    const row = document.createElement("tr");
    output2.append(row);
    data.table.cols.forEach((heading) => {
      const cell = document.createElement("td");
      cell.textContent = heading.label;
      row.append(cell);
    });

    // 데이터 행 추가
    data.table.rows.forEach((main) => {
      const container = document.createElement("tr");
      output2.append(container);
      main.c.forEach((ele) => {
        const cell = document.createElement("td");
        cell.textContent = ele.v;
        container.append(cell);
      });
    });
  });

// });
