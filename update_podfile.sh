#!/bin/bash
set -e

# Path to the Podfile
PODFILE="../ios/Podfile"

# Add use_modular_headers! at the top of the Podfile
echo "Adding use_modular_headers! to the top of the Podfile"
sed -i '' '1s/^/use_modular_headers!\n/' "$PODFILE"
