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

    $('#nametag-view').show();

    $('#qrcode').html("");
    //new QRCode(document.getElementById("qrcode"), "https://www.siberx.org/?event_qr_code=1&ticket_id=" + selected.id + "&event_id=9718&security_code=" + selected.uid);
    new QRCode(document.getElementById("qrcode"), selected.uid + "," + selected.id);
    $('div#qrcode > img').css({"width": "100%", "object-fit": "contain"});

};

var table = [];

function fill_table() {

    $('#search-bar').attr('disabled', true);

    var fetched_data = "";
    
    fetch('https://conference.siberxchange.live/get-all-proxy')
        .then(response => response.json())
        .then(data => {
            fetched_data = data;
            fetched_data.forEach(row => {
                var working = { 'id': row[1], 'type': row[2], 'uid': row[3], 'name': row[4], 'code': row[5], 'work_email': row[6], 'role': row[7], 'org': row[8], 'email': row[9], 'dietary': row[10], 'shirt': row[11], 'checked': row[12] };
                table.push(working);
            });

    console.log(table);

    var tbody = $('tbody');

    for (var i = 0; i < table.length; i++) {  

        if (table[i]["checked"] == "0") {
            var labelString = "primary'>Registered";
        } else {
            var labelString = "success'>Checked-in";
        }

        tbody.append("<tr data-value='" + table[i].uid + "'><td  style='vertical-align: middle; width: 100px;'><span data-value='" + table[i].uid 
        + "'class='badge badge-" + labelString 
        + "</span></td><td class='col-2' id='tbl-name' style='vertical-align: middle'>" + table[i].name 
        + "</td><td class='col-2' id='tbl-role' style='vertical-align: middle'>" + table[i].role 
        + "</td><td class='col-2' id='tbl-org' style='vertical-align: middle'>" + table[i].org 
        + "</td><td class='col-2' style='vertical-align: middle'>" + table[i].email 
        + "</td><td class='col-2' id='tbl-work' style='vertical-align: middle'>" + table[i].work_email 
        + "</td><td style='vertical-align: middle'><button type='button' class='btn btn-info select-print' id='select-show' data-value='" + table[i].uid 
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
      url: "https://conference.siberxchange.live/update-user-proxy",
      type: "POST",
      crossDomain: true,
      dataType: "json",
      data: JSON.stringify({
        uid: ticket_id,
        token: security, //security_code
        name: name_field, 
        role: role_field, 
        organization: org_field, 
        purchase_email: email_field, 
        participant_email: work_email_field
      }),
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        toastPopup('Guest has been successfully updated.','success');
	$("tr[data-value='" + security + "'] > td[id='tbl-name']").text(name_field);
	$("tr[data-value='" + security + "'] > td[id='tbl-role']").text(role_field);
	$("tr[data-value='" + security + "'] > td[id='tbl-org']").text(org_field);
	$("tr[data-value='" + security + "'] > td[id='tbl-work']").text(work_email_field);
      },
      error: function (response) {
        toastPopup('There was a problem updating the guest.','danger');
      }
    });

    $('#save-button').attr('disabled', false);

  }
