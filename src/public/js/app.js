document.addEventListener("DOMContentLoaded", function () {

    const productForm = document.getElementById('productForm');
    const getProducts = document.getElementById('getProducts');
    const submitButton = document.getElementById('submitButton');
    const newProduct = document.getElementById('newProduct');
    const productTable = document.getElementById('productTable');


    // Listar
    getProducts.addEventListener('click', () => {
        fetch('/products')
            .then(res => res.json())
            .then(dataJ => {

                productTable.innerHTML = '';

                const fragment = document.createDocumentFragment()

                for (const product of dataJ) {

                    const row = document.createElement('tr');

                    const dataId = document.createElement('td');
                    const dataName = document.createElement('td');
                    const actions = document.createElement('td');

                    const input = document.createElement('input');

                    const button = document.createElement('button');
                    button.setAttribute('class', 'updateButton')

                    const button2 = document.createElement('button');
                    button2.setAttribute('class', 'deleteButton')


                    input.setAttribute('value', product.name)
                    input.setAttribute('class', 'name')

                    dataId.setAttribute('class', 'id')

                    button.textContent = 'Actualizar';
                    button2.textContent = 'Eliminar';

                    dataId.textContent = product.id;
                    dataName.appendChild(input)
                    actions.appendChild(button);
                    actions.appendChild(button2);

                    row.append(dataId);
                    row.append(dataName);
                    row.append(actions);

                    fragment.append(row);

                }

                // if (table.children[1]) {
                //     table.removeChild(table.children[1]);
                // }

                productTable.appendChild(fragment);
            })
    })

    // Agregar
    productForm.addEventListener('submit', (e) => {

        e.preventDefault();

        fetch('/products', {
            method: 'POST',
            body: JSON.stringify({ name: newProduct.value }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    getProducts.click();
                    return response.text()
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(console.log)

    })

    // Actualizar
    productTable.addEventListener('click', function (e) {

        if (e.target.classList.contains('updateButton')) {

            let btn = e.target;

            let row = btn.closest('tr');

            let id = row.querySelector('.id').textContent;
            let name = row.querySelector('.name').value;

            // console.log('id: ', id, 'name: ', name)

            fetch('/products/' + id, {
                method: 'PUT',
                body: JSON.stringify({ name: name }),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(function (response) {
                if (response.ok) {
                    getProducts.click();
                    return response.text()
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
                .then(console.log)
        }
    });

    // Eliminar 
    productTable.addEventListener('click', function (e) {

        if (e.target.classList.contains('deleteButton')) {

            let btn = e.target;

            let row = btn.closest('tr');

            let id = row.querySelector('.id').textContent;
            let name = row.querySelector('.name').value;

            fetch('/products/' + id, {
                method: 'DELETE'
            }).then(function (response) {
                if (response.ok) {
                    getProducts.click();
                    return response.text()
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
                .then(console.log)
        }
    });

});