/*
    Name: Fahad Shaikh
    ID: 05452    
    This is the script file that will be incorporated in our html document
*/

/*
    These are boolean flags which are triggered on the satisfaction/disatisfaction
    of criteria of the respective input fields.
*/
var firstn = false; // false if field is empty
var lastn  = false; // false if field is empty
var email = false;  // false if '@' and '.com' are missing
var pwd1 = false;  // false if given criteria fails
var pwd2 = false; // false if pwds don't match

/**
 * Function generates the output XML file and prompts
 * the user for download of the file.
 * @param  {[string]} contentType Refers to the type attribute in the XML header
 * @param  {[string]} data The XML content
 * @param  {[string]} filename The output file name
 */
function downloadData(contentType,data,filename){
    
    var link=document.createElement("A");
    link.setAttribute("href",encodeURI("data:"+contentType+","+data));
    link.setAttribute("style","display:none");
    link.setAttribute("download",filename);
    document.body.appendChild(link); //needed for firefox
    console.log(link.outerHTML);
    link.click();
    setTimeout(function(){
        document.body.removeChild(link);
    },1000);
}


/**
 * Function that takes HTML form input and writes the XML document
 * @param  {[object]} form The HTML form object which is passed on final submission
 */
function fromToXml(form)
{
    var xmldata=['<?xml version="1.0"?>'];
    xmldata.push('<?xml-stylesheet type="text/css" href="https://fs05452.github.io/CS370-Assignment01-Input-Form/Styles/xml_style.css"?>'); // add link to CSS
    xmldata.push("<form>");
    xmldata.push("<data>");
    var inputs=form.elements;
    
    for (var j = 0; j < 4; j++)
    {
        var el=document.createElement("header");
        el.innerHTML = inputs[j].name;
        xmldata.push(el.outerHTML);
    }
    xmldata.push("</data>");

    xmldata.push("<data>");
    for(var i = 0; i < 4; i++)
    {        
        var el=document.createElement(inputs[i].id);
        el.innerHTML = inputs[i].value;
        xmldata.push(el.outerHTML);
    }
    xmldata.push("</data>");
    xmldata.push("</form>");
    return xmldata.join("\n");
}

/**
 * Function that prompts extraction of input from HTML form into a XML document
 * and further prompts its download on the user's computer 
 * @param  {[object]} form The HTML form object which is passed on final submission
 */
function download(frm)
{
    var data=fromToXml(frm);
    downloadData("text/xml",data,"export.xml");
}

/**
 * It verifies whether all rules and criteria of the form have been met by
 * checking the boolean flags for each input field and in turn prompts
 * the appropiate response.
 * @param  {[object]} form The HTML form object which is passed on final submission
 */
function submission(myForm)
{

    if (firstn == true &&
        lastn == true &&
        email == true &&
        pwd1 == true &&
        pwd2 == true)
    {
        alert('Generating XML File. Once downloaded open it in your browser.');
        download(myForm);
        location.reload();
    }
    else // form not correctly filled in
    {
        alert("Please fill in all fields and follow all rules");
    }

    // otherwise if format not correct hence won't submit
    // and if something not filled - browser will take care of it
}


/**
 * Function to apply a particular CSS style for a specified element
 * @param  {[string]} id The ID of the relevant input field 
 * @param  {[string]} before The CSS style class which the element pointed by id has (to be removed)
 * @param  {[string]} after  The CSS style class which the element pointed by id wants (to be added)
 */
function cssSwap(id, before, after)
{
    document.getElementById(id).classList.remove(before);
    document.getElementById(id).classList.add(after);
}

/**
 * Function to trigger the status display of the selected input field - of the span element next to the input element.
 * This is called on the onFocus event of all the input fields.
 * @param  {[string]} src The ID of the relevant input field 
 * @param  {[string]} dest The ID of the span element next to the aforementioned input field
 */
function inFocus(src, dest)
{
    if (src == 'fname' ||
        src == 'lname' ||
        src == 'email')
    {
        document.getElementById(dest).style.display = "inline";
    }
    else // the first pwd field - display message box for
    {        
        document.getElementById("check5").style.display = "inline"; // span element adjacent to pwd1        
        document.getElementById(dest).style.display = "block"; // validation message box for pwd1
    }
}

/**
 * Function called by validateName to trigger the fname and lnmae boolean flags as per
 * the onkeyup event of the First Name and Last Name fields
 * @param  {[string]} name The ID of the relevant input field 
 * @param  {[Number]} flag Integer flag which indicates whether to trigger true or false
 */
function nameUpdate(name, flag)
{
    if (flag == 0)
    {
        if (name == "fname")
        {
            firstn = false;
        }
        else if (name == "lname")
        {
            lastn = false;
        }
    }
    else
    {
        if (name == "fname")
        {
            firstn = true;
        }
        else if (name == "lname")
        {
            lastn = true;
        }
    }
}

