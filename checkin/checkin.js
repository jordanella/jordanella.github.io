


/*var data = [
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
];*/

function print_show(ticket) {

    $('#selected-attendee').show();

    var selected = table.find(row => row.uid == ticket);

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

var table = [];

function fill_table() {
    $('#search-bar').attr('disabled', true);

    var fetched_data = "";
    
    fetch('https://checkin.siberxchange.live/get-all-users')
        .then(response => response.json())
        .then(data => {
            fetched_data = data;
            fetched_data.forEach(row => {
                var working = { 'id': row[1], 'type': row[2], 'uid': row[3], 'name': row[4], 'code': row[5], 'work_email': row[6], 'role': row[7], 'org': row[8], 'email': row[9], 'dietary': row[10], 'shirt': row[11], 'checked': row[12] };
                table.push(working);
            });

    console.log(table);

    var tbody = $('#tbody');

    for (var i = 0; i < table.length; i++) {  

        if (table[i]["checked"] == "0") {
            var labelString = "primary'>Registered";
        } else {
            var labelString = "success'>Checked-in";
        }

        tbody.append("<tr><td style='width: 100px;'><span data-value='" + table[i].uid 
        + "'class='badge badge-" + labelString 
        + "</span></td><td class='col-2'>" + table[i].name 
        + "</td><td class='col-2'>" + table[i].role 
        + "</td><td class='col-2'>" + table[i].org 
        + "</td><td class='col-2'>" + table[i].email 
        + "</td><td class='col-2'>" + table[i].work_email 
        + "</td><td><button type='button' class='btn btn-info select-print' id='select-show' data-value='" + table[i].uid 
        + "'>Select</button></td><td style='display: none;'>" + table[i].uid + "</td></tr>");
    
    };

    $('#search-bar').attr('disabled', false);
});

};

function checkGuest(security, ticket_id, checked) {
	
    $('#check-in').attr('disabled', true);

    jQuery.support.cors = true;
    $.ajax({
      url: "https://checkin.siberxchange.live/user-check-in",
      type: "POST",
      crossDomain: true,
      dataType: "json",
      data: JSON.stringify({
        uid: ticket_id,
        token: security, //security_code
        checkedin: checked // 1 or 0
      }),
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      success: function(data) {

        var checkButton = $('#check-in');
        var badge = $("span[data-value='" + checkButton.attr('data-value') + "'");
        
        if (badge.hasClass('badge-primary')) {
            checkButton.addClass('btn-info');
            checkButton.removeClass('btn-success');
            checkButton.html('Admitted');
            toastPopup('Guest successfully checked-in to the conference.','success');
            badge.html('Checked-in');
            badge.removeClass('badge-primary');
            badge.addClass('badge-success');
        } else {
            checkButton.removeClass('btn-info');
            checkButton.addClass('btn-success');
            checkButton.html('Check-in Guest');
            toastPopup('Guest check-in status has been revoked.','danger');
            badge.html('Registered');
            badge.addClass('badge-primary');
            badge.removeClass('badge-success');
        }
          
        $('.close').click();
      },

      error: function (response) {
        $('.close').click();
        toastPopup('There was a problem checking in the guest.','danger');
      }

    });
    	
    $('#check-in').attr('disabled', false);

  }

  function updateGuest(security, ticket_id, name_field, role_field, org_field, email_field, work_email_field, dietary_field, shirt_field) {
	
    $('#save-button').attr('disabled', true);

    $('#print-name').text(name_field);
    $('#print-role').text(role_field);
    $('#print-org').text(org_field);

    jQuery.support.cors = true;
    $.ajax({
      url: "https://leadgen.siberxchange.live/update_guest",
      type: "POST",
      crossDomain: true,
      dataType: "json",
      data: JSON.stringify({
        uid: ticket_id,
        token: security, //security_code
        name: name_field, 
        role: role_field, 
        org: org_field, 
        email: email_field, 
        work_email: work_email_field,
        dietary: dietary_field, 
        shirt: shirt_field
      }),
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        $('.close').click();
        toastPopup('Guest has been successfully updated.','success');
      },
      error: function (response) {
        $('.close').click();
        toastPopup('There was a problem updating the guest.','danger');
      }
    });

    $('#save-button').attr('disabled', false);

  }