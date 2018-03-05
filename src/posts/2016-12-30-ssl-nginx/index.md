---
path: "/https-nginx"
title:  "How To Serve Files Over HTTPS with Nginx"
date: "2016-12-30T17:12:33.962Z"
summary: "Learn how to create a self-signed SSL certificate and serve static files over HTTPS with Nginx."
thumbnailRef: ""
---

I've recently began working on a side project that requires me to serve files over https. Given some trial and error, I managed to get a server up and running perfectly. I thought I'd share which solution worked best for me. I've always been a minimalist, so if 'keeping it simple' is your M.O., you may find this quick tutorial quite useful.

### Install Dependencies
If you're running on the latest ubuntu, then the only dependency you'll need to install is Nginx.

```
sudo apt-get update
sudo apt-get install -y nginx
```

### Create a Self-Signed SSL Certificate
Create a directory to store the ssl files.

```
sudo mkdir /etc/nginx/ssl
```

Next, generate a self-signed ssl certificate. Self-signed, meaning the digital certificate is signed using its own private key.

```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
```

After you've completed the form, the following files should have been generated:
```
/etc/nginx/ssl/nginx.crt
/etc/nginx/ssl/nginx.key
```

### Configure Nginx
To configure Nginx, open the `default` file located in the sites-available directory.

```
sudo vim /etc/nginx/sites-available/default
```

Make the following changes to enable both http and https requests.

```
# /etc/nginx/sites-available/default
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /usr/share/nginx/html;
    index index.html index.htm;

    # Redirect http to https
    # return 301 $scheme://www.website.com$request_uri;
}

server {
    listen 443;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html index.htm;

    ssl on;
    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;
}
```

Next, test the that the changes you've made were successful.

```
sudo nginx -t
```

Then, restart Nginx.
```
sudo /etc/init.d/nginx stop
sudo /etc/init.d/nginx start
```

Now you should be good to go!


### Running within Vargent (optional)
If you're a mac user, such as myself, I would recommend using [Vagrant](https://www.vagrantup.com/). It easily allows users to run their vm on a private network.

Here's an initial Vagrant file to get you started.
```
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  # Set VM's IP to make server available to a local network
  # https://55.55.55.55
  config.vm.network "private_network", ip: "55.55.55.55"

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y nginx
  SHELL
end
```

Cheers!
