var customers = []

$(document).ready(function () {
    console.log("ready!");
    // load data
    $.ajax({
        url: "data.json"
    }).done(function (data) {
        //$(this).addClass("done");
        console.log("DONE", data)
        for (let d in data) {
            // save the data record into global variable
            customers.push(data[d])
            let dataStr = `<tr id="row${d}">
                <td><img src='/images/bin.png' class='icon' onclick="deleteCustomer(${d})"> ${data[d].name}</td>
                <td>${data[d].email}</td>
                <td>${data[d].phone}</td>
            </tr>`
            $("#data-table tr:last").after(dataStr)
        }
    });
});



function deleteCustomer(index) {
    delete customers[index] // Delete element from array
    let deletedRow = "#row" + index
    $(deletedRow).remove() //Delete row
};

function addCustomer() {
    let newCustomerName = $('#newCustomerName').val()
    let newCustomerEmail = $('#newCustomerEmail').val()
    let newCustomerPhone = $('#newCustomerPhone').val()

    let customerObject = {
        name: newCustomerName,
        email: newCustomerEmail,
        phone: newCustomerPhone
    }

    customers.push(customerObject);

    let newCustomerIndex = customers.length - 1
    let newCustomer = customers[newCustomerIndex]

    let dataStr = `<tr id="row${newCustomerIndex}">
        <td><img src='/images/bin.jpg' class='icon' onclick="deleteCustomer(${newCustomerIndex})"> ${newCustomer.name}</td>
        <td>${newCustomer.email}</td>
        <td>${newCustomer.phone}</td>
    </tr>`
    $("#data-table tr:last").after(dataStr)
};