import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
          var min = "2011/04/25";
          var max ="2011/04/25";
          var age = ( data[4] ) || 0; // use data for the age column
   
          if (( ( min ) && ( max ) ) ||
          ( ( min ) && new Date(age) <= new Date(max) ) ||
          ( new Date(min) <= new Date(age)   && ( max ) ) || 
            ( new Date(min) <= new Date(age))  && new Date(age) <= new Date(max))
          {
              return true;
          }
          return false;
      }
  );
  }


  ngAfterViewInit(): void {
    

  
    var table = $('#example').DataTable();
     
    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').on("change", function(x) {
      console.log("changing",);
      
        table.draw();
    } );
// $("input[type=text]", this.footer()).on("change", function() {
//   console.log("lskadf",that);
  
//   if (that.search() !== this["value"]) {
//     that.search(this["value"]).draw();
//   }
// });

}

}
