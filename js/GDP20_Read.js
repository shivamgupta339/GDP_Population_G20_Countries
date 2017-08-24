let population=[], pop = [0,0,0,0,0,0], gdp = [0,0,0,0,0,0],outputGDP = [],popg=[0,0,0,0],gdpg=[0,0,0,0],outputPopulation=[],outputPurchasing=[],outputGrowth=[],Cntry=[],count=0,Popu=[];
const readline = require('readline')
const fs = require('fs')
let writejson1 = fs.createWriteStream('Population.json'); 				// write stream variable creation
let writejson2 = fs.createWriteStream('GDP.json');						// write stream variable creation
let writejson3 = fs.createWriteStream('Purchasing.json');  				// write stream variable creation
let writejson4 = fs.createWriteStream('Growth.json');   				// write stream variable creation
let writejson5 = fs.createWriteStream('Aggregate.json');				// write stream variable creation
let Continent = ["Asia","Africa","Australia","South_America","North_America","Europe"] 
let year = [2011,2012,2013];								
const rl = readline.createInterface({                     
	input: fs.createReadStream('datafile.csv')							// reading data from datafile.csv line by line
});
rl.on('line',(line) => {
	let jsonFromLine = {},GDP={},Purchase={} ;
	line.split('\n');
	let arr = line.split(",")
	jsonFromLine.Country = arr[0].replace(/['"]+/g, '');				//copying country name from array into object
	GDP.Country = arr[0].replace(/['"]+/g, '');
	Purchase.Country = arr[0].replace(/['"]+/g, '');
	let getvalue=(index)=>{
		return parseFloat(arr[index].replace(/['"]+/g, ''))
	}
	if(count!=0){
		if (jsonFromLine.Country !== 'European Union'){					//Checking condition for removing data of European Union
			jsonFromLine.Population = getvalue(5);
			GDP.GDP = getvalue(11);
			Purchase.Purchase = getvalue(23);											
			Cntry.push(jsonFromLine.Country);
			popg[0] += getvalue(2);										//Adding population of Year 2010
			popg[1] += getvalue(3)										//Adding population of Year 2011
			popg[2] += getvalue(4);										//Adding population of Year 2012
			popg[3] += getvalue(5);										//Adding population of Year 2013
			gdpg[0] += getvalue(20);									//Adding GDP of Year 2010
			gdpg[1] += getvalue(21);									//Adding GDP of Year 2011
			gdpg[2] += getvalue(22);									//Adding GDP of Year 2012
			gdpg[3] += getvalue(23);									//Adding GDP of Year 2013
			outputPopulation.sort(function(a,b){
				return b.Population - a.Population;
			})
			outputGDP.sort(function(a,b){
				return b.GDP - a.GDP;
			})
			outputPurchasing.sort(function(a,b){
				return b.Purchase - a.Purchase;
			})
			outputPopulation.push(jsonFromLine);
			outputGDP.push(GDP);
			outputPurchasing.push(Purchase);
		}
		outputPopulation.sort(function(a,b){
				return b.Population - a.Population;
			})
			outputGDP.sort(function(a,b){
				return b.GDP - a.GDP;
			})
			outputPurchasing.sort(function(a,b){
				return b.Purchase - a.Purchase;
			})
	}
	let calculation=(index)=>{															//Calculation function which calcualted total population of a particular continent
		pop[index] += getvalue(2)+getvalue(3)+getvalue(4)+getvalue(5);					//Adding previous data to coming data											
		gdp[index] +=  getvalue(8)+getvalue(9)+ getvalue(10)+getvalue(11);				//Adding previous data to coming data
	}
	if(jsonFromLine.Country === 'Saudi Arabia' || jsonFromLine.Country === 'India' ||  jsonFromLine.Country === 'China' 
		|| jsonFromLine.Country === 'Japan' || jsonFromLine.Country === 'Indonesia' || jsonFromLine.Country === 'Republic of korea')    //matching for continent Asia
		calculation(0);
	else if(jsonFromLine.Country === 'South Africa')										//matching for continent South Africa
		calculation(1);						
	else if(jsonFromLine.Country === 'Australia')											//matching for continent Australia
		calculation(2);
	else if(jsonFromLine.Country === 'Argentina' || jsonFromLine.Country === 'Brazil')		//matching for continent North America
		calculation(3);
	else if(jsonFromLine.Country === 'Mexico' || jsonFromLine.Country === 'Canada' || jsonFromLine.Country === 'USA')	//matching for continent South America
		calculation(4);	
	else if(jsonFromLine.Country === 'France' || jsonFromLine.Country === 'Germany' || jsonFromLine.Country === 'Italy' || jsonFromLine.Country === 'United Kingdom' || jsonFromLine.Country === 'Russia')
		calculation(5);		// matching for continent Europe
	count++;
});
rl.on('close', (line)=> {	
	for(i in year){
			let k = 1;
			k = k+parseInt(i);
		outputGrowth.push({"Year" : year[i], "Population": (popg[k] - popg[i]) , "Purchasing_Power": gdpg[k]-gdpg[i]
		})
	}
	for(i in Continent){
		population.push({"Continent": Continent[i], "Population": pop[i]/4, "GDP": gdp[i]/4
		})
	}	   							
	writejson1.write(JSON.stringify(outputPopulation, null, 2),'UTF-8');						//Writing objects into JSON files						
	writejson2.write(JSON.stringify(outputGDP, null, 2),'UTF-8');								//Writing objects into JSON files
	writejson3.write(JSON.stringify(outputPurchasing, null, 2),'UTF-8');						//Writing objects into JSON files
	writejson4.write(JSON.stringify(outputGrowth, null, 2),'UTF-8');							//Writing objects into JSON files
	writejson5.write(JSON.stringify(population, null, 2),'UTF-8');								//Writing objects into JSON files
});
