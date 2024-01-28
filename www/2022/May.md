From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [05/31/2022](#05312022) - 3d spooler business calculator.

A sequel to the [May 14th post](https://www.Gilgamech.com/blog.html#05142022).

[This device](https://www.filabot.com/collections/filabot-core/products/full-recycling-setup) costs $15k and  produces a one kg spool of filament in a little over an hour, which could either be shipped to customers by this business, or used in a complementary 3d printing business. (Need to check the cost of 3d printer spools, and possibly consider some kind of empty spool buyback program.) The Reclaimer takes post-consumer plastic as an input, meaning we could grind up soda bottles and turn them into filament to sell.

### Self employment as a spool jockey

Minutes per spool: 

::: input#minPerSpool
66
:::{runAllOfThese2()}

Spools per hour per machine: 

::: span#spoolsPerHourPerMachine
0.85
:::

Work hours per day: 

::: input#hoursPerDay
8
:::{runAllOfThese2()}

Spools per day per machine: 

::: span#spoolsPerDayPerMachine
6
::: 

Working days per month: 

::: input#workingDaysPerMonth
21
:::{runAllOfThese2()}

Spools per month per machine: 

::: span#spoolsPerMonthPerMachine
126
:::

### Spooler inventory

Number of old machines: 

::: input#nOldMachines
0
:::{runAllOfThese2()}

Number of new machines: 

::: input#nNewMachines
1
:::{runAllOfThese2()}

New Machine cost: $

::: input#newMachineCost
15000
:::{runAllOfThese2()}

### Location

Space cost per day: $

::: input#spaceCostPerDay
85
:::{runAllOfThese2()}

### Plastic cost

Price per kg: $

::: input#pricePerKg
1
:::{runAllOfThese2()}

### Fixed Costs

Total Machine cost: $

::: span#totalMachineCost
15000
:::

Space cost per year: $

::: span#spaceCostPerYear
31025
:::

Spools per year: 

::: span#spoolsPerYear
1512
:::

### Variable Costs (amortized across 1 year of spools)

Machine cost per spool: $

::: span#machineCostPerSpool
9.92
:::

Space cost per spool: $

::: span#spaceCostPerSpool
20.52
:::

Plastic cost per spool: $

::: span#filamentCostPerSpool
1
:::

Cost per spool: $

::: span#costPerSpool
31.44
:::

Because this outputs fewer spools than 3d prints in the 3d printer example before, the price of space is an even bigger input into the spool cost than it was into the 3d print cost. And so more than 4 machines in the same space quickly drops the price per spool down to market rates of around $20-25. This puts repayment rate foreach machine at around 600-750 1kg spools. To repay within 1 year, that's selling 1.6-2.1 per calendar day, or 2.3-3.0 per working day per machine. How many Google and Facebook ads would a business owner have to sell in order to move that much filament?

--------------------------------------------------------------------

# [05/20/2022](#05202022) - Heavy Weapons to Ukraine.

Comparing worldwide military heavy arms contributions to Ukraine with equipment that Ukraine have captured from Russia. So far, Russia have contributed more heavy equipment to Ukraine's defense than any other nation.

https://www.Gilgamech.com/images/UkraineHeavyArms.png

--------------------------------------------------------------------

# [05/17/2022](#05172022) - Drifters drift but coasters don't coast.

Made a coaster.

https://www.Gilgamech.com/images/BigGCoaster.jpg

The code was pretty simple, thanks to [Gilgahedron](https://www.Gilgamech.com/3dp/gilgahedron.txt). Gilgahedron 'simplifies' makng  shapes by combining size, transposition, and rotation into a single line. To use it, you'll have to rename from .txt to .SCAD after downloading, then put it in either where you save your SCAD files, or in OpenSCAD's library folder.

Like the [Business Cart](https://www.Gilgamech.com/2022/April.html#04172022) and some other creations, this is a type of marketing demonstration. The 'I will be back' is to honor the longstanding tradition of putting your coaster on your drink, to tell the bartender that you're planning to come back and finish it in a few minutes. As a type of automation, this message is hidden when the coaster is in under-drink mode. Anyway, here's the code for this coaster:

```
include  <Gilgahedron.scad>
size=5;
difference(){
    icon_extrude('BigG.dxf',2.1,2.1,5,-.5,-.65);
    gCylinder(10,33,33,0,0,5);
    gText('Gilgamech',size,size,55,-18,20,-4);
    gText('I will',size,size,55,-32,-2,-4);
    gText('be back',size,size,55,8,-2,-4);
    gText('Technologies',size,size,55,-21,-24,-4);
}
```

The first 2 lines include Gilgahedron and set the text size to 5 mm. The 3rd and 4th line sets the extruded BigG icon as the main shape, and subtracts the other shapes from it. Gilgahedron shapes start with a data variable, if any, then have size in x, y, z, followed by location transposition in x, y, z, and finally rotation degrees in x, y, and z order.  So the icon is 2.1x larger than its initial size (about 84 mm), 5x taller (about 9.5 mm), and adjusted about 1/2 mm in the x and y directions, to correct an accidental offset.

The 5th line creates a cylinder which is 10 mm tall and 33 mm radius at both top and bottom. It's shifted 5 mm down, so it intersects with the gear, deleting an inset to keep the cup. 33 mm is used to be just larger than a 64 mm diameter cup.

LInes 6-9 are the text entries, sized up to 5 mm in width and height, and 55 mm tall - since these are just being subtracted from the gear, the height isn't very important, as long as its taller than the gear. In these, you can see the data variable being populated first with the text value, followed by the 'size' variable for x and y size & 55 for the z dimension. Then these are each manually fit around the gear. Extending this part could include looping over the text string and rotating each character by 360 divided by the letter's location in the string .

--------------------------------------------------------------------

# [05/14/2022](#05142022) - 3d printer business calculator.

3d printers and their filament are very cheap, compared to the value of the product they can print. (Not sure about the resin for resin printers). This should give some idea for the price inputs for starting a 3d printing business. It leaves off sale price, profit, and revenue, which are another key part of the startup equation.

### Self employment as a print jockey

Minutes per print: 

::: input#minPerPrint
40
:::{runAllOfThese()}

Prints per hour per machine: 

::: span#printsPerHourPerMachine
1.33
:::

Hours per day: 

::: input#hoursPerDay
8
:::{runAllOfThese()}

Prints per day per machine: 

::: span#printsPerDayPerMachine
10
::: 

Working days per month: 

::: input#workingDaysPerMonth
21
:::{runAllOfThese()}

Prints per month per machine: 

::: span#printsPerMonthPerMachine
210
:::

### Printer inventory

Number of old machines: 

::: input#nOldMachines
0
:::{runAllOfThese()}

Number of new machines: 

::: input#nNewMachines
1
:::{runAllOfThese()}

New Machine cost: $

::: input#newMachineCost
180
:::{runAllOfThese()}

### Location

Space cost per day: $

::: input#spaceCostPerDay
85
:::{runAllOfThese()}

### Spool cost

Price per kg: $

::: input#pricePerKg
22
:::{runAllOfThese()}

### Fixed Costs

Total Machine cost: $

::: span#totalMachineCost
180
:::

Space cost per year: $

::: span#spaceCostPerYear
31025
:::

Prints per year: 

::: span#printsPerYear
2520
:::

### Variable Costs (amortized across 1 year of prints)

Machine cost per print: $

::: span#machineCostPerPrint
0.0714
:::

Space cost per print: $

::: span#spaceCostPerPrint
12.31
:::

Filament kg per print: 

::: span#filamentKgPerPrint
0.00181818
:::

Filament cost per print: 

::: span#filamentCostPerPrint
0.04
:::

Cost per print: $

::: span#costPerPrint
12.42
:::

By far, the biggest input is the cost of space, and if that space cost can be divided across several machines, it brings the price back down. Of course there are additional considerations, such as finishing, shipping, maintenance, and business operations such as accounting, HR, stock maintenance, security, etc.

::: script#
function runAllOfThese(){
writeElement('printsPerHourPerMachine',getRoundedNumber(60/(readElement('minPerPrint')*1+5),2));
writeElement('printsPerDayPerMachine',Math.floor(readElement('hoursPerDay')*readElement('printsPerHourPerMachine')));
writeElement('printsPerMonthPerMachine',readElement('workingDaysPerMonth')*readElement('printsPerDayPerMachine'));
writeElement('totalMachineCost',(readElement('newMachineCost')*readElement('nNewMachines')));
writeElement('spaceCostPerYear',readElement('spaceCostPerDay')*365)
writeElement('printsPerYear',readElement('printsPerMonthPerMachine')*12*((readElement('nOldMachines')*1)+(readElement('nNewMachines')*1)));
writeElement('machineCostPerPrint',getRoundedNumber(readElement('totalMachineCost')/readElement('printsPerYear'),2));
writeElement('spaceCostPerPrint',getRoundedNumber(readElement('spaceCostPerYear')/readElement('printsPerYear'),2));
writeElement('filamentKgPerPrint',getRoundedNumber(readElement('minPerPrint')/22000,8));
writeElement('filamentCostPerPrint',getRoundedNumber(readElement('pricePerKg')*readElement('filamentKgPerPrint'),4));
writeElement('costPerPrint',getRoundedNumber((readElement('machineCostPerPrint')*1)+(readElement('spaceCostPerPrint')*1)+(readElement('filamentCostPerPrint')*1),2));
}
function runAllOfThese2(){
writeElement('spoolsPerHourPerMachine',getRoundedNumber(60/(readElement('minPerSpool')*1+5),2));
writeElement('spoolsPerDayPerMachine',Math.floor(readElement('hoursPerDay')*readElement('spoolsPerHourPerMachine')));
writeElement('spoolsPerMonthPerMachine',readElement('workingDaysPerMonth')*readElement('spoolsPerDayPerMachine'));
writeElement('totalMachineCost',(readElement('newMachineCost')*readElement('nNewMachines')));
writeElement('spaceCostPerYear',readElement('spaceCostPerDay')*365)
writeElement('spoolsPerYear',readElement('spoolsPerMonthPerMachine')*12*((readElement('nOldMachines')*1)+(readElement('nNewMachines')*1)));
writeElement('machineCostPerSpool',getRoundedNumber(readElement('totalMachineCost')/readElement('spoolsPerYear'),2));
writeElement('spaceCostPerSpool',getRoundedNumber(readElement('spaceCostPerYear')/readElement('spoolsPerYear'),2));
writeElement('filamentCostPerSpool',getRoundedNumber(readElement('pricePerKg'),4));
writeElement('costPerSpool',getRoundedNumber((readElement('machineCostPerSpool')*1)+(readElement('spaceCostPerSpool')*1)+(readElement('filamentCostPerSpool')*1),2));
}
:::
