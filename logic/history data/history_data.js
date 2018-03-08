/**
 * Created by Tomer on 26/02/2018.
 */

var Converter = require("csvtojson").Converter;
var converter = new Converter({});


// //end_parsed will be emitted once parsing finished
// converter.on("end_parsed", function(jsonArray) {
//     console.log(jsonArray); //here is your result jsonarray
// });
//
// //read from file
// require("fs").createReadStream("./data.csv").pipe(converter);
//

        converter.fromFile("./export-EtherPrice.csv",function(err,result){
            // if an error has occured then handle it
            if(err){
                console.log("An Error Has Occured");
                console.log(err);
            }
            // create a variable called json and store
            // the result of the conversion
            var json = result;

            // log our json to verify it has worked
            console.log("get Json func: "+ JSON.stringify(json));

            });


