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
          const groupTitle = document.createElement("h2");
          groupTitle.classList.add("hpe-bg-gradient", "mb-3", "p-3", "rounded-1");
          groupTitle.textContent = group;
          hitsContainer.appendChild(groupTitle);
  
          const hitsList = document.createElement("ul");
  
          groupedHits[group].forEach((hit) => {
            const hitElement = document.createElement("li");
            hitElement.innerHTML = `
            <a href="${hit.uri}" class="card c-move-l">
            <div class="c-sp-1">
              <h3>${hit.title}</h3>
              <p>${hit.description}</p>
            </div>
          </a>
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
  