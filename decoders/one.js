// esempio di payload
// byte 0: otto ingressi digitali
// byte 1: temperatura da 63 gradi a -63 gradi, risoluzione 0.5 gradi, codice errore 255
//
// stringa test 55 202
// led 1,3,5,7 on
// temperatura -10.5 gradi
function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var decoded = {};

  // if (port === 1) decoded.led = bytes[0];
  
  // fist byte decode 8 buttons
  decoded.button_1 = (bytes[0] & 1) ? 1 : 0;
  decoded.button_2 = (bytes[0] & 2) ? 1 : 0;
  decoded.button_3 = (bytes[0] & 4) ? 1 : 0;
  decoded.button_4 = (bytes[0] & 8) ? 1 : 0;
  decoded.button_5 = (bytes[0] & 16) ? 1 : 0;
  decoded.button_6 = (bytes[0] & 32) ? 1 : 0;
  decoded.button_7 = (bytes[0] & 64) ? 1 : 0;
  decoded.button_8 = (bytes[0] & 128) ? 1 :0;
  var mytemp = bytes[1];  
  
  // --------- questo codice va iplementato nel micro del trasmettitore LoraWan e nela versione definitiva va commentato
  // ATTENZIONE SE SI ESEGUE IL VALORE mytemp non viene più letto dal micro!
  /*
  // prova per trasformare una temperatura con risoluzione di 0.5 gradi in un intero con segno
  // temperatura originale
  var testtemp = -10.5;
  decoded.testtemp = testtemp;
  
  // temperatura intera con
  // 0.5 bit 6
  // segno bit 7
  // da 63 a - 63 gradi
  // se entra FF/255 errore

  mytemp = Math.floor(Math.abs(testtemp));
  mytemp = mytemp & 63;
  if (Math.abs(testtemp) - mytemp) {
    mytemp = mytemp | 64;
  } 
  
  if ( testtemp < 0 ) {
    mytemp = mytemp | 128;
  }
  
  // --------- fine del codice da implementare nel micro
  */
  
  decoded.mytemp = mytemp;
  decoded.mytemp_hex = mytemp.toString(16);
  // temperatura originale
  if (mytemp < 255 ) {
    var temp = mytemp & 63;
    if (mytemp & 64) {
      temp = temp + 0.5;
    }
    if (mytemp & 128) {
      temp = temp * -1;
    }
  } else {
    temp = "Errore";
  }
  
  decoded.temp = temp;
  decoded.byteslenght = bytes.length;
  decoded.port = port;
  return decoded;
}
