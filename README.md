## Website Performance Optimization portfolio project

Hands on project that demonstrates techniques to optimize a bad performing website.
Testing against [Google Developers Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/)

NOTE: Current functionality is not supported on the Safari web browser. Please use Firefox, chrome, or IE 11+.


### Getting started

1. Check out the repository
1. Run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080

  OR using [http-server](https://www.npmjs.com/package/http-server)

  $> cd /path/to/your-project-folder
  $> http-server -p 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and run it through [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

####Optimizations made to views/js/main.js

1. pizzaElementGenerator function
    * Removed styling calls and applied these same styles within the updatePositions function

1. function changeSliderLabel(size)
    * Update the switch statement to return size values. This allowed me to remove secondary switch statement in another function that was doing the same thing.

1. As per the Browser Rendering Optimization Course
    * Refactored the changePizzaSizes function to:
       * Read layout properties then batch style changes
       * Changed selector from .querySelectorAll to .getElementsByClassName for faster performance
       * Pre-calculated array length rather than in for-loop
       * Pre-calculated size values rather than in for-loop
       ``` bash
         var randomPizzas = document.getElementsByClassName('randomPizzaContainer');
         var randomPizzasLength = randomPizzas.length;
         var currentSizeSelect = changeSliderLabel(size);
         'for (var i = 0; i < randomPizzasLength; i++) {
           randomPizzas[i].style.width = currentSizeSelect + '%';
         }'
       ```

 1. Attempted to optimize the for-loop that creates and appends Pizzas by reading layout properties and batching style changes:

 ``` bash
    var pizzasDiv = document.getElementById("randomPizzas");
    var ranPizzaContainer = document.getElementsByClassName("randomPizzaContainer");
    'for (var i = 2; i < 100; i++) {
      pizzasDiv.appendChild(pizzaElementGenerator(i));
      ranPizzaContainer[i].style.width = "33.33%";
      ranPizzaContainer[i].style.height = "325px";
      ranPizzaContainer[i].id = "pizza" + i;
    }'
```

1. Attempted to optimize the updatePositions() function:
    * moved scrollTop calculation and storing in phase array object
    * moved basicLeft calculations and storing in basicLefts array object
    * updated original for-loop to apply style

    ``` bash
        var items = document.querySelectorAll('.mover');
        var itemLength = items.length;
        var phase = [];
        var basicLefts = [];

        // moved scrollTop calculation and storing in phase array object
        'for (var j = 0; j < 5; j++) {
          phase.push(Math.sin((document.body.scrollTop / 1250) + (j % 5)));
        }

        // moving basicLeft calculations and storing in basicLefts array object
        for (var k = 0; k < itemLength; k++) {
          basicLefts.push(items[k].basicLeft);
        }

        // original for-loop to apply style
        for (var i = 0; i < itemLength; i++) {
          items[i].style.left = basicLefts[i] + 100 * phase[i%5] + 'px';
        }'
    ```

1. Refactored slidingPizzas function to not be an event listener since this is now handled in the script section of the pizza.html file. I have deferred the loading of css and js files (in pizza.html) until after DOM and all resources have completed loading. I have also updated the calculations for the number of sliding pizzas that get generated based on screen and pic size.

    ``` bash
        var slidingPizzas = function() {
          var cols = 8;
          var s = 256;
          var currentScreenHeight = screen.height;
          var pizzaPicHeight = 80;
          var numRows = currentScreenHeight/pizzaPicHeight;
          var numPizzas = numRows + cols;
          for (var i = 0; i < numPizzas; i++) {
            var elem = document.createElement('img');
            elem.className = 'mover';
            elem.src = "images_compressed/pizza-large_large.png";
            elem.style.height = "100px";
            elem.style.width = "73.333px";
            elem.basicLeft = (i % cols) * s;
            elem.style.top = (Math.floor(i / cols) * s) + 'px';
            document.getElementById("movingPizzas1").appendChild(elem);
          }
          updatePositions();
        };
        slidingPizzas();
    ```
