FROM python:3.9.12-slim-buster AS service-base
RUN apt update \
    && apt upgrade -y \
    && apt install -y \
    nano \
    openssh-client \
    postgresql-client \
    python3-cffi \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    vim \
    && apt autoremove -y \
    && apt autoclean -y


FROM service-base AS service-builder
RUN mkdir -p /app
WORKDIR /app
RUN pip install -U pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY ./ /app/


FROM python:3.9.12-slim-buster AS service-python
COPY --from=service-builder /usr/local/lib/python3.9/site-packages/ /usr/local/lib/python3.9/site-packages/
COPY --from=service-builder /usr/local/bin/ /usr/local/bin/


FROM service-python AS service-django
WORKDIR /app
ENV PYTHONPATH /app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]