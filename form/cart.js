// define data in JSON array
let products = [
    {
        name: "Super Smash Bros.",
        quantity: 10,
        ppu: 10000
    },
    {
        name: "Mario Kart 8",
        quantity: 5,
        ppu: 28000
    },
    {
        name: "Breath of the Wild",
        quantity: 2,
        ppu: 80000
    },
    {
        name: "Pokemon Scarlet",
        quantity: 1,
        ppu: 46900
    }
]

// This function will pick the value from the <selet>
// and add to the table
function addToCart() {
    // let elProdct = document.getElementById("products")
    let pVal = $('#products').val()
    let pQty = $('#qty').val()
    let pPPU = $('#ppu').val()
    let productObj = {
        name: pVal,
        quantity: pQty,
        ppu: pPPU
    }

    $('#productBody').html("")
    products.push(productObj)
    loadData()
}


function loadData() {
    let allRows = ""
    let gross = 0

    for (let p in products) {
        let cellName = "<td>" + products[p].name + "</td>"
        let cellQuantity = "<td>" + products[p].quantity + "</td>"
        let cellPPU = "<td>" + products[p].ppu + "</td>"
        let total = products[p].ppu * products[p].quantity
        let cellTotal = '<td class="text-right">' + total + "</td>"
        let row = `<tr>${cellName}${cellQuantity}${cellPPU}${cellTotal}</tr>`
                allRows += row
        gross += total
    }
    $('#productBody').html(allRows)

    $("#gross").html(gross)

    let vat = gross * 0.07
    let net = gross + vat
    $("#vat").html(vat.toFixed(0))
    $("#net").html(net.toFixed(0))
}

// Should use product ID instead of name
function deleteProduct(index) {
    delete products[index] // Delete element from array
    loadData()

}