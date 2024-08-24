Java.perform(function() {
    // Initialize an empty array to store flag characters
    var flagArray = [];
    
    // Get a reference to the RandomAccessFile class
    var RandomAccessFile = Java.use('java.io.RandomAccessFile');
    
    // Intercept the seek method of RandomAccessFile and modify its implementation
    RandomAccessFile.seek.implementation = function(pos) {
        // If the position is 0, set the skip flag to false
        if (pos === 0) {
            this.skip = false;
        }
        // Call the original seek method
        return this.seek.call(this, pos);
    };

    // Intercept the writeChar method of RandomAccessFile and modify its implementation
    RandomAccessFile.writeChar.implementation = function(c) {
        // If the skip flag is true or the character is a newline (10), send the current flag array
        if (this.skip || c === 10) {
            send("PARTIAL:" + flagArray.join(""));
        } else {
            // Otherwise, add the character to the flag array and send it as a symbol
            flagArray.push(String.fromCharCode(c));
            send("SYM:" + String.fromCharCode(c));
        }
        // Call the original writeChar method
        return this.writeChar.call(this, c);
    };

});
