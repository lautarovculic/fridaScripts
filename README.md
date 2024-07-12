# Frida Scripts for Mobile Hacking

Welcome to my repository of Frida scripts for mobile hacking. This repository contains a collection of scripts I use for security testing on mobile applications.

## Description

Frida is a powerful tool for dynamic instrumentation of mobile applications. These scripts are designed to help pentesters and security developers audit mobile applications, find vulnerabilities, and better understand application behavior.

## Requirements

- [Frida](https://frida.re): A tool for dynamic instrumentation.
- [Python](https://www.python.org/): Used to run some of the automation scripts.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/lautarovculic/fridaScripts.git
    cd fridaScripts
    ```

2. Ensure you have Frida installed on your system. Follow the installation instructions on the [Frida website](https://frida.re/docs/installation/).

3. (Optional) Create a virtual environment and install any required Python packages:

    ```sh
    python3 -m venv env
    source env/bin/activate
    pip install -r requirements.txt
    ```

## Usage

Each script is designed for specific use cases. Refer to the individual script documentation for detailed usage instructions.

1. Start the Frida server on your mobile device:

    ```sh
    adb shell "su -c /data/local/tmp/frida-server &"
    ```

2. Use a script from this repository to attach to a process:

    ```sh
    frida -U -f com.example.app -l script.js --no-pause
    ```


## Contributing

Feel free to contribute to this repository by submitting a pull request. Please follow the contribution guidelines.

## License

This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any inquiries or support, please contact me at [lautaro@lautarovculic.com](mailto:lautaro@lautarovculic.com).

---

Happy hacking!
