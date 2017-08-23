Project Title: GDP_Population_G20_Countries

About the project: It is a simple project that converts the CSV file(datafile.csv) into five JSON files(Population.json, GDP.json, Purchasing.json, Growth.json and Aggregate.json), based on the requirements to make the charts and graphs. It is a simple CSV to JSON converter for GDP and population data for 20 countries,using JavaScript ES-6, which works for the given csv file and conditions specific to project only.

Prerequisites: Your system must have latest version of node js installed.

Technologies with: JavaScript

Description: datafile.csv is a file that contains data in form of comma seperated values. The data from the file is received in asynchronous manner, using readStream. The GDP20_Read.js ia a javaScript file that creates five JSON files,for plotting graphs of:

a)For the year 2013, a bar chart of population by country, in descending order.
b)For the year 2013, a bar chart of GDP by country, in descending order.
c)For the year 2013, a bar chart of Purchasing Power by country, in descending order. 
d)Plot the growth in population from 2010 to 2013 and growth in Purchasing power over the same period in a stacked bar chart. e)Aggregate the Population and GDP of the G20 countries by continent and plot.

Given : datafile.csv (size : 6.6 kB)
Logic: 1. Convert csv to Required JSONs
2. Convert JSONs to required D3s
Minimum System requirements:

S/W : Any Operating System
H/W : 512 MB RAM, 100 GB Hard Disk, Web Browser, local server
