//#Parent react component
//Each slice will be a react component and the whole pie will hold each slice, when slice clicked itll make its own pie, and itll just be a recursive
//process as you granularly move deeper into your data set. Then we'll add cool animation and properties etc.

import PieStack from "./PieStack.js"

require("../lib/svg.js")

/*

Databind via key pair object literal

{ key (string) : value (int) }

or

{[key, value, metadata]}

*/




export default class Rootpie extends React.Component
{
	constructor(props){
    	super(props);

    	//console.log(props)
    	this.state = {};
        this.pieStacks = {};

    	if (SVG.supported) {
    		console.log("SVG INSTALLED")
    	}
  	}


    //Main api hook from external entity, accessible via closure or something, returns a Piestack that you can bind to datasets, create pies with and add animation
    //use js getelementbyID to access it. its in the DOM. Actually that only gives you access to the DOM object, not the js object

    //For customization allow all variables liek how far to move pie out when clicked be defined by user but the actual action we code. so fadeOut % etc customizable
    
    //All we need to do is expose the properties from the html file. The parent component attributes are public
    //We can pass any object as a parameter and remember functions are objects too so now we have full control to user.
    createPieStack(){

        //Add piestack to the array, so it renders and pass a Piestack object to caller to customize that stack

    }

   	render()
    {
	    return(
	    
        if()
	    <PieStack></PieStack>

	    );
    }
}


//test set, pass to pie, key is label and value is portion of set. Set gets added up and percentage becomes slice
class dataset{

	slices : {"blue":5, "red":8, "green":1}

 }
