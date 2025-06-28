let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");


function createAndAppend(input) {
    spinner.classList.add("d-none");
    let {
        link,
        title,
        description
    } = input;
    let divElement = document.createElement("div");
    divElement.classList.add("result-item");
    searchResults.appendChild(divElement);


    let linkElement = document.createElement("a");
    linkElement.classList.add("result-item");
    linkElement.textContent = title;
    divElement.appendChild(linkElement);

    let lineBreak = document.createElement("br");
    divElement.appendChild(lineBreak);

    let urlElement = document.createElement("a");
    urlElement.href = link;
    urlElement.textContent = link;
    urlElement.classList.add("result-url");
    divElement.appendChild(urlElement);

    let linesBreak = document.createElement("br");
    divElement.appendChild(linesBreak);

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("link-description");
    divElement.appendChild(descriptionElement);


}




function createData(results) {
    for (let item of results) {

        createAndAppend(item);
    }
}


searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        searchResults.textContent = "";
        let options = {
            method: "GET"
        };

        fetch("https://apis.ccbp.in/wiki-search?search=" + searchInput.value, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                createData(search_results);
            });

    }
});