jQuery.githubUser = function(username, callback){jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?', callback)}
var projects_count = 0;

jQuery.fn.loadRepositories = function(username){
  this.html("<span>Querying GitHub for my repositories...</span>");
  
  var target = this;
  $.githubUser(username, function(data){
    var repos = data.data;
    sortByName(repos);
    var projects = $('<ul/>');
    $(repos).each(function(){
      if(this.name != (username.toLowerCase() + '.github.com') ){
	projects_count++;
        
	var project = $('<section class="project-info"></section>');
        project.append('<h3>#' + projects_count + ' <a href="' + (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a>' + (this.language ? (' <span>(' + this.language + ')</span>') : '') + '</h3>');
        project.append('<p' + (this.description ? ('>' + this.description) : ' class="not-found">(no description)') + '</p>');
        
        var list_element = $('<li/>').append(project);
        projects.append(list_element);
      }
    });
    target.empty().append(projects);
  });
  
  function sortByName(repos){repos.sort(function(a,b){return a.name - b.name;});}
};
