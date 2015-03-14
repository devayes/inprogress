# inprogress jQuery Plugin
Simple jQuery plugin to add a progress bar under text inputs.

## Usage

Add to a form element:
```html
<textarea id="wookie"></textarea>
```

```javascript
$('#wookie').inprogress({
   max: 500, // Maximum 500 characters
   bgColor: false, // Default green to red, set a color here to over-ride (ie: #f00)
   showPercent: false, // Adds x% to progress bar
   showRemaining: false, // adds (max - length) to progress bar
   textColor: '#fff', // Set the text color for the 2 prior options
});
```
