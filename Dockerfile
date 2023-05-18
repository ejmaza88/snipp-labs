FROM python:3.10.11-slim-buster

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


RUN mkdir -p /app

WORKDIR /app

RUN pip install -U pip

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY ./ /app/

ENV PYTHONPATH /app/snipps

CMD ["/bin/bash"]