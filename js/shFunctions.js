function topNav() {
    //Navigation (Stays on Top)
    const nav = document.querySelector('#nav');
    nav.classList.add("w3-top", "w3-black", "w3-padding");
    const navTitle = document.createElement("span");
    navTitle.innerHTML = "Welcome to Sanus House";
    navTitle.style.fontSize = "1.4em";
    const navLinks= document.createElement("div");
    navLinks.classList.add("w3-right", "w3-hide-small");

    let navLink = document.createElement("a");
    navLink.href = "index.html";
    navLink.classList.add("w3-bar-item", "w3-button");
    navLink.innerHTML = "Home";
    navLinks.appendChild(navLink);

    navLink = document.createElement("a");
    navLink.href = "apply.html";
    navLink.classList.add("w3-bar-item", "w3-button");
    navLink.innerHTML = "Apply for Residency";
    navLinks.appendChild(navLink);

    nav.appendChild(navTitle);
    nav.appendChild(navLinks);

}

function printHeader() {
    //Navigation (Stays on Top)
    const header = document.querySelector('#printHeader');
    header.classList.add("w3-top", "w3-bar", "w3-black", "w3-padding");
    const headerLeft = document.createElement("span");
    headerLeft.innerHTML = "House Rules";
    headerLeft.style.fontSize = "1.4em";

    const headerRight= document.createElement("div");
    headerRight.classList.add("w3-right");
    headerRight.innerHTML = "Revised: 04/01/2021";
    headerRight.style.fontSize = ".8em";

    header.appendChild(headerLeft);
    header.appendChild(headerRight);

}

function sendEmail() {

    var formJSON = {};

    $('#btnSubmitSpinner').show();
    $('#btnSubmitText').text("Updating...");

    $("input, textarea").each(function() {
        formJSON[$(this).attr("id")] = $(this).val();
    });

    $("select").each(function() {
        formJSON[$(this).attr("id")] = $(this).val();
        if($(this).attr("data-text")) {
            formJSON[$(this).attr("data-text")] = $("option:selected", this).text();
        }
    });

    $.ajax({
        method: "POST",
        url: `https://uk7d698mc3.execute-api.us-west-1.amazonaws.com/Dev/apply`,
        data: JSON.stringify(formJSON),
        success: function (res) {
            //$('#btnSubmitSpinner').hide();
            $('#btnSubmitText').text("Submit");
            $('#btnSubmit').addClass("invisible");
            $('#btnSubmitStatus').addClass("alert alert-success");
            $('#btnSubmitStatus').text(`Thank you for your submission we will contact you soon to follow up.`);            
        },
        error: function(jqXHR, textStatus, errorThrown){
            $('#btnSubmitSpinner').hide();
            $('#btnSubmitText').text("Submit");
            $('#btnSubmit').addClass("invisible");
            $('#btnSubmitStatus').addClass("alert alert-success");
            $('#btnSubmitStatus').text(`There has been an error please call us at (385) 350-3013.`); 
        }
    });
}

function newApplicant() {

    var formJSON = {};

    formJSON['applicantID'] = Date.now();

    $('#btnSubmitSpinner').show();
    $('#btnSubmitText').text("Updating...");

    $("input, textarea").each(function() {
        if($(this).val()) {
            if($(this).attr("data-group")) {
                formJSON[$(this).attr("data-group")] = formJSON[$(this).attr("data-group")] || {};
                if($(this).attr("data-count")){
                    formJSON[$(this).attr("data-group")][$(this).attr("data-count")] = formJSON[$(this).attr("data-group")][$(this).attr("data-count")] || {};
                    formJSON[$(this).attr("data-group")][$(this).attr("data-count")][$(this).attr("id")] = $(this).val();
                } else {
                    formJSON[$(this).attr("data-group")][$(this).attr("id")] = $(this).val();
                }
            } else {
                formJSON[$(this).attr("id")] = $(this).val();
            }     
        }
    });

    console.log(JSON.stringify(formJSON));
    
    $.ajax({
        method: "POST",
        url: `https://uk7d698mc3.execute-api.us-west-1.amazonaws.com/Dev/newapplicant`,
        data: formJSON,
        success: function (res) {
            //$('#btnSubmitSpinner').hide();
            $('#btnSubmitText').text("Submit");
            $('#btnSubmit').addClass("invisible");
            $('#btnSubmitStatus').addClass("alert alert-success");
            $('#btnSubmitStatus').text(`Thank you for your submission we will contact you soon to follow up.`);            
        },
        error: function(jqXHR, textStatus, errorThrown){
            $('#btnSubmitSpinner').hide();
            $('#btnSubmitText').text("Submit");
            $('#btnSubmit').addClass("invisible");
            $('#btnSubmitStatus').addClass("alert alert-success");
            $('#btnSubmitStatus').text(`There has been an error please call us at (385) 350-3013.`); 
        }
    });
}

function printPage() {

    $("input, textarea, select").each(function() {
        window.localStorage.setItem($(this).attr("id"),$(this).val());
    });

    
    console.log(window.localStorage);
}

function populatePage() {

    $("span").each(function() {
        console.log(window.localStorage.getItem($(this).attr("id")));
        document.querySelector('#'+$(this).attr("id")).innerHTML = window.localStorage.getItem($(this).attr("id"))
        //window.localStorage.setItem($(this).attr("id"),$(this).val());
    });

    //document.querySelector('#name').innerHTML = window.localStorage.getItem("name")

}