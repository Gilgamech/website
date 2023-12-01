# [11/26/2023](#11262023) - Putting my 'box in a box (err frame) for you.

Site frames are a way to fully isolate site data from the HTML bootstrap. A site frame is meant to hold a small amount of JS and other 'connective tissue' to support a site, as it calls data from near and far. This is enabled through the new URL replacement feature: 
- Drop your load in the road! Leave a URL at the start of any line to have the page eventually load and display that data.

Also the variable system is fully functional:
- Replace-o-rama! Full SPA pages - now in JML or YAML - can support $_ 'dollarsign-underscore' variable replacement from anywhere within the document.

[OfferingOverview](https://www.OfferingOverview.com) is now fully Markdown and operating off a Page Frame, which has all of the instructions to load the other page elements. Including the footer, which is retrieved via URL replacement.

Separately, CSV-to-table support is live as well. All of this works through convertWebElement, which auto-selects the display engine based on file extension. And so much more to come. 

# [11/14/2023](#11142023) - Gigantic Processing Unit.

GPU is going to become a 4th peg on the 'Cloud stool', alongside traditional compute, memory, and storage. Right now, GPUs are relegated to peripheral status, like printers and USB drives. Most hypervisors allow one to be connected, but only at a cost of flexibility and convenience, tying the VM to the physical server. 

What's needed is for vGPU and GPU transport to become commonplace in virtualization. To be able to stream from an arbitrary hardware host to an arbitrary VM anywhere in the same data center. Right now it looks like only nViidia offer virtual GPUs - this is probably a result of their cloud-based remote gaming product. 

For GPU virtualization to become common, much larger data switches and routers will be needed to facilitate the huge data transfer. What's currently streamed through video cards will need to be streamed through network cables and over TOR switches instead. Can twisted pair keep up or will we all shift to fiber? 

# [11/12/2023](#11122023) - Markup with Markdown.

Markdown page support in development! YAML coming soon. 

# [11/01/2023](#11012023) - All Sites Day.

Shifted the menu and footer into the format described in [yesterday's blog](https://www.Gilgamech.com/2023/October.html#10302023).

More to come!
