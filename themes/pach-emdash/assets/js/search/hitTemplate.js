export function hitTemplate(hit) {
    console.log(hit)
    return `
      <div class="stack outlined rounded-4 move-l m-2 p-1">
          <div class="p-3" onclick="location.href='${hit.uri}';" style="cursor: pointer;">
            <h3>${hit.title}</a></h3>
            <p>${hit.description}</p>
            <div class="xs spread-right c-black m-1 c-mr-2 c-px-1 c-fit">${hit.tags}</div>
          </div>
      </div>`;
  }
  

