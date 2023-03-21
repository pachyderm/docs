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
          groupTitle.classList.add("black", "gradient-rl-cold", "mb-3", "p-3", "rounded-1");
          groupTitle.textContent = group;
          hitsContainer.appendChild(groupTitle);
  
          const hitsList = document.createElement("ul");
  
          groupedHits[group].forEach((hit) => {
            const hitElement = document.createElement("li");
            hitElement.innerHTML = `
            <a href="${hit.uri}" class="card c-move-l">
            <div>
              <h4>${hit.title}</h4>
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
  