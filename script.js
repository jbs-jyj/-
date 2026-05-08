async function searchBooks() {

  const keyword =
    document.getElementById("keyword").value;

  const url =
    `https://openapi.seoul.go.kr:8088/` +
    `ad45fb2710a84c1d182b19ee083b656290d8d385860bd75c7c1ac35d83ad195c/` +
    `xml/SearchCatalogService/1/5/${keyword}`;

  try {

    const response = await fetch(url);

    const text = await response.text();

    const parser = new DOMParser();

    const xml =
      parser.parseFromString(text, "text/xml");

    const rows =
      xml.getElementsByTagName("row");

    const result =
      document.getElementById("result");

    result.innerHTML = "";

    for (let row of rows) {

      const title =
        row.getElementsByTagName("TITLE")[0]?.textContent;

      const author =
        row.getElementsByTagName("AUTHOR")[0]?.textContent;

      const publisher =
        row.getElementsByTagName("PUBLISHER")[0]?.textContent;

      result.innerHTML += `
        <div class="book">
          <h3>${title}</h3>
          <p>저자: ${author}</p>
          <p>출판사: ${publisher}</p>
        </div>
      `;
    }

  } catch(error) {

    console.error(error);

    alert("오류 발생");
  }
}
