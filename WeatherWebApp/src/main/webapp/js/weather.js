function displayErr(errMsg) {
    document.getElementById('errorMsgBlock').innerHTML = 'ERROR: ' + errMsg;
}

function resetToDefault() {
    if (document.getElementById('errorMsgBlock')) {
        document.getElementById('errorMsgBlock').innerHTML = "";
    }
    
    /*********** Remove the previous references******/
    if (tblBody) {
        var tableRef = document.getElementById('weatherTbl');
        tableRef.removeChild(tblBody);
        tblBody = null;
    }
    /************************************************/ 
}

function addCityChangeListener() {
    var select = document.getElementById("cityName"); 

    // Populate list with options:
    if (select) {
        /* Add the action to allow dynamic data pull on city change */
        if (select.addEventListener) {
            select.addEventListener("change", sendAsyncRequest);
        } else if (select.attachEvent) {
            select.attachEvent("change", sendAsyncRequest);
        }        
    }
}

function buildweatherTbl(jsonObj) {
    var WeatherObj = jsonObj;               
    var tableRef = document.getElementById('weatherTbl');

    /* 
     * Insert tbody into the table 'weatherTble', using the
     * JSON response from the server.
     */
    tblBody = document.createElement("tbody");
    
    // table row creation
    var row1 = document.createElement("tr");
    var cell1 = document.createElement("td");    
    var cellText1 = document.createTextNode("City"); 
    cell1.appendChild(cellText1);
    row1.appendChild(cell1);

    var cell2 = document.createElement("td");    
    var cellText2 = document.createTextNode(WeatherObj.name); 
    cell2.appendChild(cellText2);
    row1.appendChild(cell2);
                       
    var row2 = document.createElement("tr");
    cell1 = document.createElement("td");    
    cellText1 = document.createTextNode("Updated time"); 
    cell1.appendChild(cellText1);
    row2.appendChild(cell1);

    cell2 = document.createElement("td");
    
    var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    /* As the time returned is Unix Time, UTC. Multiply by 1000 to convert into milliseconds */
    var lastUpdateDate =  new Date(parseInt(WeatherObj.dt) * 1000);
    
    var dateStr = dayOfWeek[lastUpdateDate.getDay()] + ' ' + lastUpdateDate.toLocaleTimeString();
    
    cellText2 = document.createTextNode(dateStr); 
    cell2.appendChild(cellText2);
    row2.appendChild(cell2);

    var row3 = document.createElement("tr");
    cell1 = document.createElement("td");    
    cellText1 = document.createTextNode("Weather"); 
    cell1.appendChild(cellText1);
    row3.appendChild(cell1);

    cell2 = document.createElement("td");    
    cellText2 = document.createTextNode(WeatherObj.weather[0].description); 
    cell2.appendChild(cellText2);
    row3.appendChild(cell2);

    var row4 = document.createElement("tr");
    cell1 = document.createElement("td");    
    cellText1 = document.createTextNode("Temperature"); 
    cell1.appendChild(cellText1);
    row4.appendChild(cell1);

    cell2 = document.createElement("td");    
    cellText2 = document.createTextNode(WeatherObj.main.temp + '\u2103'); 
    cell2.appendChild(cellText2);
    row4.appendChild(cell2);  

    var row5 = document.createElement("tr");
    cell1 = document.createElement("td");    
    cellText1 = document.createTextNode("Wind"); 
    cell1.appendChild(cellText1);
    row5.appendChild(cell1);

    cell2 = document.createElement("td");    
    cellText2 = document.createTextNode(WeatherObj.wind.speed + ' km/h'); 
    cell2.appendChild(cellText2);
    row5.appendChild(cell2);                     

    //row added to end of table body
    tblBody.appendChild(row1);
    tblBody.appendChild(row2);  
    tblBody.appendChild(row3); 
    tblBody.appendChild(row4);
    tblBody.appendChild(row5);

    tableRef.appendChild(tblBody);
}

function  sendAsyncRequest() {
    var spinnerDOM = document.getElementById("spinner");
    spinnerDOM.style.display = '';
    try {
        var xmlhttp;
        var cityName = document.getElementById("cityName").value;
        
        /* Get the authentication ID from config.js file */
        var appID = opConfig.appID;
        
        /* Using OpenWeatherMap Online API to get weather data */
        var url = "http://api.openweathermap.org/data/2.5/weather?" + "q=" + cityName + "&APPID=" + appID + "&units=metric"
   
        resetToDefault();
        
        if (window.XMLHttpRequest){
            /* code for IE7+, Firefox, Chrome, Opera, Safari */
            xmlhttp = new XMLHttpRequest();
        } else {
            /* code for IE6, IE5 */
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    try {
                        var jsonObj = JSON.parse(this.responseText);
                        buildweatherTbl(jsonObj);
                    } catch (err) {
                        displayErr(err.message);
                    }
                } else {
                    displayErr('Failed to communicate with the backend');
                }
            }
        }
        
        spinnerDOM.style.display = '';
        
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    } catch (err) {
        displayErr(err.message);
    } finally {
        spinnerDOM.style.display = 'none';
    }                
}