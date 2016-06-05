<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ page import="com.prhazari.weather.App" %>
<%@ page import="java.util.List" %>
<html>
    <head>
        <title>Get Current Weather</title>
        <!-- <meta charset="UTF-8"> -->
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <style type="text/css">     

        td {
            vertical-align:top;
        }
        .style1 label {
            margin-right:10px;          
        }
        
        .style2 label {
            margin-right:10px;
            margin-left:30px;
        }       

        .style2 td {
            text-align:left;
        }   
        
        .style3 {
            border: 1px solid black;
            border-collapse: collapse;
            width:50%;
        }

        .style3 thead {
            background-color:gray;
            border: 1px solid black;
        }

        .style3 tfoot {
            border: 1px solid black;
        }   
        
        .style3 td {
            border: 1px solid black;
            text-align: left;
        }       

        .style3 th {
            border: 1px solid black;
            border-collapse: collapse;  
            text-align: left;
        }   

        .errStyle {
            color:red;
        }
        
        .default {
            color:black;
        }
        
        </style>
        <script src="js/weather.js"></script>
        <script src="resource/config.js"></script>
        <script type="text/javascript">
            /**** Global Variables*********/
            var tblBody;
            /**** Global Variables*********/
            
            function onloadHndlr() {
                /* Reset to default style */
                resetToDefault();
                
                /* Add City change listner */
                addCityChangeListener();
            };          
            /************ Function Definition Section Ends ******************/
            
            if (window.addEventListener) {
                window.addEventListener("load", onloadHndlr);
            } else if (window.attachEvent) {
                window.attachEvent("onload", onloadHndlr);
            }
            
            window.onload = onloadHndlr();
        </script>        
    </head>   
    <%
        App myApp = new App();

        List<String> listOfCities = myApp.getCityList();
    %>    
    <body>  
        <h1>Weather</h1>
           <table class="style2">              
                <tr>
                    <td><label id="lblCity">City:</label></td>
                    <td>
                        <select id="cityName">
                        <%  for (int i = 0; i < listOfCities.size(); i++) { %>
                            <option><%= listOfCities.get(i)%></option>
                        <% } %>                        
                        </select>
                    </td>
                    <td><button type="button" onclick="sendAsyncRequest()">Query</button></td>
                </tr>                   
            </table>
        <br/>
        <div id="errorMsgBlock" class="errStyle"></div>
        <div id ="spinner" style="display:none">
            <img alt="loading" src="resource/images/spinner.gif">
        </div>
        <div>
            <table class="style3" id="weatherTbl">
            </table>        
        </div>
    </body>
</html>
