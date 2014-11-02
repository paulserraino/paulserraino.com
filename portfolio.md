---
layout: default
title: Paul Serraino | Projects
permalink: /projects/
---

<div id="portfolio"></div>

<script type="text/x-template" id="projects-list">
<br>
<h2>Work</h2>
<h4>2014</h4>
<ul class="project-list">
<% projects.forEach(function (project, index) { %>
	<li>
		<a href="#/project/<%= index %>"><%= project.name %></a>
	</li>
<% }); %>
</ul>
</script>

<script type="text/x-template" id="project-template">
<div class="project-container">
	<a href="/projects/">
		<i class="fa fa-chevron-left"></i>
		back
	</a>
	<h2><%= project.name %>
	<p><%= project.description%></p>
	<% if (project.url.site) { %>
		<div>
			<a class="visit-site" href="<%= project.url.site %>" target="_blank">visit site</a>
		</div> 	
	<% } %>
	<img src="<%= project.images.screenshot %>" />
</div>
</script>

<script src="../js/build/portfolio/bundle.js"></script>