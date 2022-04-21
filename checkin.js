var data = [
    {
        "id": "10898",
        "name": "Jordan Ella",
        "email": "jordan@jordanella.com",
        "work_email": "jordan@jordanella.com",
        "role": "Media Production Lead",
        "org": "siberX",
        "shirt": "XL",
        "uid": "S27ylES0wiLdFAGdUpFgCQ",
        "checked": "True",
        "dietary": "",
        "type": "Speaker"
    },
    {
        "id": "10898",
        "name": "Shrey Raval",
        "email": "shrey@siberx.org",
        "work_email": "jordan@jordanella.com",
        "role": "Wizard",
        "org": "siberX",
        "shirt": "XL",
        "uid": "05e26294f3",
        "checked": "False",
        "dietary": "Veg",
        "type": "Speaker"
    },
    {
        "id": "103",
        "name": "Mahdi Raza",
        "email": "mahdi@siberx.org",
        "work_email": "jordan@jordanella.com",
        "role": "CEO & Founder",
        "org": "siberX",
        "shirt": "XL",
        "uid": "S27ylES0wiLdFAGdUpFgC2",
        "checked": "True",
        "dietary": "",
        "type": "Speaker"
    },
    {
        "id": "104",
        "name": "Ali Abbas Hirji",
        "email": "ali.hirji@durhamcollege.ca",
        "work_email": "jordan@jordanella.com",
        "role": "Director, AI & Cyber",
        "org": "Durham College",
        "shirt": "XL",
        "uid": "05e629",
        "checked": "False",
        "dietary": "",
        "type": "Speaker"
    },
    {
        "id": "105",
        "name": "Zainab Zaidi",
        "email": "zainab@siberx.org",
        "work_email": "jordan@jordanella.com",
        "role": "Director, Marketing",
        "org": "siberX",
        "shirt": "XL",
        "uid": "05e263",
        "checked": "False",
        "dietary": "",
        "type": "Speaker"
    }
];

function print_show(ticket) {

    $('#selected-attendee').show();

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
    //new QRCode(document.getElementById("qrcode"), "https://www.siberx.org/?event_qr_code=1&ticket_id=" + selected.id + "&event_id=9718&security_code=" + selected.uid);
    new QRCode(document.getElementById("qrcode"), selected.uid + "," + selected.id);

};

function fill_table() {

    var tbody = $('#tbody');

    for (var i = 0; i < data.length; i++) {  

        if (data[i]["checked"] == "False") {
            var labelString = "primary'>Registered";
        } else {
            var labelString = "success'>Checked-in";
        }

        tbody.append("<tr><td style='width: 100px;'><span data-value='" + data[i].uid 
        + "'class='badge badge-" + labelString 
        + "</span></td><td class='col-2'>" + data[i].name 
        + "</td><td class='col-2'>" + data[i].role 
        + "</td><td class='col-2'>" + data[i].org 
        + "</td><td class='col-2'>" + data[i].email 
        + "</td><td class='col-2'>" + data[i].work_email 
        + "</td><td><button type='button' class='btn btn-info select-print' id='select-show' data-value='" + data[i].uid 
        + "'>Select</button></td><td style='display: none;'>" + data[i].uid + "</td></tr>");
    };

};