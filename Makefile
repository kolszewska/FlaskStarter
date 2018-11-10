PYTHON=python3.6

venv:
	virtualenv -p $(PYTHON) venv
	venv/bin/pip install -r requirements.txt

run_rest:
	. ./dev_configuration.sh && PYTHONPATH=`pwd` $(PYTHON) resourcemanager/api/rest.py

.PHONY: venv run_rest