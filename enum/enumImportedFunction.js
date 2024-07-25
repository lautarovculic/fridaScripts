// Obtain ANSI color
function getAnsiColor(code) {
    return "\x1b[" + code + "m";
}

// Colors
var colors = [
    getAnsiColor(31), // Rojo
    getAnsiColor(32), // Verde
    getAnsiColor(33), // Amarillo
    getAnsiColor(34), // Azul
    getAnsiColor(35), // Magenta
    getAnsiColor(36), // Cian
    getAnsiColor(37)  // Blanco
];

var colorIndex = 0;

// Name of function
var targetModuleName = "libssl.so";

// Enum all modules loaded
Process.enumerateModules({
    onMatch: function(module) {
        if (module.name === targetModuleName) {
            var color = colors[colorIndex % colors.length];
            colorIndex++;

            console.log(color + "Módulo: " + module.name + getAnsiColor(0)); 

            // Enum every func that is imported for the module
            Module.enumerateImports(module.name, {
                onMatch: function(imp) {
                    console.log("  " + color + "Name: " + imp.name + ", Adress: " + imp.address + ", Type: " + imp.type + getAnsiColor(0));
                },
                onComplete: function() {
                    console.log(color + "  Enum finish: " + module.name + getAnsiColor(0));
                }
            });
        }
    },
    onComplete: function() {
        console.log("Enum finish.");
    }
});
