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

function newApplicant() {

    var formJSON = {};

    formJSON['applicantID'] = Date.now();
    formJSON['applicationDate'] = new Date().toLocaleDateString();

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
            } else if($(this).attr('type')=='checkbox') {
                if($(this).prop('checked')) {
                    formJSON[$(this).attr("id")] = $(this).val();
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
        data: JSON.stringify(formJSON),
        success: function (res) {
            $('#btnSubmitStatus').show();
            $('#btnSubmit').hide();
            if(res.errorMessage=='error') {
                $('#btnSubmitStatus').addClass("w3-pale-red");
                $('#btnSubmitStatus').text(`There has been an error please call us at (385) 350-3013.`); 
                return;
            };
            //$('#btnSubmitSpinner').hide();
            $('#btnSubmitStatus').addClass("w3-pale-green");
            $('#btnSubmitStatus').text(`Thank you for your submission we will contact you soon to follow up.`);            
        },
        error: function(jqXHR, textStatus, errorThrown){
            $('#btnSubmitStatus').show();
            $('#btnSubmit').hide();
            $('#btnSubmitStatus').addClass("w3-pale-red");
            $('#btnSubmitStatus').text(`There has been an error please call us at (385) 350-3013.`); 
        }
    });
}

// function printPage() {

//     $("input, textarea, select").each(function() {
//         window.localStorage.setItem($(this).attr("id"),$(this).val());
//     });
    
//     console.log(window.localStorage);
// }

// function populatePage() {

//     $("span").each(function() {
//         console.log(window.localStorage.getItem($(this).attr("id")));
//         document.querySelector('#'+$(this).attr("id")).innerHTML = window.localStorage.getItem($(this).attr("id"))
//         //window.localStorage.setItem($(this).attr("id"),$(this).val());
//     });

//     //document.querySelector('#name').innerHTML = window.localStorage.getItem("name")

// }