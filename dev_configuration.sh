#!/usr/bin/env bash

echo "Preparing dev configuration..."
export RESOURCE_MANAGER_SECRET_KEY=secret
export RESOURCE_MANAGER_SQLALCHEMY_DATABASE_URI=sqlite:///`pwd`/app.db
