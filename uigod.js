iconOutlined = "material-symbols-outlined";
darkMode = {darkmode: false};
    io = {
        select : function select(selector) {
            return document.querySelector(selector);
        },

        selectNthChild:function selectNthChild(elements, n) {
            if (n >= 1 && n <= elements.length) {
              return elements[n - 1];
            } else {
              return null; // Return null if the specified index is out of range
            }
          },

        selectAll : function selectAll(selector) {
            return document.querySelectorAll(selector);
        },

        write : function write(content) {
            return document.write(content);
        },

        log : function log(content) {
            return console.log(content);
        },

        pout : function pout(content) {
            return print(content);
        },

        print : function print(selector, innerHTML) {
            var element = io.select(selector);
            if (element) {
                element.innerHTML += innerHTML;
            } 
        },

        printAll : function printAll(selector, innerHTML) {
            var elements = io.selectAll(selector);
            if (elements) {
                elements.forEach(function(element) {
                    element.innerHTML += innerHTML;
                });
            }
        },

        replace : function replace(selector, innerHTML) {
            var element = io.select(selector);
            if (element) {
                element.innerHTML = innerHTML;
            }
        },

        replaceAll : function replaceAll(selector, innerHTML) {
            var elements = io.selectAll(selector);
            if (elements) {
                elements.forEach(function(element) {
                    element.innerHTML = "";
                    element.innerHTML += innerHTML;
                });
            }
        },

        replaceStr : function replaceStr(selector, stringToReplace, newString) {
            var element = io.select(selector);
            if (element) {
            element.innerHTML = element.innerHTML.replace(new RegExp(stringToReplace, 'g'), newString);
            }
        },

        replaceAllStr : function replaceAllStr(selector, stringToReplace, newString) {
            var elements = io.selectAll(selector);
            if (elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = elements[i].innerHTML.replace(new RegExp(stringToReplace, 'g'), newString);
                }
            }
        },

        replaceStrPos : function replaceStrPos(selector, stringToReplace, newString, occurrenceToReplace) {
            var element = io.select(selector);
            if (element) {
            var index = 0;
            element.innerHTML = element.innerHTML.replace(new RegExp(stringToReplace, 'g'), function(match) {
                index++;
                if (index === occurrenceToReplace) {
                return newString;
                } else {
                return match;
                }
            });
            }
        },

        del:function del(selector) {
            var element = io.select(selector);
            if (element) {
                element.innerHTML = "";
            }
        },

        delAll : function delAll(selector) {
            var elements = io.selectAll(selector);
            if (elements) {
                elements.forEach(function(element) {
                    element.innerHTML = "";
                });
            }
        },

        delStr : function delStr(selector, stringToRemove) {
            var element = io.select(selector);
            if (element) {
            element.innerHTML = element.innerHTML.split(stringToRemove).join('');
            }
        },
    
        delAllStr : function delAllStr(selector, stringToRemove) {
            var elements = io.selectAll(selector);
            if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = elements[i].innerHTML.split(stringToRemove).join('');
            }
            }
        },

        delStrPos : function delStrPos(selector, stringToRemove, occurrenceToRemove) {
            var element = io.select(selector);
            if (element) {
                var index = 0;
                element.innerHTML = element.innerHTML.replace(new RegExp(stringToRemove, 'g'), function(match) {
                    index++;
                    if (index === occurrenceToRemove) {
                    return '';
                    } else {
                    return match;
                    }
                });
            }
        },

        obj : function obj(names, values) {
            var newObj = {};
            for (var i = 0; i < names.length; i++) {
            newObj[names[i]] = values[i];
            }
            return newObj;
        },

        createEl : function createEl(parentSelector, tagName, attributes, innerHTML) {
            var parentElement = io.select(parentSelector);
            if (!parentElement) {
            parentElement = document.body;
            }
            var element = io.createElAtt(tagName, attributes);
            parentElement.appendChild(element);
            if (innerHTML) {
            element.innerHTML = innerHTML;
            }
        },

        createElAtt : function createElAtt(tagName, attributes) {
            var element = document.createElement(tagName);
            for (var attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute]);
            }
            return element;
        },
        root : function root(props) {
            const darkmode = window.matchMedia("(prefers-color-scheme: dark)");
            const checkbox = io.select('#dark-mode');
            const root = document.documentElement;
          
            function setProps(propertyObject) {
              Object.keys(propertyObject).forEach(function(prop) {
                root.style.setProperty(prop, propertyObject[prop]);
              });
            }
            function updateStyle() {
                if (checkbox.checked && darkmode.matches) {
                  setProps(props.dark);
                } else {
                  setProps(props.light);
                }
            }
     
          
        updateStyle(); // Set initial style
    
            checkbox.addEventListener('change', function() {
                updateStyle(); // Update style on checkbox toggle
            });
    
            darkmode.addEventListener('change', function() {
                updateStyle(); // Update style on darkmode change
            });
        },
    
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        const myIcons = io.selectAll("icon");
            myIcons.forEach((icon) => {
                icon.classList.add(iconOutlined);
        });
        const input = io.selectAll("input");
        input.forEach((input) => {
            input.setAttribute('required', '');
        });

        function ElementHeight(selector, rootConstantName) {
            const element = io.select(selector);
            const elementHeight = element.offsetHeight;
            document.documentElement.style.setProperty(`--${rootConstantName}`, `${elementHeight}px`);
        };
    });
    document.addEventListener("DOMContentLoaded", function(event) {
        const loader = io.select('loader');

        // Function to show the page content
        function showPage() {
          if (loader) {
            loader.style.display = "none";
          }
          io.select("body").style.display = "block";
          io.select(".body").style.display = "block";
        }
        
        // Check if the loader element exists on page load
        const startTime = Date.now();
        const minDelay = 3000; // Minimum delay in milliseconds
        
        window.addEventListener("load", function() {
          // Calculate the elapsed time since the page started loading
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minDelay - elapsedTime);
        
          // Show the page after the remaining time
          setTimeout(showPage, remainingTime);
        });
    });
    document.addEventListener("DOMContentLoaded", function(event) {
        const input = io.selectAll("input");
        input.forEach((input) => {
            input.setAttribute('required', '');
        });       

        const passwordInput = io.select('.password input[type="password"]');
            
        if(io.select('.password')) {
            io.createEl('.password', 'icon', { id: 'viewPsw', class : iconOutlined }, 'visibility');
            const togglePassword = io.select(".password #viewPsw");
        
            togglePassword.addEventListener("click", function () {
                // Toggle the type attribute
                const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
                passwordInput.setAttribute("type", type);
        
                // Toggle the icon content
                togglePassword.textContent = type === "password" ? "visibility" : "visibility_off";
            })
        };
        
        // Prevent form submit
        const form = io.select("form");
        form.addEventListener('submit', function (e) {
            e.preventDefault();
        });

        const searchInput = io.select('.search input[type="search"]');
        io.createEl('.search', 'icon', { class: iconOutlined }, 'search');
        const searchIcon = io.select(".search icon");
            
        searchIcon.addEventListener("click", function () {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== "") {
                // Perform the search action with the search term
                submitSearchRequest(searchTerm);
            }
        });
            
        function submitSearchRequest(searchTerm) {
            // Replace this code with your search request handling logic
            console.log("Search term:", searchTerm);
            // Perform further actions, such as making an API request or updating the UI
        }

        const formDisable = io.select("form");

        // Disable default form validation for all inputs
        if (formDisable) {
            const inputs = formDisable.querySelectorAll("input");
            inputs.forEach(function(input) {
                input.addEventListener("invalid", function(e) {
                    e.preventDefault();
                    // Custom error handling code here
                });
            });

            formDisable.addEventListener("submit", function(e) {
                e.preventDefault();
                // Check if all form inputs are valid
                if (formDisable.checkValidity()) {
                // Custom form submission code here
                formDisable.submit();
                } else {
                // Custom error handling code here for invalid form inputs
                }
            });
        }
    
        function initializeSelectForm() {
            var selectForm = io.selectAll(".select");
            var formLength = selectForm.length;
            
            for (let i = 0; i < formLength; i++) {
                var selectInput = selectForm[i].querySelector("select");
                var inputLength = selectInput.length;
            
                var el1 = io.createElAtt("span", { class: "select-selected" });
                el1.innerHTML = selectInput.options[selectInput.selectedIndex].innerHTML;
                selectForm[i].appendChild(el1);
            
                var el2 = io.createElAtt("span", { class: "select-items select-hide" });
                for (let j = 1; j < inputLength; j++) {
                        var el3 = io.createElAtt("span", { class: "select-item" });
                        el3.innerHTML = selectInput.options[j].innerHTML;
                        el3.addEventListener("click", function (e) {
                        var s = this.parentNode.parentNode.querySelector("select");
                        var sl = s.length;
                        var h = this.parentNode.previousSibling;
                        for (let k = 0; k < sl; k++) {
                            if (s.options[k].innerHTML == this.innerHTML) {
                            s.selectedIndex = k;
                            h.innerHTML = this.innerHTML;
                            var y = this.parentNode.querySelectorAll(".same-as-selected");
                            var yl = y.length;
                            for (let l = 0; l < yl; l++) {
                                y[l].classList.remove("same-as-selected");
                            }
                            this.classList.add("same-as-selected");
                            break;
                            }
                        }
                        h.click();
                    });
                    el2.appendChild(el3);
                }
                selectForm[i].appendChild(el2);
            
                el1.addEventListener("click", function (e) {
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
                });
            }
            
            function closeAllSelect(clickedElement) {
                var dropdownItems = io.selectAll(".select-items");
                var selectElements = io.selectAll(".select-selected");
                var dropdownItemCount = dropdownItems.length;
                var selectElementCount = selectElements.length;

                var clickedElementIndex = Array.from(selectElements).indexOf(clickedElement);
                for (let i = 0; i < selectElementCount; i++) {
                    if (i !== clickedElementIndex) {
                        selectElements[i].classList.remove("select-arrow-active");
                    }
                }
                
                for (let i = 0; i < dropdownItemCount; i++) {
                    if (i !== clickedElementIndex) {
                        dropdownItems[i].classList.add("select-hide");
                    }
                }
            }
                
            document.addEventListener("click", closeAllSelect);
        }
        
        // Call the function to initialize the select form
        initializeSelectForm();

        // Dealing with Textarea Height
        function calcHeight(value) {
            // Calculate the number of line breaks
            const numberOfLineBreaks = (value.match(/\n/g) || []).length;
        
            // Calculate the number of new lines starting from a long paragraph
            const numberOfNewLines = Math.ceil(value.length / textarea.cols) - 1;
        
            // Calculate the new height based on line breaks and new lines
            const newHeight = 20 + (numberOfLineBreaks + numberOfNewLines) * 16 + 12 + 2;
        
            return newHeight;
          }
        
          const textarea = document.querySelector("form textarea");
          textarea.addEventListener("input", function() {
            textarea.style.height = calcHeight(textarea.value) + "pt";
          });
    });

    document.addEventListener("DOMContentLoaded", function(event) {
        
        const icons = io.selectAll(".fill");

        if (icons) {
          icons.forEach((icon) => {
            icon.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 1, 'opsz' 48";
          });
        }
        
        const iconChange = document.querySelector("#checkbox + label icon"); 
        const checkbox = document.querySelector("#checkbox");


        checkbox.addEventListener("change", function() {
            if (this.checked) {
                iconChange.classList.add("checked");
            } else {
                iconChange.classList.remove("checked");
            }
        });
      });

    io.createEl('head', 'link', { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"});
    io.createEl('head', 'link', { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:display=swap"});
    io.createEl('head', 'link', { rel: "stylesheet", type: "text/css", href: "uigod.css"});
    io.createEl('head', 'link', { rel: "stylesheet", href: "style.css"});
    io.createEl('head', 'script', {src: 'app.js'});