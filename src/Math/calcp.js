//Everything has to be relative to the viewbox's cartesian coordinates, so any calculations will need to be converted

function getSliceParams(lastSliceX, lastSliceY, radius, percentage, percentageLast){

	//Get degrees from origin (-1, 0) start - cant just be based on X coordinate or wont work.
	//percentageLast = Math.asin(lastSliceX / radius) / 2*Math.PI

	percentNew = percentageLast + percentage; 

	startX = lastSliceX;
	startY = lastSliceY;

	endX = Math.round(Math.sin(2*Math.PI*percentNew) * radius * 100)/100;
	endY = Math.round(Math.sin(2*Math.PI*percentNew - Math.PI/2) * radius * 100)/100;

	//console.log(percentageLast, percentNew,  startX, startY, endX, endY, radius)


	return({"x1" : endX, "y1" : endY})
}

//Serially calculates each slice's coordinates for svg map
function redistributeSliceCoordinates(sliceArray, radius){

	sliceCount = sliceArray.length;
	sliceArray[0].x0 = 0;
	sliceArray[0].y0 = -1;

	sumPercentage = 0;

	for(i=0; i<sliceCount; i++)
	{		
		coords = getSliceParams(sliceArray[i].x0, sliceArray[i].y0, radius, sliceArray[i].percent, sumPercentage);
	
		sliceArray[i].x1 =coords.x1
		sliceArray[i].y1 = coords.y1

		if(i+1<sliceCount)
		{
			sliceArray[i + 1].x0 =coords.x1
			sliceArray[i+ 1].y0 = coords.y1
		}

		sumPercentage = sumPercentage + sliceArray[i].percent;
	}

	return sliceArray;

}

//Variable is whatever the percentage is based off
function redistributeSlicePercentages(sliceArray){

	var total = 0;

	for(i=0; i<sliceArray.length; i++)
	{
		total = total + sliceArray[i].sliceData.sliceVariable;
	}

	for(i=0; i<sliceArray.length; i++)
	{
		sliceArray[i].percent = sliceArray[i].sliceData.sliceVariable / total;
	}

	return sliceArray;

}

//Gives some interesting behaviour keep it for temp. Can have different modes of animation
//random explosion animation, but these need to be seperated from core library functionality, not integrated into it
function calcSliceOutXY(x0, x1, y0, y1, radius){

	//Find midpoint, get slope from center to midpoint then extrapolate for shifted X point
	//Will have to do a percent check aswell

	var c = Math.atan2(y0 + y1, x0 + x1)
	var Xm = Math.cos(c)
	var Ym = Math.sin(c)

	slope = Ym/Xm;

	return({"XOut":2*Xm, "YOut":2*Ym, "Xm" : Xm, "Ym":Ym})

}

module.exports = {
    redistributeSliceCoordinates: redistributeSliceCoordinates,
    redistributeSlicePercentages: redistributeSlicePercentages,
    calcSliceOutXY: calcSliceOutXY
};
