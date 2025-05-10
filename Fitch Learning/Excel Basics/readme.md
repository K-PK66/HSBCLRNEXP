# Excel Basics

> Read before: the lesson is based on a Windows computer equipped with Microsoft Office 365, but the author himself uses Microsoft Office Excel 2007 instead due to facilities limit.
> 
> _Arrows_ in this article means key ↑↓←→ on a keyboard.
> 
> _⇧_ in this article means shift key on a key board.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Excel-2007-Logotipo-2007-2010.jpg?raw=true)

## Shortcuts

- Arrows &mdash; select a cell.
- ⇧ + arrows &mdash; select multiple cells.
- Ctrl + arrows &mdash; navigate through (jump to the end of where the data may lie, true within a column or a row).
- Ctrl + Home &mdash; select cell A1 (the top left cell of the spreadsheet).
- Ctrl + End &mdash; select the bottom right-hand corner where the data stops.
- Ctrl + PageDown &mdash; toggle through (move over to the next worksheet on the right).
- Ctrl + PageUp &mdash; move over to the previous worksheet on the left.
- Ctrl + ⇧ + arrows &mdash; select all of adjacent data to the end of this row or column.
- Ctrl + Tab &mdash; toggle through each of Excel files open at present.
- Alt + Tab &mdash; toggle through all programs open at present.
- Ctrl + C &mdash; copy.
- Ctrl + X &mdash; cut.
- Ctrl + V &mdash; paste.
- Ctrl + R &mdash; **quick copy whatever on the left and paste** or **quick copy whatever on the left end of all selected cells and paste it on all other cells selected at a time**.
- Ctrl + D &mdash; **quick copy whatever above and paste** or **quick copy whatever on top of all selected cells and paste it on all other cells selected at a time**.
- Ctrl + Z &mdash; undo.
- Ctrl + Y &mdash; redo.
- Ctrl + F &mdash; bring up _Find_ window.
- Ctrl + H &mdash; bring up _Find and Replace_ window.
- F1 &mdash; bring up _Excel Help_ window.
- F2 &mdash; bring the single selected cell to edit mode. (Use Esc to escape the mode)
- F3 &mdash; bring up _Function Arguments_ window.
- F4 &mdash; anchoring cell ref.
- F5 &mdash; bring up _Go To_ window.
- Ctrl + F1 &mdash; **bring up or hide the toolbars**.
- Ctrl + F2 &mdash; quick print preview.

## Quick Access Toolbar

A set of tools always available for immediate use at the top left of the screen, even above the normal toolbar, shown in the image below (top left).

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/quickAccessToolbar.png?raw=true)

Customize the _Quick Access Toolbar_ by adding or removing specific commands. To do this, simply select File -> Options from the ribbon to bring up the MS Excel _Options_ window. Then select _Quick Access Toolbar_ from the left-hand side.

> For MS Excel 2007, select Office logo -> Excel Options to bring up the _Options_ window and select _Customize_ from the left-hand side.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/QATCustomization.png?raw=true)

Moving the order of commands around on the _Quick Access Toolbar_ is possible in this window &mdash; to re-order the commands, use the up and down buttons to the right of the _Customize Quick Access Toolbar_ pane. It is possible to also add commands that are not in the ribbon, and shortcuts to macros that you have created or have available. There is an option to choose commands from _All Commands_. This allows you to see every possible command that could be added to the _Quick Access Toolbar_.

Click the _Reset_ button below the _Customize Quick Access Toolbar_ pane to return the _QAT_ to default. You can also import or export the _Quick Access Toolbar_ settings to or from other computers.

## Manipulations on Spreadsheet Layouts

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2016.57.33.png?raw=true)

### Use different worksheet views

Change the layout from _Normal_, the default view, to others in _View_ menu.

_Page Break Preview_ shows where the pages would break if you're printing the spreadsheet. _Page Layout_ shows where the pages would break along with any headers or footers. It is possible to also create your own _Custom Views_.

### Arrange multiple Excel files

The _View_ menu also offers the ability to arrange multiple MS Excel files side-by-side horizontally or vertically. We can also freeze panes or split the screen, which is useful when you have a large dataset and need to keep a row, or rows, at the top as you scroll down through the data. This can also work to keep columns visible to the left as you scroll across the data to the right.

## Prepare Excel Files for Printing

Key printing options include:

- Setting the page orientation
- Custom margins
- Scaling
- Working with options in _Page Setup_

First enter the print preview screen via File -> Print or Ctrl+F2.

> For MS Excel 2007, click the Office logo button for _Print_ menu. All features are separated in 3 functions in Excel 2007 but have been integrated into one menu to choose after Office 2010.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2017.34.16.png?raw=true)

By default, Office will print the active worksheet, but you can opt to print the entire workbook (file). Additionally, Office has the option to choose which orientation we'd like to print this in, portrait by default, or landscape would turn the page. Margins and other preset options can also be customized.

By default, Office will print the file without scaling. You can set the scaling to _Fit Sheet on One Page_ or else for better display.

In _Page Setup_ menu, orientation, along with scaling and margins, can also be adjusted. In addition to those things, you have the option to add "Custom Headers and Footers", and there are "Sheet" options as well, like printing "Gridlines", printing in "Black and White", changing the "quality", and adding "Row and column headings" to each page.

Select _Print Selection_ if you want to print only the area selected.

## Efficient Presentation Protocols

### Formulas

Suppose there is a financial calculation shown below.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2017.54.07.png?raw=true)

Beyond no doubt, the estimated future value should be $100\times(1+0.08)^1=108,$ but when the present values change, we have to make another calculation if input the answer directly. Therefore, use formula for automatic calculations instead in that the formula will make the cell of answer linked with parameter cells.

Use the following formula for auto calculations, and you will get the correct answer upon clicking the Enter key on the keyboard.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2018.03.57.png?raw=true)

There is another function called `FV` that can calculate this problem. You may find the function's explanation when you type `=FV` in the cell, similar with shown below.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2018.07.05.png?raw=true)

Double click the option or type `(` via keyboard. Office will offer you a list of parameters (arguments) compulsory for calculations. Select or type the cells you need for the function.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2018.09.08.png?raw=true)

Another way to enter values of arguments is to use shortcut Ctrl+A to bring up _Function Arguments_ window and select the cells you need.

![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2018.12.44.png?raw=true)
![](https://github.com/K-PK66/HSBCLRNEXP/blob/main/Fitch%20Learning/Excel%20Basics/Screenshot%202025-05-10%20at%2018.14.06.png?raw=true)

You may notice that the result after the calculation is below zero &mdash; that is because `FV()` the function also indicates the **direction of cash flow**.

### Number Formatting
