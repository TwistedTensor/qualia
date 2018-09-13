FROM python:3
COPY . /code
WORKDIR /code
RUN pip install -r requirements.txt
RUN ls
CMD ["python","/code/dist/app.py"]
