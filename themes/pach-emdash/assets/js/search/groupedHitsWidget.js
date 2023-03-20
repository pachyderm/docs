export function groupedHitsWidget({ container, attribute }) {
    return {
      render({ results }) {
        const groupedHits = results.hits.reduce((accumulator, currentItem) => {
          const key = currentItem[attribute];
          if (!accumulator[key]) {
            accumulator[key] = [];
          }
          accumulator[key].push(currentItem);
          return accumulator;
        }, {});
  
        const hitsContainer = document.querySelector(container);
  
        hitsContainer.innerHTML = "";
  
        for (const group in groupedHits) {
          const groupTitle = document.createElement("h3");
          groupTitle.classList.add("darken-1", "p-2", "my-2", "rounded");
          groupTitle.textContent = group;
          hitsContainer.appendChild(groupTitle);
  
          const hitsList = document.createElement("ul");
  
          groupedHits[group].forEach((hit) => {
            const hitElement = document.createElement("li");
            hitElement.innerHTML = `
              <div onclick="location.href='${hit.uri}';" style="cursor: pointer;">
                <h4>${hit.title}</h4>
                <p>${hit.description}</p>
              </div>
            `;
            hitsList.appendChild(hitElement);
          });
  
          hitsContainer.appendChild(hitsList);
        }
      },
      dispose() {
        const hitsContainer = document.querySelector(container);
        hitsContainer.innerHTML = "";
      },
    };
  }
  