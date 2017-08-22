let population=[], pop = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], gdp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],outputGDP = [],pop1011=[],pop1112=[],pop1213=[],gdp1011=[],gdp1112=[],gdp1213=[],outputPopulation=[],outputPurchasing=[],outputGrowth=[],Cntry=[],count=0,Popu=[];
const readline = require('readline')
const fs = require('fs')
let writejson1 = fs.createWriteStream('Population.json'); 								// write stream variable creation
let writejson2 = fs.createWriteStream('GDP.json');										// write stream variable creation
let writejson3 = fs.createWriteStream('Purchasing.json');  								// write stream variable creation
let writejson4 = fs.createWriteStream('Growth.json');   								// write stream variable creation
let writejson5 = fs.createWriteStream('Aggregate.json');  								// write stream variable creation
const rl = readline.createInterface({                     
	input: fs.createReadStream('datafile.csv')											// reading data from datafile.csv line by line
});
rl.on('line',(line) => {
	let jsonFromLine = {},GDP={},Purchase={} ;
	line.split('\n');
	let arr = line.split(",")
	jsonFromLine.Country = arr[0].replace(/['"]+/g, '');								//copying country name from array into object
	GDP.Country = arr[0].replace(/['"]+/g, '');
	Purchase.Country = arr[0].replace(/['"]+/g, '');
	var getvalue=(index)=>{
		return parseFloat(arr[index].replace(/['"]+/g, ''))
	}
	if(count!=0){
		if (jsonFromLine.Country !== 'European Union'){									//Checking condition for removing data of European Union
			jsonFromLine.Population = getvalue(5);
			GDP.GDP = getvalue(11);
			Purchase.Purchase = getvalue(23);											
			Cntry.push(jsonFromLine.Country);
			pop1011.push(getvalue(3)- getvalue(2));										//pushing difference in population
			pop1112.push(getvalue(4)- getvalue(3));										//pushing difference in population
			pop1213.push(getvalue(5)- getvalue(4));										//pushing difference in population
			gdp1011.push(getvalue(21) - getvalue(20));									//pushing difference in GDP
			gdp1112.push(getvalue(22) - getvalue(21));									//pushing difference in GDP
			gdp1213.push(getvalue(23) - getvalue(22));									//pushing difference in GDP
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
		pop[index] += getvalue(5);														//Adding previous data to coming data											
		gdp[index] += getvalue(11);														//Adding previous data to coming data
		pop[index+6] += getvalue(2);													//Adding previous data to coming data
		gdp[index+6] += getvalue(8);													//Adding previous data to coming data
		pop[index+12] += getvalue(3);													//Adding previous data to coming data
		gdp[index+12] += getvalue(9);													//Adding previous data to coming data
		pop[index+18] += getvalue(4);													//Adding previous data to coming data
		gdp[index+18] += getvalue(10);													//Adding previous data to coming data
	}
	if(jsonFromLine.Country === 'Saudi Arabia' || jsonFromLine.Country === 'India' ||  jsonFromLine.Country === 'China' 
		|| jsonFromLine.Country === 'Japan' || jsonFromLine.Country === 'Indonesia' || jsonFromLine.Country === 'Republic of korea')    //matching for continent Asia
		calculation(0);
	else if(jsonFromLine.Country === 'South Africa')																																									//matching for continent South Africa
		calculation(1);						
	else if(jsonFromLine.Country === 'Australia')																																											//matching for continent Australia
		calculation(2);
	else if(jsonFromLine.Country === 'Argentina' || jsonFromLine.Country === 'Brazil')																								//matching for continent North America
		calculation(3);
	else if(jsonFromLine.Country === 'Mexico' || jsonFromLine.Country === 'Canada' || jsonFromLine.Country === 'USA')									//matching for continent South America
		calculation(4);	
	else if(jsonFromLine.Country === 'France' || jsonFromLine.Country === 'Germany' || jsonFromLine.Country === 'Italy' || jsonFromLine.Country === 'United Kingdom' || jsonFromLine.Country === 'Russia')
		calculation(5);		// matching for continent Europe
	count++;
});
rl.on('close', (line)=> {
	pop[5] = pop[5] / 5; gdp[5] = gdp[5]/5; pop[11] = pop[11] / 5; gdp[11] = gdp[11]/5;  pop[17] = pop[17] / 5; gdp[17] = gdp[17]/5;  pop[23] = pop[23] / 5; gdp[23] = gdp[23]/5;
	pop[4] = pop[4] / 3; gdp[4] = gdp[4]/3;	pop[10] = pop[10] / 5; gdp[10] = gdp[10]/5;  pop[16] = pop[16] / 5; gdp[16] = gdp[16]/5;  pop[22] = pop[22] / 5; gdp[22] = gdp[22]/5;
	pop[3] = pop[3] / 2; gdp[3] = gdp[3]/2;	pop[9] = pop[9] / 5; gdp[9] = gdp[9]/5;   pop[15] = pop[15] / 5; gdp[15] = gdp[15]/5;  pop[21] = pop[21] / 5; gdp[21] = gdp[21]/5;
	pop[0] = pop[0] / 6; gdp[0] = gdp[0]/6;	pop[6] = pop[6] / 5; gdp[6] = gdp[6]/5;   pop[12] = pop[12] / 5; gdp[12] = gdp[12]/5;  pop[18] = pop[18] / 5; gdp[18] = gdp[18]/5;
	for(i in Cntry){
		outputGrowth.push({
				"Country": Cntry[i],"Growth_1011" : pop1011[i],"Growth_1112" : pop1112[i],"Growth_1213" : pop1213[i],"Purchasing_1011" : gdp1011[i],"Purchasing_1112" : gdp1112[i],"Purchasing_1213" : gdp1213[i]
			})
	}
	let save=(k,year)=>{								//save function which saves data depending on year into object
		population.push({	
		"Year": year ,"Australia-Pop" : pop[k+2],"Africa-Pop" : pop[k+1],"Asia-Pop" : pop[k],"Europe-Pop" : pop[k+5],"North_America-Pop" : pop[k+4],"South_America-Pop" : pop[k+3],
		"Australia-GDP" : gdp[k+2],"Africa-GDP" : gdp[k+1],"Asia-GDP" : gdp[k+0],"Europe-GDP" : gdp[k+5],"North_America-GDP" : gdp[k+4],"South_America-GDP" : gdp[k+3],
		});
	}	
	save(0,2013);	save(6,2010);	save(12,2011);	save(18,2012);	     							
	writejson1.write(JSON.stringify(outputPopulation, null, 2),'UTF-8');						//Writing objects into JSON files						
	writejson2.write(JSON.stringify(outputGDP, null, 2),'UTF-8');								//Writing objects into JSON files
	writejson3.write(JSON.stringify(outputPurchasing, null, 2),'UTF-8');						//Writing objects into JSON files
	writejson4.write(JSON.stringify(outputGrowth, null, 2),'UTF-8');							//Writing objects into JSON files
	writejson5.write(JSON.stringify(population, null, 2),'UTF-8');								//Writing objects into JSON files
});