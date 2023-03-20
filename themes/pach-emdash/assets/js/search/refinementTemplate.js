export function refinementTemplate(refinement) {
    console.log(refinement)
    
    return `
        <div class="py-1">
        <input type="checkbox" id="${refinement.label}" name="${refinement.label}" value="${refinement.label}" ${refinement.isRefined ? 'checked' : ''}>
        <label for="${refinement.label}">${refinement.label} <span class="black xs rounded-1 sp-1 outlined-white">${refinement.count} </span> </label>
        </div>
        `;

}