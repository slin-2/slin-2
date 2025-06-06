/*

Sean Lin

*/

// Function to update the formula display based on selected conversion type
// TODO: write the body of this updateFormula() function
/* Steps to complete updateFormula():
   1. Get the value of the conversion type selected by the user from the element with id "conversion-type"
   2. Get the element with id "formula" to display the formula
   3. Check if the conversion type is "ftoc" (Fahrenheit to Celsius)
   4. If it is "ftoc", set the formula text to show the Fahrenheit to Celsius formula
   5. Otherwise, set the formula text to show the Celsius to Fahrenheit formula
*/
function updateFormula() {
    const conversionType = document.getElementById("conversion-type").value;
    const formula_element = document.getElementById("formula");
    if (conversionType === "ftoc") {
        formula_element.textContent = "(F - 32) x 5/9 = C";
    }
    else {formula_element.textContent = "(C x 9/5) + 32 = F";
}

    
} 

// Function to assess temperature and provide text and color indicators
function assessTemperature(temp, scale) {
    const tempElement = document.getElementById("temp-assessment");
    let assessment = "";
    let color = "";
    
    // Temperature thresholds differ based on scale
    if (scale === "celsius") {
        if (temp <= 0) {
            assessment = "Very Cold";
            color = "#3498db"; // Blue
        } else if (temp < 10) {
            assessment = "Cold";
            color = "#7fb3d5"; // Light blue
        } else if (temp < 20) {
            assessment = "Cool";
            color = "#a9cce3"; // Very light blue
        } else if (temp < 30) {
            assessment = "Moderate";
            color = "#2ecc71"; // Green
        } else if (temp < 40) {
            assessment = "Warm";
            color = "#f39c12"; // Orange
        } else {
            assessment = "Hot";
            color = "#e74c3c"; // Red
        }
    }
    
    if (scale === "fahrenheit") {
        if (temp <= 32) {
            assessment = "Very Cold";
            color = "#3498db"; // Blue
        } else if (temp >= 32 && temp <= 49) {
            assessment = "Cold";
            color = "#7fb3d5"; // Light blue
        } else if (temp >= 50 && temp <= 67) {
            assessment = "Cool";
            color = "#a9cce3"; // Very light blue
        } else if (temp >= 68 && temp <= 85) {
            assessment = "Moderate";
            color = "#2ecc71"; // Green
        } else if (temp >= 86 && temp <= 103) {
            assessment = "Warm";
            color = "#f39c12"; // Orange
        } else {
            assessment = "Hot";
            color = "#e74c3c"; //red
        } 
    }

    //TODO
    /* Steps to complete the Fahrenheit assessment:
       1. Use an else statement to handle the Fahrenheit scale
       2. Set up conditional statements for temperature ranges in Fahrenheit
       3. For each range, specify the appropriate assessment text and color
       4. Use the same color scheme as the Celsius part but with Fahrenheit thresholds
       5. Very Cold: <= 32°F (Blue)
       6. Cold: 32-49°F (Light blue)
       7. Cool: 50-67°F (Very light blue)
       8. Moderate: 68-85°F (Green)
       9. Warm: 86-103°F (Orange)
       10. Hot: >= 104°F (Red)
    */
    
    
    
    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";
}


function convertTemperature() {
    // Get the input temperature value
    // TODO: write the code to get the input temperature
    /* Steps to get the input temperature:
       1. Get the element with id "temperature"
       2. Get the value entered by the user
       3. Convert the value to a floating-point number using parseFloat()
    */
    // please write the code to get the input temperature as specified above
    const tempInput = document.getElementById("temperature");
   
    const tempValue = tempInput.value;

    const temperature = parseFloat(tempValue);

    const conversionType = document.getElementById("conversion-type").value;
    
    const resultElement = document.getElementById("conversion-result");
    
    if (isNaN(temperature)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        document.getElementById("temp-assessment").textContent = "";
        return;
    }
    

 
    let result = 0;

    if (conversionType === "ftoc") {
        result = (tempValue - 32) * 5 / 9;
        resultElement.textContent = `Result: ${result.toFixed(2)} C`;
        assessTemperature(result, "celsius");  
    } else {
        result = (tempValue * 9 / 5) + 32;
        resultElement.textContent = `Result: ${result.toFixed(2)} F`;
        assessTemperature(result, "fahrenheit");  
    }
}
    // Perform the conversion based on the selected type
    // TODO: write the code to do the conversion
    /* Steps to perform the conversion:
       1. Create a variable to store the result
       2. Check if the conversion type is "ftoc" (Fahrenheit to Celsius)
       3. If it is "ftoc", apply the formula: C = (F - 32) * 5/9
       4. Display the result formatted with the appropriate units
       5. Call assessTemperature with the result and "celsius" scale
       6. If it's not "ftoc", it must be "ctof" (Celsius to Fahrenheit)
       7. Apply the formula: F = (C * 9/5) + 32
       8. Display the result formatted with the appropriate units
       9. Call assessTemperature with the result and "fahrenheit" scale
       10. Use toFixed(2) to round the result to 2 decimal places

    // please write the code to calculate the result as specified above
}

// Function to clear the converter
// TODO: write the body of this clearConverter() function
/* Steps to complete clearConverter():
   1. Set the value of the input element with id "temperature" to an empty string
   2. Set the textContent of the element with id "conversion-result" to an empty string
   3. Set the textContent of the element with id "temp-assessment" to an empty string
*/
function clearConverter() {
    document.getElementById("temperature").value = "";

    
    document.getElementById("conversion-result").textContent = "";

    
    document.getElementById("temp-assessment").textContent = "";
}
