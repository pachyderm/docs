// find every table in the document

var tables = document.querySelectorAll('table');

// wrap the table in a div with a class of 'table-wrapper'

tables.forEach(function(table) {
    var wrapper1 = document.createElement('div');
    var wrapper2 = document.createElement('div');
    wrapper2.classList.add('tableWrapper');

    table.parentNode.insertBefore(wrapper1, table);
    wrapper1.appendChild(wrapper2);
    wrapper2.appendChild(table);
    } 
);