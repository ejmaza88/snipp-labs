.PHONY: build shell django-shell server watch

build:
	@docker build -t maza88/snipps:latest .

shell:
	@docker compose run --rm shell

django-shell:
	@docker compose run --rm django-shell

server:
	@docker compose up django-server

watch:
	@docker compose up npm-watch

