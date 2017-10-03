# docker-nginx-angular-env

Dockerfile for nginx with automagic angular 1.* constants creation from environment variables.

## Usage

You need to provide the following parameters:

- module: angular module name
- output: output file path
- optionally, prefix: environment variables prefix

## Example

    docker run -ti -e ZZ_ENVIRONMENT=development -e ZZ_MYVAR=myvalue mobapi/docker-angular-dev /scripts/startup.sh -p ZZ_ -m my.angular.module -o /path/to/the/module/file

It will write a file, at "/path/to/the/module/file", which will contain:

    angular.module('my.angular.module')
    .constant('ENVIRONMENT', 'development')
    .constant('MYVAR', 'myvalue');

