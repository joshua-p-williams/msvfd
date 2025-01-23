#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Print menu
echo -e "${GREEN}Jekyll Helper Script${NC}"
echo "1. Install Dependencies"
echo "2. Build the Site"
echo "3. Serve the Site Locally"
echo "4. Clean the Build Cache"
echo "5. Exit"
echo -n "Enter your choice: "

# Read user input
read choice

# Handle user input
case $choice in
  1)
    echo -e "${GREEN}Installing dependencies...${NC}"
    bundle install
    ;;
  2)
    echo -e "${GREEN}Building the site...${NC}"
    bundle exec jekyll build
    ;;
  3)
    echo -e "${GREEN}Serving the site locally...${NC}"
    bundle exec jekyll serve --host 0.0.0.0
    ;;
  4)
    echo -e "${GREEN}Cleaning the build cache...${NC}"
    bundle exec jekyll clean
    ;;
  5)
    echo -e "${GREEN}Exiting...${NC}"
    exit 0
    ;;
  *)
    echo -e "${GREEN}Invalid option!${NC}"
    ;;
esac
