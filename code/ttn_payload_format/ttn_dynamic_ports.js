function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  
// every field is the name of the field to be returned followed by the number of bits it is in the payload. In the order it would be send.
  var fields = [['value 1', 2],['value 2', 2],['value 3', 2],['timestamp', 4],['voltage', 2],[],[]];
  //port = 3;
  var available_fields = port.toString(2);
  available_fields = available_fields.split("").reverse().join("");
  available_fields = available_fields + "0000000".substr(available_fields.length);
  var payloadByteNext = 0;
  var output = {};
  
  for(var i = 0; i < available_fields.length; i++){
    if(available_fields.charAt(i) == "1"){
       value = bytes[payloadByteNext] ;
      for(var j = 1; j < fields[i][1]; j++){
        value |= (bytes[payloadByteNext + j] << (8 * j));
      }
      name_field = fields[i][0];
      output[name_field] = value;
      payloadByteNext += fields[i][1];
    }
  }
 
return output

}
