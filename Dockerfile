ARG CI_REGISTRY
ARG NGINX_CONTAINER

FROM ${CI_REGISTRY}/shared-services/docker-images/nginx:${NGINX_CONTAINER}
ARG TAG

ENV APP_VERSION=${TAG}

COPY src/packages/web/build/ /usr/share/nginx/html
CMD ["/init-with-config.sh"]
