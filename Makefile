PYTHON=python3.6

venv:
	virtualenv -p $(PYTHON) venv
	venv/bin/pip install -r requirements.txt

run_rest:
	. ./dev_configuration.sh && PYTHONPATH=`pwd` $(PYTHON) backend/api/rest.py

run_tests:
	rm -f `pwd`/test_app.db
	. ./test_configuration.sh && PYTHONPATH=`pwd` $(PYTHON) -m pytest -v backend/tests/

.PHONY: venv run_rest run_tests