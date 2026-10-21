// Versión 1.1.0 - Añadida función updateUserDetails() para actualizar los detalles del usuario.
// Incluye la fecha de actualización en la columna correspondiente en Sheets.

function doGet(e) {
 var x = HtmlService.createTemplateFromFile("index");
 var y = x.evaluate();
 var z = y.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
 return z;
}

function checkLogin(username, password) {
 var url =
  "https://docs.google.com/spreadsheets/d/1m_q3KSrQIe7-QQq8osu8_1h6fal30ZYXELkeBxFUDEA/edit?gid=0#gid=0";
 var ss = SpreadsheetApp.openByUrl(url);
 var webAppSheet = ss.getSheetByName("DATA");
 var getLastRow = webAppSheet.getLastRow();
 var found_record = false;

 for (var i = 1; i <= getLastRow; i++) {
  if (
   webAppSheet.getRange(i, 1).getValue().toUpperCase() ==
    username.toUpperCase() &&
   webAppSheet.getRange(i, 2).getValue().toUpperCase() == password.toUpperCase()
  ) {
   found_record = true;
   break;
  }
 }

 return found_record ? "TRUE" : "FALSE";
}

function AddRecord(username, password, email, phone) {
 var url =
  "https://docs.google.com/spreadsheets/d/1m_q3KSrQIe7-QQq8osu8_1h6fal30ZYXELkeBxFUDEA/edit?gid=0#gid=0";
 var ss = SpreadsheetApp.openByUrl(url);
 var webAppSheet = ss.getSheetByName("DATA");

 // Validating the inputs
 if (username && password && email && phone) {
  webAppSheet.appendRow([username, password, email, phone]);
  return "SUCCESS";
 } else {
  throw new Error("Invalid input");
 }
}

function saveNotificationPreferences(notificationFrequency) {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

 var rowData = [new Date(), notificationFrequency]; // Agrega la fecha junto con la frecuencia de notificación

 sheet.appendRow(rowData);

 return "SUCCESS";
}

// Función para guardar los detalles del usuario
function saveUserDetails(username, email, phone) {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

 var lastRow = sheet.getLastRow();
 var rowData = [new Date(), username, email, phone]; // Agrega la fecha junto con los detalles del usuario

 if (lastRow > 1) {
  sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
 } else {
  sheet.appendRow(rowData);
 }

 return "SUCCESS";
}