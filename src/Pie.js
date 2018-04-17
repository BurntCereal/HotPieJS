import Slice from "./Slice.js"

import {redistributeSliceCoordinates,redistributeSlicePercentages} from "./Math/calcp.js"


/*

Adding slices

1) Based on some critical variable X, recalculate percentages i.e. y = cx
2) Serially generate coordinates for each slice
3) Generate JSX element array of each slice
4) Render

Problem with this approach is theres no old state, were recreating the array and so no real animations to show change

*/



export default class Pie extends React.Component
{
	constructor(props){
    	super(props);
    	//console.log(props)
    	this.state = {radius : "100", "sliceCount" : props.sliceCount};
    	this.sliceCount = 0;
    	this.sliceArray = [];
      this.sliceElementsJSX = [];
    	
  	}

  	//percentage changes based on slices... so when new added all of the coordinates change
    //Before adding slice make sure to redistribute percentages
  	addSlice(sliceData, radius){

  		//Slice, items x0, y0, x1, y1, percent. sliceData gets passed as props to the object creation, slice data should have a variable that percentages are based on
  		var newSlice = {"x0":"","y0":"","x1":"","y1":"","percent":"", "radius":radius, "sliceData":sliceData}


  		this.sliceArray.push(newSlice);


      this.sliceArray = redistributeSlicePercentages(this.sliceArray);
  		this.sliceArray = redistributeSliceCoordinates(this.sliceArray, radius);
  		//this.sliceArray.put({"x0" : x0, "y0":y0, "x1":params.x1,"y1":params.y1,"percent":percentage})

      this.sliceCount = this.sliceArray.length;
      this.generateSliceJSX(this.sliceArray);

  	}

  	//Creates the JSX render and call rerender
    //Modify to reuse old elements to persist slice state (i.e color etc)
    //Change to addSliceJSX() etc. and keep track via array
  	generateSliceJSX(sliceArray){

      var d = new Date();

      this.sliceElementsJSX = [];

  		for(i=0; i<sliceArray.length; i++)
		{
			this.sliceElementsJSX.push(this.createSliceElement(d.getTime() + i,sliceArray[i].x0,sliceArray[i].x1, sliceArray[i].y0, sliceArray[i].y1, sliceArray[i].radius, sliceArray[i].sliceData, sliceArray[i].percent))
		}

      this.forceUpdate()

  	}

  	createSliceElement(id, x0, x1, y0, y1, radius, sliceData, percent){

      var large_arc = 0;

  		if(percent > 0.5)
  		{
  			large_arc = 1;
  		}

  		var slicePath = "M " + x0 + " " + y0 + " A " +  radius + " " + radius + " 0 " + large_arc + " 1 " +  x1 + " " + y1 + "L 0 0";

      //Need to force react to recreate elements and not reuse old ones, this may take a performance hit. We may want to 
      //fix so that old components adapt for better performance in future
		return  React.createElement(
		    Slice,
		    {key:id, "id": id, "slicePath" : slicePath, "fillColor" : this.getRandomColor(), "archProps" : {"x0" :x0,"y0":y0,"x1":x1,"y1":y1,"r":radius, "percent":percent}},
		    null
		  )

	}

    testKeyPress(event){

       if(event.key == 'Enter'){

        this.addSlice({"sliceVariable" : 10}, 1)
      }

    }


    

    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

   	render()
    {
	    return(
	    
      //Temp. Slices will be added from some external function call into library API, until then service is hidden
		<svg id="SVG" viewBox="-1 -1 4 4" onKeyDown={this.testKeyPress.bind(this)} tabIndex="0">
		    {this.sliceElementsJSX}
		</svg>

	    );
    }
}
