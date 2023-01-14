var products = [];
var totalDiscount = 0;
var totalAmount = 0;
var totalAmountAfterDiscount = 0;

$(document).ready(function () {
  console.log("ready!");
  // load data
  $.ajax({
    url: "products.json",
  }).done(function (data) {
    //$(this).addClass("done");
    console.log("DONE", data);
    for (let d in data) {
      // save the data record into global variable
      products.push(data[d]);
      let dataStr = `<tr id="row${d}">
                <td style="width:40px"><img src='images/bin.png' class='icon' onclick="deleteProduct(${d})"></td>
                <td>${parseFloat(data[d].qty)}</td>
                <td>${data[d].item}</td>
                <td>${parseFloat(data[d].ppu).toFixed(2)}</td>
                <td>${parseFloat(data[d].discount).toFixed(2)}</td>
                <td>${parseFloat(
                  parseFloat(data[d].qty) * parseFloat(data[d].ppu)
                ).toFixed(2)}</td>
                <td>${parseFloat(
                  parseFloat(data[d].qty) * parseFloat(data[d].ppu) -
                    parseFloat(data[d].discount)
                ).toFixed(2)}</td>
            </tr>`;
      $("#data-table tr:last").after(dataStr);
      totalDiscount = totalDiscount + parseFloat(data[d].discount);
      $("#totalDiscount").html(totalDiscount.toFixed(2));
      totalAmount =
        totalAmount + parseFloat(data[d].qty) * parseFloat(data[d].ppu);
      $("#totalAmount").html(totalAmount.toFixed(2));
      totalAmountAfterDiscount =
        totalAmountAfterDiscount +
        parseFloat(
          parseFloat(data[d].qty) * parseFloat(data[d].ppu) -
            parseFloat(data[d].discount)
        );
      $("#totalAmountAfterDiscount").html(totalAmountAfterDiscount.toFixed(2));
    }
  });
});

$("#clearBtn").click(function () {
  for (let i = 0; i < products.length; i++) {
    delete products[i];
    let deletedRow = "#row" + i;
    $(deletedRow).remove();
  }
  totalDiscount = 0;
  totalAmount = 0;
  totalAmountAfterDiscount = 0;
  $("#totalDiscount").html(totalDiscount.toFixed(2));
  $("#totalAmount").html(totalAmount.toFixed(2));
  $("#totalAmountAfterDiscount").html(totalAmountAfterDiscount.toFixed(2));
});

function deleteProduct(index) {
  totalDiscount = totalDiscount - parseFloat(products[index].discount);
  $("#totalDiscount").html(totalDiscount.toFixed(2));
  totalAmount =
    totalAmount -
    parseFloat(products[index].qty) * parseFloat(products[index].ppu);
  $("#totalAmount").html(totalAmount.toFixed(2));
  totalAmountAfterDiscount =
    totalAmountAfterDiscount -
    parseFloat(
      parseFloat(products[index].qty) * parseFloat(products[index].ppu) -
        parseFloat(products[index].discount)
    );
  $("#totalAmountAfterDiscount").html(totalAmountAfterDiscount.toFixed(2));
  delete products[index]; // Delete element from array
  let deletedRow = "#row" + index;
  $(deletedRow).remove(); //Delete row
}

function addProduct() {
  let newProductQty = $("#newProductQty").val();
  let newProductItem = $("#newProductItem").val();
  let newProductPPU = $("#newProductPPU").val();
  let newProductDiscount = $("#newProductDiscount").val();
  let newProductAmount = parseFloat(
    parseFloat(newProductQty) * parseFloat(newProductPPU)
  ).toFixed(2);
  let amountAfterDiscount = parseFloat(
    parseFloat(newProductAmount) - parseFloat(newProductDiscount)
  ).toFixed(2);

  let ProductObject = {
    qty: newProductQty,
    item: newProductItem,
    ppu: newProductPPU,
    discount: newProductDiscount,
    amount: newProductAmount,
    amountAfterDiscount: amountAfterDiscount,
  };

  products.push(ProductObject);

  let newProductIndex = products.length - 1;
  let newProduct = products[newProductIndex];

  let dataStr = `<tr id="row${newProductIndex}">
        <td style="width:40px"><img src='images/bin.png' class='icon' onclick="deleteProduct(${newProductIndex})"></td>
        <td>${parseFloat(newProduct.qty)}</td>
        <td>${newProduct.item}</td>
        <td>${parseFloat(newProduct.ppu).toFixed(2)}</td>
        <td>${parseFloat(newProduct.discount).toFixed(2)}</td>
        <td>${newProduct.amount}</td>
        <td>${newProduct.amountAfterDiscount}</td>
    </tr>`;
  $("#data-table tr:last").after(dataStr);
  totalDiscount = totalDiscount + parseFloat(newProduct.discount);
  $("#totalDiscount").html(totalDiscount.toFixed(2));
  totalAmount = totalAmount + parseFloat(newProduct.amount);
  $("#totalAmount").html(totalAmount.toFixed(2));
  totalAmountAfterDiscount =
    totalAmountAfterDiscount + parseFloat(newProduct.amountAfterDiscount);
  $("#totalAmountAfterDiscount").html(totalAmountAfterDiscount.toFixed(2));
}
