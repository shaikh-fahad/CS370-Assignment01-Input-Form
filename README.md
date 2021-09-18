# Project: Input Form

The form application can be accessed [here](https://fs05452.github.io/CS370-Assignment01-Input-Form/HTML/input_form).

## Structure

The form itself has a somewhat simple structure which consists of the following elements:
- Header
- Input-Fields
- Labels
- Icons
- Button
- Color Gradient

As far as layout is concerned, the form is found at dead-center of the page with all its respective elements perfectly aligned and ordered. Moreover, a color-gradient presides in the background as a styling element.

## Functionality

Despite a somewhat basic-structure, the form offers complete functionality with respect to invalid/valid inputs, completion of the form and the triggering of ```CSS``` to elucidate a response to the user.

Further details on functionality can be found below.

### Submission

Submission of the form cannot occur until and unless the user has filled in all the fields - they are all marked as ```required``` in the ```HTML``` code. Furthermore, a resulting ```XML``` document is generated upon successful completion of the form which houses all the data that was input previously. As soon as the aforementioned ```XML``` document is generated, the user is prompted to download the file in addition to being ```alerted``` to open it to view the contents.

### Input Validation/Invalidation

Each input field has a ```JavaScript``` function tied to its ```onKeyup```, ```onFocus``` events wherein the relevant checks are applied with each user key stroke or element focus. Depending upon whether the user has entered a valid/invalid input, a specific CSS styling is triggered to display this verification. Specifics of the verification for each input-field are as follows:
- **First Name** and **Last Name** simply require the field to be filled.
- **Email** requires a complete and correctly formatted email address - a regex expression is used to test this format.
- **Password** has a message box display the criteria for what the password must contain.
- **Confirm Passowrd** is not checked against the password criteria rather it simply must be equal to the value of the above password field.

### JavaScript

Complete and documented JavaScript code for the project can be found [here](https://fs05452.github.io/CS370-Assignment01-Input-Form/JS/form_script.js). 

### XML File

The output ```XML``` file is styled with its own specific set of ```CSS``` rules which can be found [here](https://fs05452.github.io/CS370-Assignment01-Input-Form/Styles/xml_style.css).

