// find every table in the document

var tables = document.querySelectorAll('table');

// wrap the table in a div with a class of 'table-wrapper'

tables.forEach(function(table) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('tableWrapper');

    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    } 
);