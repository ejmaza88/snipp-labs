.PHONY: build shell django-shell django-server

build:
	@docker build -t maza88/snipps:latest .

shell:
	@docker compose run --rm shell

django-shell:
	@docker compose run --rm django-shell

django-server:
	@docker compose up django-server
