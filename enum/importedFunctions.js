// Get ANSI color
function getAnsiColor(code) {
    return "\x1b[" + code + "m";
}

// ANSI Colors
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

// Enum all modules
Process.enumerateModules({
    onMatch: function(module) {
        var color = colors[colorIndex % colors.length];
        colorIndex++;
        
        console.log(color + "Module: " + module.name + getAnsiColor(0)); 

        // Enum imported func
        Module.enumerateImports(module.name, {
            onMatch: function(imp) {
                console.log("  " + color + "Name: " + imp.name + ", Address: " + imp.address + ", Type: " + imp.type + getAnsiColor(0));
            },
            onComplete: function() {
                console.log(color + "  Enum finish for " + module.name + getAnsiColor(0));
            }
        });
    },
    onComplete: function() {
        console.log("Enum finish.");
    }
});
