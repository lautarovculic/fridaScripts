from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64

# Convert B64 to bytes
key_b64 = "AMKyAMuv7U4Us1KTVjb2AGV8QGy7jynAoU+77LatjlQ="
iv_b64 = "mT92BqeIHGdJJ2YGjenYqg=="

key = base64.b64decode(key_b64)
iv = base64.b64decode(iv_b64)

# Message in B64
ciphertext_b64 = "T9WoXhrsQHgY3NLr8SwBbw=="
ciphertext = base64.b64decode(ciphertext_b64)

# Make the cypher object
cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
decryptor = cipher.decryptor()

# Decrypt
plaintext = decryptor.update(ciphertext) + decryptor.finalize()

# Decode UTF-8
plaintext = plaintext.decode('utf-8')

print("Flag:", plaintext)
