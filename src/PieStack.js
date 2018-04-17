import Pie from "./Pie.js"

//Will eventually create multiple stacks with fade etc 
export default class PieStack extends React.Component
{
	constructor(props){
    	super(props);
    	//console.log(props)
    	this.state = {};
  	}

    addPie(){
      
    }

   	render()
    {
	    return(
	   		
	    	<Pie></Pie>
	    );
    }
}