/**
 * Function that is mapped to the onkeyup event of the Name fields.
 * Based on correct/incorrect input of the fields, CSS styles are applied to the adjacent span element
 * to indicate response.
 * @param  {[string]} name The ID of the relevant input field 
 * @param  {[Number]} check The ID of the relevant span element next to the element specified by name. 
 */
function validateName(name, check)
{
    if (document.getElementById(name).value == "") // invalid thus apply red cross
    {
        cssSwap(check, "statusafter", "statusbefore");
        nameUpdate(name, 0);                    
    }
    else // valid thus apply green check
    {
        cssSwap(check, "statusbefore", "statusafter");
        nameUpdate(name, 1)
    }
}

/**
 * Function that is mapped to the onkeyup event of the Email field.
 * Based on correct/incorrect input of the field, CSS styles are applied to the adjacent span element
 * to indicate response.
 * @param  {[string]} mail The ID of the email field 
 * @param  {[Number]} check The ID of the relevant span element next to the element specified by name. 
 */
function validateEmail(mail, check)
{
    const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (document.getElementById(mail).value == "") // invalid thus red cross
    {
        cssSwap(check, "statusafter", "statusbefore");
        email = false;
    }
    else
    {
        if (emailRegex.test(document.getElementById(mail).value.trim())) // provided email must be in a valid format
        {
            cssSwap(check, "statusbefore", "statusafter");
            email = true;
        }
        else // invalid thus, red cross
        {
            cssSwap(check, "statusafter", "statusbefore");
            email = false;
        }
    }
}

/**
 * Function that is mapped to the onblur event of the first Password field.
 * Hide the accompanying criteria message box that is displayed when focusing on the aforementioned field
 * @param  {[string]} id The ID of the message box element 
 */
function removeMsg(id)
{
    document.getElementById(id).style.display = 'none';
}

/**
 * Function that is mapped to the onkeyup event of the first Password field.
 * Based on correct/incorrect input of the field, CSS styles are applied to the adjacent span element
 * in adiition, to the accompanying message box.
 * @param  {[string]} id The ID of the first Password field
 */
function validatePwd(id)
{
    usrInput = document.getElementById(id);
    var count = 0  // counts the # of criteria met

    // validate lower letters
    var lowerCaseLetters = /[a-z]/g;
    if(usrInput.value.match(lowerCaseLetters))
    {  
        cssSwap("letter", "invalid", "valid");
        count++;
    }
    else
    {
        cssSwap("letter", "valid", "invalid");
        count--;
    }

    // validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(usrInput.value.match(upperCaseLetters))
    {  
        cssSwap("capital", "invalid", "valid");
        count++;
    }
    else
    {
        cssSwap("capital", "valid", "invalid");
        count--;
    }

    // validate numbers
    var numbers = /[0-9]/g;
    if(usrInput.value.match(numbers))
    {  
        cssSwap("number", "invalid", "valid");
        count++;
    }
    else
    {
        cssSwap("number", "valid", "invalid");
        count--;
    }

    // validate length
    if(usrInput.value.length >= 8) 
    {
        cssSwap("length", "invalid", "valid");
        count++;
    }
    else
    {
        cssSwap("length", "valid", "invalid");
        count--;
    }

    pwdConfirmation('pwd2', id, 'check4'); // toggle pwd2 field styles as we input pwd1

    if (count == 4) // all criteria satisfied
    {
        cssSwap("check5", "statusbefore", "statusafter");
        pwd1 = true;
    }
    else // some to none criteria met hence invalid
    {
        cssSwap("check5", "statusafter", "statusbefore");
        pwd1 = false;
    }
}

/**
 * Function that is mapped to the onkeyup and onfocus events of the second Password field.
 * Based on a successful match between the values of the first and second password fields
 * the appropiate CSS styles are applied.
 * @param  {[string]} pass2 The ID of the second Password field
 * @param  {[string]} pass1 The ID of the first Password field
 * @param  {[string]} check The ID of the span element adjacent to the second pwd field
 */
function pwdConfirmation(pass2, pass1, check)
{
    var p2 = document.getElementById(pass2); // pwd2
    var p1 = document.getElementById(pass1); // pwd1
    
    document.getElementById(check).style.display = 'inline';
    document.getElementById(pass2).classList.add("pwbefore");

    if (p1.value == p2.value && p1.value != "") // passwords match - valid
    {
        // don't check pwd2 for criteria specification (is handled by pwd1) but do check if it isn't empty 
        cssSwap(check, "pbefore", "pafter");
        cssSwap(pass2, "pwbefore", "pwafter");

        pwd2 = true;
    }
    else // no match - invalid
    {
        cssSwap(check, "pafter", "pbefore");   
        cssSwap(pass2, "pwafter", "pwbefore");

        pwd2 = false;
    }
}

/**
 * Function that is mapped to the onclick event of the eye icon adjacent to the pwd1 field
 * It toggles the type of the fields input b/w password and text and toggles the icon as well.
 */
function togglePwd()
{
    var toggle = document.getElementById('togglePassword'); 
    var pass = document.getElementById('pwd');
    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
    pass.setAttribute('type', type);
    toggle.classList.toggle('bi-eye');
}