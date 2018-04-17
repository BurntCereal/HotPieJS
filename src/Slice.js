//Using help lib for quicker mockup

import {calcSliceOutXY} from "./Math/calcp.js"

//By managing each slice independently we can do some cooler things with them then having to manage the entire pie as one
export default class Slice extends React.Component
{
	constructor(props){
    	super(props);
    	//console.log(props)
    	this.state = {};
      console.log(props.id + " " + "created")

  	}

  /*	function moveSlice()
  	{
  		var mySVG = document.getElementById("SVG");
 		var svgDoc = mySVG.contentDocument;
 		slice1 = svgDoc.getElementById("slice1");
  	}*/

    //remove all the creation props and use the svg lib. the slice component should not need to know whats its initial states were

    //Okay the whole problem is react isnt creating new node instances its reusing components so they hold the attributes of prearray 
    componentDidMount(){
      this.svg_slice = SVG.adopt(document.getElementById(this.props.id))
      this.state.x = this.svg_slice.cx();
      this.state.y = this.svg_slice.cy();

    }

    sliceHover(props){
            console.log(props.archProps.x0)

      //console.log(props.slicePath)
    var out = calcSliceOutXY(props.archProps.x0, props.archProps.x1, props.archProps.y0, props.archProps.y1, props.archProps.r)
    this.svg_slice.animate(500, '>', 100).cx(out.XOut).cy(out.YOut);
    console.log(this.svg_slice.x() + " " + this.svg_slice.y())

    }

    sliceUnhover(props){

    var out = calcSliceOutXY(props.archProps.x0, props.archProps.x1, props.archProps.y0, props.archProps.y1, props.archProps.r)
    this.svg_slice.animate(500, '>', 100).cx(this.state.x).cy(this.state.y);
    console.log(this.svg_slice.x() + " " + this.svg_slice.y())


    }

    sliceLock(){

    }

    animateSlice(){

      //As data changes we will need to update number of slices etc in cool morphing manner from parent react component
      //Within this one, we will handle slice select animations, for now simply click moves slice out, later itll be full new piestack


    }

   	render()
    {

	    return([
	    
			 //<circle cx={0} cy={0} r={1} fill="red" ></circle>
			 //Just pass itself into the onclick function its better
			 //<path id="slice1" d="M 1 0 A 1 1 0 0 1 0.8 0.59 L 0 0" onMouseOver={this.sliceHover} onMouseOut={this.sliceUnhover}></path>
       
	          <path key={this.props.id} id={this.props.id} d={this.props.slicePath} fill={this.props.fillColor} onMouseOver={() => this.sliceHover(this.props)} onMouseOut={() => this.sliceUnhover((this.props))}></path>,
        
	    ]);
    }
}
