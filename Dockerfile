FROM nginx

RUN apt-get update && \
	apt-get install -y curl && \
	curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
	apt-get install -y nodejs && \
	npm install -g gulp

RUN mkdir /startup

ADD startup/* /startup/

RUN chmod 755 /startup/startup.sh

RUN cd startup && npm up

CMD ["sh", "-c", "/startup/startup.sh"]
