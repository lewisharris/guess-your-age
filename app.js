//Todays date
var date = new Date();

//current date collection
var months = ['January','February','March', 'April','May','June','July','August','September','October','November','December'];
var currentMonth = months[date.getMonth()];
var currentDate = date.getDate();
var currentYear = date.getFullYear();
var currentTime = date.getTime();

/*Function to add suffix to numbers ( This might be neater with switch statement) as it is an ugly function.
This will split the number given into an array which can be used to find if the number is 1 or 2 digits
This is so we can check the last digit of the number to ensure the right suffix is given but allowing the unique numbers
1,2,3,11,12,13 to be also correctly named.
*/
function addSuffix(day){
    var dayOfMonth = day;
    var splitter = dayOfMonth.toString(10).split('');
    if(splitter.length == 1){
        dayOfMonth = 0 + splitter;
        if(dayOfMonth == 01){
            return 'st';
        }
        if(dayOfMonth == 02){
            return'nd';
        }
        else if(dayOfMonth == 03){
            return'rd';
        }
        else{return 'th';
        }
    };
    if(splitter.length == 2){
        if(dayOfMonth == 11 || dayOfMonth == 12 || dayOfMonth == 13 ){
            return 'th';
        }
        else if(splitter[1]== 1){
            return 'st';
        }
        else if(splitter[1]== 2){
            return 'nd';
        }
        else if(splitter[1]== 3){
            return 'rd';
        }
        else{return 'th';
        }
    }
};

//This function is to calculate the users age, it will be used ibn the function below for calculating days, weeks and months also.
function ageCalc(birth,today){
    let age = (((today - birth)/86400000) / 365.25);
    return age;
    };

//main function to be run on the button click event. 
var send = document.getElementById('send');
send.addEventListener('click', (event) => {
        event.preventDefault();
       const birthdayResultContainer = document.getElementById('birthdayResultContainer');
    birthdayResultContainer.innerHTML = ''; // This ensures the previous result is wiped before the function runs.
        let dayOfBirth = parseInt(document.getElementById('dayOfBirth').value);
        let birthday = document.getElementById('dayOfBirth');
        let monthOfBirth = months[parseInt(document.getElementById('monthOfBirth').value) - 1];
        let birthMonth =  document.getElementById('monthOfBirth');
        let yearOfBirth = parseInt(document.getElementById('yearOfBirth').value);
        let birthYear = document.getElementById('yearOfBirth');
    if(monthOfBirth == undefined){  //To ensure that the month provided is valid. eg, not entering 13th month.
       birthMonth.value = '';
       birthMonth.placeholder = "Enter a valid month";
       birthMonth.focus();
        return;
    }
    else if(monthOfBirth == months[1] && dayOfBirth > 29 || dayOfBirth > 31 || dayOfBirth == undefined){ //To ensure that someone does not enter the 30th Feb.
        birthday.value = '';
        birthday.placeholder = "Enter a valid date";
        birthday.focus();
        return;
    }
    else{   //To ensure that the chosen date does not have the wrong amount of days in it.
        var months30 = [months[3],months[5],months[8],months[10]];
        for(i=0;i<months30.length;i++){
            if(monthOfBirth === months30[i] && dayOfBirth >= 31) {
                birthday.value = '';
                birthday.placeholder = "Enter a valid date";
                birthday.focus();
                return;
                }
        }
    if(yearOfBirth == undefined || yearOfBirth < 1900){
        birthYear.value = '';
        birthYear.placeholder = 'Enter a valid year'
        birthYear.focus();
        return;
    }
      let birthDate = new Date(`${dayOfBirth}/${monthOfBirth}/${yearOfBirth}`);
      let birthTime = birthDate.getTime();
      var monthsSinceBirth = (ageCalc(birthTime,currentTime)* 12) ;
      var weeksSinceBirth = (ageCalc(birthTime,currentTime)*52);
      var daysSinceBirth = (ageCalc(birthTime,currentTime)*365.25);
      birthdayResultContainer.insertAdjacentHTML("beforeend",`<span id='BirthdayResult'>Your Birthday is the ${dayOfBirth}${addSuffix(dayOfBirth)} ${monthOfBirth} ${yearOfBirth}</span>`);
    birthdayResultContainer.insertAdjacentHTML("beforeend",`<div id='ageResult'>You are ${Math.floor(ageCalc(birthTime,currentTime))} years old.</div>`)
    birthdayResultContainer.insertAdjacentHTML("beforeend",`<div id='monthsResult'>That\'s ${Math.floor(monthsSinceBirth)} months</div>`)
    birthdayResultContainer.insertAdjacentHTML("beforeend",`<div id='weeksResult'>${Math.floor(weeksSinceBirth)} weeks</div>`)
    birthdayResultContainer.insertAdjacentHTML("beforeend",`<div id='daysResult'>or ${Math.floor(daysSinceBirth)} days.</div>`);
    }
});