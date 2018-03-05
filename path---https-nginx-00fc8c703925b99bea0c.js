webpackJsonp([0xbf0258132bd9],{345:function(e,n){e.exports={data:{markdownRemark:{html:'<p>I\'ve recently began working on a side project that requires me to serve files over https. Given some trial and error, I managed to get a server up and running perfectly. I thought I\'d share which solution worked best for me. I\'ve always been a minimalist, so if \'keeping it simple\' is your M.O., you may find this quick tutorial quite useful.</p>\n<h3>Install Dependencies</h3>\n<p>If you\'re running on the latest ubuntu, then the only dependency you\'ll need to install is Nginx.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">sudo apt-get update\nsudo apt-get install -y nginx</code></pre>\n      </div>\n<h3>Create a Self-Signed SSL Certificate</h3>\n<p>Create a directory to store the ssl files.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">sudo mkdir /etc/nginx/ssl</code></pre>\n      </div>\n<p>Next, generate a self-signed ssl certificate. Self-signed, meaning the digital certificate is signed using its own private key.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt</code></pre>\n      </div>\n<p>After you\'ve completed the form, the following files should have been generated:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">/etc/nginx/ssl/nginx.crt\n/etc/nginx/ssl/nginx.key</code></pre>\n      </div>\n<h3>Configure Nginx</h3>\n<p>To configure Nginx, open the <code>default</code> file located in the sites-available directory.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">sudo vim /etc/nginx/sites-available/default</code></pre>\n      </div>\n<p>Make the following changes to enable both http and https requests.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none"># /etc/nginx/sites-available/default\nserver {\n    listen 80 default_server;\n    listen [::]:80 default_server;\n\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n\n    # Redirect http to https\n    # return 301 $scheme://www.website.com$request_uri;\n}\n\nserver {\n    listen 443;\n    server_name localhost;\n\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n\n    ssl on;\n    ssl_certificate /etc/nginx/ssl/nginx.crt;\n    ssl_certificate_key /etc/nginx/ssl/nginx.key;\n}</code></pre>\n      </div>\n<p>Next, test the that the changes you\'ve made were successful.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">sudo nginx -t</code></pre>\n      </div>\n<p>Then, restart Nginx.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">sudo /etc/init.d/nginx stop\nsudo /etc/init.d/nginx start</code></pre>\n      </div>\n<p>Now you should be good to go!</p>\n<h3>Running within Vargent (optional)</h3>\n<p>If you\'re a mac user, such as myself, I would recommend using <a href="https://www.vagrantup.com/">Vagrant</a>. It easily allows users to run their vm on a private network.</p>\n<p>Here\'s an initial Vagrant file to get you started.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none"># -*- mode: ruby -*-\n# vi: set ft=ruby :\n\nVagrant.configure(2) do |config|\n  config.vm.box = "ubuntu/trusty64"\n\n  # Set VM\'s IP to make server available to a local network\n  # https://55.55.55.55\n  config.vm.network "private_network", ip: "55.55.55.55"\n\n  config.vm.provision "shell", inline: <<-SHELL\n    sudo apt-get update\n    sudo apt-get install -y nginx\n  SHELL\nend</code></pre>\n      </div>\n<p>Cheers!</p>',frontmatter:{date:"December 30, 2016",path:"/https-nginx",title:"How To Serve Files Over HTTPS with Nginx"}}},pathContext:{}}}});
//# sourceMappingURL=path---https-nginx-00fc8c703925b99bea0c.js.map