#!/usr/bin/env bash

echo "Preparing test configuration..."
export RESOURCE_MANAGER_SECRET_KEY=secret
export RESOURCE_MANAGER_SQLALCHEMY_DATABASE_URI=sqlite:///`pwd`test_app.db