#!/bin/bash

__usage="
Usage: $(basename $0) [OPTIONS]... [COMMAND]...

Script to help manage the Jekyll site for MSVFD (Mountain Springs Volunteer Fire Department)

Options:
    -h, --help             Shows this help message
    -p, --port             Specify a port to serve the site locally (default: 4000)
    -e, --env              Specify the Jekyll environment (default: development)

Commands:
    build                  Build the site locally
    serve                  Serve the site locally
    clean                  Clean the Jekyll cache and build artifacts
    stop                   Stop any running Jekyll server
    clear-all              Clear all generated files (similar to reset)
"

# Default options
__port=4000
__env="development"

# Helper functions
info() {
    echo -e "\033[0;34m[INFO] $1\033[0m"
}

success() {
    echo -e "\033[0;32m[SUCCESS] $1\033[0m"
}

error() {
    echo -e "\033[0;31m[ERROR] $1\033[0m"
}

fail() {
    error "$1"
    exit 1
}

# Commands
function build_site() {
    info "Building the Jekyll site in '${__env}' environment..."
    JEKYLL_ENV="$__env" bundle exec jekyll build || fail "Failed to build the site."
    success "Site built successfully."
}

function serve_site() {
    info "Serving the Jekyll site locally on port $__port in '${__env}' environment..."
    JEKYLL_ENV="$__env" bundle exec jekyll serve --host 0.0.0.0 --port "$__port" || fail "Failed to serve the site."
}

function clean_site() {
    info "Cleaning the Jekyll cache and build artifacts..."
    bundle exec jekyll clean || fail "Failed to clean the site."
    success "Jekyll cache and build artifacts cleaned."
}

function kill_port_4000() {
    # Check for a process using port 4000
    pid=$(lsof -t -i:4000)
    
    if [ -n "$pid" ]; then
        echo "Port 4000 is in use by process $pid. Killing the process..."
        kill -9 "$pid"
        echo "Process $pid terminated."
    else
        echo "Port 4000 is not in use."
    fi
}

function stop_server() {
    info "Stopping any running Jekyll server..."
    pkill -f "jekyll serve" || success "No Jekyll server was running."
    success "Stopped the Jekyll server if it was running."
    kill_port_4000
}

function clear_all() {
    clean_site
    success "Cleared all generated files and reset the project."
}

# Parse command-line options
POSITIONAL=()
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -h|--help)
            echo "$__usage"
            exit 0
            ;;
        -p|--port)
            __port="$2"
            shift # past argument
            shift # past value
            ;;
        -e|--env)
            __env="$2"
            shift # past argument
            shift # past value
            ;;
        *) # unknown option or command
            POSITIONAL+=("$1")
            shift # past argument
            ;;
    esac
done

set -- "${POSITIONAL[@]}" # restore positional parameters
__command=${POSITIONAL[0]} # Take the first positional parameter as the command

# Execute commands
case "$__command" in
    build)
        build_site
        ;;
    serve)
        serve_site
        ;;
    clean)
        clean_site
        ;;
    stop)
        stop_server
        ;;
    clear-all)
        clear_all
        ;;
    *)
        echo "$__usage"
        exit 1
        ;;
esac
