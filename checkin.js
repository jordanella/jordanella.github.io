var data = [
    {
        "id": "101",
        "name": "Jordan Ella",
        "email": "jordan@jordanella.com",
        "role": "Media Production Lead",
        "org": "siberX",
        "shirt": "XL",
        "uid": "0e26294",
        "checked": "True"
    },
    {
        "id": "10898",
        "name": "Shrey Raval",
        "email": "shrey@siberx.org",
        "role": "Wizard",
        "org": "siberX",
        "shirt": "XL",
        "uid": "05e26294f3",
        "checked": "False"
    },
    {
        "id": "103",
        "name": "Mahdi Raza",
        "email": "mahdi@siberx.org",
        "role": "CEO & Founder",
        "org": "siberX",
        "shirt": "XL",
        "uid": "052629",
        "checked": "True"
    },
    {
        "id": "104",
        "name": "Ali Abbas Hirji",
        "email": "ali.hirji@durhamcollege.ca",
        "role": "Director, AI & Cyber",
        "org": "Durham College",
        "shirt": "XL",
        "uid": "05e629",
        "checked": "False"
    },
    {
        "id": "105",
        "name": "Zainab Zaidi",
        "email": "zainab@siberx.org",
        "role": "Director, Marketing",
        "org": "siberX",
        "shirt": "XL",
        "uid": "05e263",
        "checked": "False"
    }
];

function print_show(ticket) {

    $('#print-view').show();

    var selected = data.find(row => row.uid == ticket);

    $('#print-name').html(selected.name);
    $('#print-role').html(selected.role);
    $('#print-org').html(selected.org);
    $('#check-in').attr('data-value', selected.uid);

    var badge = $("span[data-value='" + $('#check-in').attr('data-value') + "'");
    if (badge.hasClass('badge-primary')) {
        $('#check-in').removeClass('btn-info');
        $('#check-in').addClass('btn-success');
        $('#check-in').html('Check-in Guest');
    } else {
        $('#check-in').addClass('btn-info');
        $('#check-in').removeClass('btn-success');
        $('#check-in').html('Admitted');
    }

    $('#qrcode').html("");
    new QRCode(document.getElementById("qrcode"), "https://www.siberx.org/?event_qr_code=1&ticket_id=" + selected.id + "&event_id=9718&security_code=" + selected.uid);

};

function fill_table() {

    var tbody = $('#tbody');



    for (var i = 0; i < data.length; i++) {  

        if (data[i]["checked"] == "False") {
            var labelString = "primary'>Registered";
        } else {
            var labelString = "success'>Checked-in";
        }

        tbody.append("<tr><td style='width: 200px;'><div style='min-width: 100px; display: inline-block;'><span data-value='" + data[i].uid + "'class='badge badge-" + labelString + "</span></div><div style='min-width: 60px; display: inline-block; text-align: left;'>" + data[i].id + "</div></td><td class='col-2'>" + data[i].name 
        + "</td><td class='col-2'>" + data[i].email 
        + "</td><td class='col-2'>" + data[i].role 
        + "</td><td class='col-2'>" + data[i].org 
        + "</td><td>" + data[i].shirt 
        + "</td><td><button type='button' class='btn btn-info select-print' data-value='" + data[i].uid 
        + "'>Select</button></td><td style='display: none;'>" + data[i].uid + "</td></tr>");
    };

};