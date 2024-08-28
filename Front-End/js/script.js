let product = [];
let id = 1;
function apiCrud(method, body) {
  fetch("http://localhost:3001/product", {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.message === "success") {
        getData();
      }
    });
}

getData();
function getData() {
  fetch("http://localhost:3001/")
    .then((response) => response.json())
    .then((responseData) => {
      product = responseData.data;

      if (responseData.message === "success") {
        showData();
      }
    });
}

// GET ALL DATA

function showData() {
  var cartona = ``;
  product.forEach((element) => {
    cartona += ` <tr>
                        <th scope="row" id="${element.id}">${element.id}</th>
                        <td>${element.name}</td>
                        <td>${element.price}</td>
                        <td>${element.description}</td>
                        <td>
                            <button type="submit" class="btn btn-success" onClick='editProduct(${JSON.stringify(
                              element
                            )})'  >Edit</button>
                            <button type="submit" class="btn btn-danger"onClick='deleteProduct(${
                              element.id
                            })' >Delete</button>
                        </td>
                    </tr>`;
  });
  document.getElementById("tbody").innerHTML = cartona;
}

// ADD single product

function addProduct() {
  let productName = document.getElementById("name").value;
  let producPrice = document.getElementById("price").value;
  let producDescription = document.getElementById("description").value;

  let productObject = {
    name: productName,
    price: producPrice,
    description: producDescription,
  };

  apiCrud("POST", productObject);
  document.getElementById('form').reset();
}

// DELETE single product

function deleteProduct(myId) {
  apiCrud("DELETE", { id: myId });
}

// UPDATE single product

function editProduct(element) {
  // console.log(product);

  document.getElementById("name").value = element.name;
  document.getElementById("price").value = element.price;
  document.getElementById("description").value = element.description;
  id = element.id;

  document.getElementById("update").style.display = "block";
  document.getElementById("add").style.display = "none";
}

function updateProduct() {
  let productName = document.getElementById("name").value;
  let producPrice = document.getElementById("price").value;
  let producDescription = document.getElementById("description").value;
  let productId = document.getElementById(`${id}`).innerHTML;

  let productObject = {
    id: productId,
    name: productName,
    price: producPrice,
    description: producDescription,
  };

  apiCrud("PUT", productObject);

  document.getElementById("update").style.display = "none";
  document.getElementById("add").style.display = "block";  document.getElementById('form').reset();

}
