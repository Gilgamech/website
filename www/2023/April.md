From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [04/19/2023](#04192023) - Entangling Boltzmann

2 ideas that have been rattling around in my head:

https://www.youtube.com/embed/cLAE-YNgshc

--------------------------------------------------------------------

# [04/16/2023](#04162023) - Gildegrees

Each Gildegree is 5 degrees Celsius and 9 degrees Fahrenheit...plus 32 for Fahrenheit's offset. This uses programming technology to simplify the conversions between the 2 formats. So:

|Start|Convert|Again|End|
|------|-----------|-------|-----|
|68 °F - 32|36 / 9 |4 °G * 5|20 °C|
|20 °C / 5|9 * 4 °G|36 + 32|68 °F|
|104 °F - 32|72 / 9 |8 °G * 5|40 °C|
|40 °C / 5|9 * 8 °G|72 + 32|104 °F|

Here's a calculator to play with and help explain the concept:

::: input#calc0416
72
:::{calcTemp('f')}

::: span#mod32
F - 32  = 
:::

::: input#inputFahrenheit32
40
:::{calcTemp('f32')}

::: span#modNine
/ 9 = 
:::

::: input#inputGil
8
:::{calcTemp('g')}

::: span#modFive
G * 5 = 
:::

::: input#inputCelsius
20
:::{calcTemp('c'})

::: span#
C
:::

- Fahrenheit onchange adds mult and divis, Celsius onchange adds divis and mult.

::: script#
function calcTemp(x){
	var thirtytwo = 32;
	var five = 5;
	var nine = 9;
	var  firstOpA = '/'
	var  firstOpB = '='
	var secondOpA = '*'
	var secondOpB = '='
	var ttOpA = '='
	var ttOpB = '+'
	switch (x) {
	case 'f':
		ttOpA = '-'
		ttOpB = '='
		writeElement('inputFahrenheit32',eval(readElement('inputFahrenheit',2)+ttOpA+thirtytwo))
		writeElement('inputGil',eval(readElement('inputFahrenheit32',2)+firstOpA+nine))
		writeElement('inputCelsius',eval(readElement('inputGil',2)+secondOpA+five))
		break;
	  case 'f32':
		firstOpA = '/'
		secondOpA = '*'
		writeElement('inputFahrenheit',eval(readElement('inputFahrenheit32',2)+ttOpB+thirtytwo))
		writeElement('inputGil',eval(readElement('inputFahrenheit32',2)+firstOpA+nine))
		writeElement('inputCelsius',eval(readElement('inputGil',2)+secondOpA+five))
		break;
	  case 'g':
		firstOpA = '='
		firstOpB = '*'
		writeElement('inputFahrenheit32',eval(readElement('inputGil',2)+firstOpB+nine))
		writeElement('inputFahrenheit',eval(readElement('inputFahrenheit32',2)+ttOpB+thirtytwo))
		writeElement('inputCelsius',eval(readElement('inputGil',2)+secondOpA+five))
		break;
	  case 'c':
		firstOpA = '='
		firstOpB = '*'
		secondOpA = '='
		secondOpB = '/'
		writeElement('inputGil',eval(readElement('inputCelsius',2)+secondOpB+five))
		writeElement('inputFahrenheit32',eval(readElement('inputGil',2)+firstOpB+nine))
		writeElement('inputFahrenheit',eval(readElement('inputFahrenheit32',2)+ttOpB+thirtytwo))
		break;
	  default:
		writeElement('inputFahrenheit','72')
		writeElement('inputFahrenheit32','40')
		writeElement('inputGil','8')
		writeElement('inputCelsius','104')
	}
	writeElement('mod32','°F '+ttOpA+' '+thirtytwo+'  '+ttOpB+' ')
	writeElement('modNine',firstOpA+' '+nine+' '+firstOpB+' ')
	writeElement('modFive','°G '+secondOpA+' '+five+' '+secondOpB+' ')
}
calcTemp();
:::

--------------------------------------------------------------------

# [04/04/2023](#04042023) - Change of colors

In lieu of a full site redesign, testing out a more neutral background.

--------------------------------------------------------------------

# [04/02/2023](#04022023) - Volumetric output

Did you know Scheduled Tasks can change your Windows volume? If you live in an apartment or other community with quiet hours, consider using the new GT Automation scheduled tasks:

|Task Name|Runs at time|Performs tasks|
|--------------|--------------|--------------|
|Auto.ps1|Daily at 3am|WinGet upgrade --all, update Defender signatures and quick scan, and optimize storage drives.|
|LoudHours.ps1|Daily at 8am|Volume to 50%|
|QuietHours.ps1|Daily at 10pm|Volume to 20%|

These are Scheduled Tasks that run PowerShell scripts to perform the above tasks. Imagine never having to update software, and always having an optimized system. Never worry about waking your neighbors with loud music again. As usual, the code can be found on [Github](https://github.com/Gilgamech/GTAutomation].
