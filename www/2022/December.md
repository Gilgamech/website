::: style#
body { background-color: #700;} .textBubbleBG { border: 1px solid #32CD32;}
:::

From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [12/18/2022](#12182022) - Electricity consumption cost calculator.

Given the propensity to supplement the meager solar illumination with domestic illumination, a calculator to compute 'how much will this light strand cost me per day' seemed apropos.

## Electricty cost calculator

Cost of electricity: $

::: input#CostInput
0.10
:::{calcElec();}

::: span#/kWh
:::

Amperage of device: 

::: input#AmpInput
.25
:::{calcElec();}

::: span#
 Amps
:::

Wattage of device at 120v: 

::: input#WattCalc
30
:::{calcElec(1);}

::: span#
 Watts
:::

Hourly electricity consumption: 

::: input#ConsCalc
0.03
:::{calcElec();}

::: span#
 kWh
:::

Cost of 1 hour of operation: $

::: input#HourCost
0.003
:::{calcElec();}

Cost per day of operation: $

::: input#DayCost
0.072
:::{calcElec();}

Cost per month (30 days) of operation: $

::: input#MonthCost
2.16
:::{calcElec();}

::: script#
function calcElec(op) {; if (op ==1) {writeElement('AmpInput',getRoundedNumber(readElement('WattCalc'/120),2));} else {writeElement('WattCalc',getRoundedNumber(readElement('AmpInput'*120),2)));}; writeElement('ConsCalc',getRoundedNumber(readElement('WattCalc'/1000),4)); writeElement('HourCost',getRoundedNumber(readElement('CostInput')*readElement('ConsCalc)),4)); writeElement('DayCost',getRoundedNumber(readElement('HourCost'*24),4); writeElement('MonthCost',getRoundedNumber(readElement('DayCost'*30),2);}; calcElec(); 
:::

--------------------------------------------------------------------

# [12/11/2022](#11211022) - Mockingbird Decipher.

Bringing back the encryption inputs, so everything is in the same place.

## Input

::: Input#keyInput
HELLOWORLD
:::{outputMockingCipher2('keyInput','txtInput','txtMid','txtEnc','txtDecrypt','keyOutput')}

Text (publicly seen, use a meme or random strings):

::: textarea#txtInput
This lets you hide info in what looks like mocking text, Lorem Ipsum, Sagan Ipsum, or other texts
:::{outputMockingCipher2('keyInput','txtInput','txtMid','txtEnc','txtDecrypt','keyOutput')}

## Encryption

Text:

::: textarea#txtMid
:::{outputMockingCipher2('keyInput','txtInput','txtMid','txtEnc','txtDecrypt','keyOutput')}

Encrypted:

::: textarea#txtEnc
:::{outputMockingCipher2('keyInput','txtInput','txtMid','txtEnc','txtDecrypt','keyOutput')}

## Decryption

Key output:

::: textarea#keyOutput
:::{outputMockingCipher2('keyInput','txtInput','txtMid','txtEnc','txtDecrypt','keyOutput')}

Text:

::: textarea#txtDecrypt
:::{outputMockingCipher2('keyInput','txtInput','txtMid','txtEnc','txtDecrypt','keyOutput')}

And it could be mixed with another cipher like Running Man cipher to further obfuscate your message. This would be the Other Roadrunner Cipher. Another way to obfuscate is to add some kind of key or default. Consider if the starting text were aLtErRnAtInG cApS, and the cipher were applied. This allows one-time pads and other standard enhancements to work on this cipher as well.

Todo:

- Handle key overflow better
- Increase key precision
- Decrypt key - will require diffing middle vs original text, or specifying an encoding pattern.
- Auto-Enigma Man

::: script#
function outputMockingCipher2(keyInput,txtInput,mocked,encrypted,decrypted,keyOutput)  {writeElement(mocked,doMockingCipher(readElement(keyInput),readElement(txtInput))); writeElement(encrypted,doMockingCipher(readElement(keyInput),doEnigmaMan(1,readElement(mocked)))); writeElement(keyOutput,revertMockingCipher(readElement(encrypted))); writeElement(decrypted,doEnigmaMan(2,readElement(encrypted)));}; outputMockingCipher2('keyInput','txtInput','txtMid','txtEnc','txtDecrypt','keyOutput'); 
:::

--------------------------------------------------------------------

# [12/02/2022](#12022022)> - Winter recipes.

## Breakfast

### Egg monster

- Egg portal is a Ziploc Small Round (short round) 4oz container.
- Microwave 1-2 patties or 3-5 links of sausage in your egg portal for 1 minute or until done. Transfer to plate. 
- Crack one egg into egg portal. Add seasonings (salt, pepper, and paprika recommended) and another egg. You'll have to watch it cook. Microwave for 2 minutes or until done. 
- Watch it closely and stop it if it's about to fall over, to cut off the top half and restart the bottom half to finish cooking.
- It's done when the liquid egg mixture has completely solidified. Usually it will rise out of the egg portal menacingly. Don't be afraid - be hungry.

## Thanksgiving Dinner

### Cranberry sauce:

- Microsteam 1 bag of raw cranberries until most of them have popped open, serve. 
- The overwhelming sourness is a feature to be offset by other foods.

### Mashed potatoes:

- Cube and microsteam 3.5 cups of potatoes and 0.5 cups of either yam or sweet potato for about 10 minutes or until soft to a fork.
- Mix with 1/2 cup (or full cup?) half and half and 1-2 Tbsp butter and like a dozen shakes of the salt shaker.
- Mash by cutting with knife, then fluff with fork.

### Dressing:

- Dice 1 cup shallots and 1 cup celery. Caramelize with butter, or at least microsteam.
- Microsteam giblets and neck. Save drippings. Dice giblets.
- Mix shallots, celery, giblets, and stuffing bread. 
- Cover mix with the drippings you saved earlier. Use normal turkey drippings if you run out.
- Bake 40 minutes at 350F covered with aluminum foil.

### Green Bean Casserole:

- Microsteam 4 cups raw green beans, cleaned and cut to under 2 inches.
- Mix with 1 container unsalted cream of mushroom soup, 1/2 container of fried onions, and like a dozen shakes of the pepper shaker. 
- Bake 40 minutes at 350F.
- Top with the other 1/2 container of fried onions.

### Pumpkin Pie:

- Open 1 can of pumpkin, OR clean and microsteam 2 cups of raw pumpkin squash.
- Beat (thoroughly combine yolk and albumen) 2 eggs.
- Mix with 1 cup of half-and-half and the 2 defeated eggs. 
- Pour mix into crust. (Store brand graham cracker crust got soggy.)
- Bake 40 minutes at 350F.

## Leftovers

### Cranberry Turkey Crossants:

- Leftover turkey
- Cranberry sauce (above)
- Brie cheese
- Crescent rolls. (Store brand oven-baked cresecent rolls were small, crumbly, and difficult to fill with cranberry, Brie, & turkey.)

--------------------------------------------------------------------

# [12/01/2022](#12012022) - Steaming mad at food.

Consider 'micro-steaming' - microwaving food inside a Rubbermaid brilliance 4.7 cup glass container. Put meat over veggies in the glass container, push the lid all the way on but don't snap the seals (so steam can escape). Due to a relocation complication, plastic wrap is being substituted for the lid.

![Glass container with food inside.](/images/MicrosteamCooking.jpg)

Microwave until the meat is 165F inside, or 145F for beef (about 10 minutes - in a 750 watt microwave at 100%, 1000 watt microwave at 60%, scaling power with bigger microwaves. You can let it sit & keep cooking for 2-5 minutes after), at which point the meat should be cooked but juicy, and the veggies soft from being boiled and steamed in the meat's juices.

![Plate with steak and cubed vegetables.](/images/MicrosteamServed.jpg)

After removing meat and veggies, feel free to sprinkle a few spoonfuls of flour into the drippings to make a simple roux gravy. This works better without vegetables.